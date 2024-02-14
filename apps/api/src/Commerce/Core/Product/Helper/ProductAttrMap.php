<?php

namespace StickerApp\Babylon\Commerce\Core\Product\Helper;

use ArrayObject;
use StickerApp\Babylon\Commerce\Core\Product\Product;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Util\ArrayUtil;

use function array_key_exists;

class ProductAttrMap extends ArrayObject
{
	public array             $map       = array();
	protected array          $rerunAttr = array();
	protected ProductService $ps;
	protected Product        $product;
	protected ProductItem    $productItemDummy;
	protected ProductAttrComputer $attrComputer;
	protected ProductItemBuilder $itemBuilder;
	private bool             $includeFilters;
	private bool $useFilters;

	public function __construct(ProductService $ps, Product $product, bool $includeFilters = TRUE, bool $useFilters = TRUE)
	{
		$this->ps               = $ps;
		$this->product          = $product;
		$this->includeFilters   = $includeFilters;
		$this->useFilters = $useFilters;
		$this->attrComputer = new ProductAttrComputer($ps, $useFilters);
		$this->itemBuilder = new ProductItemBuilder($ps, $useFilters);
		$this->productItemDummy = $this->itemBuilder->createItem($product->getProductFamily()->getName(), $product->getName());

		foreach ($this->productItemDummy->attributes as $attrAlias => $attrValue)
		{
			if (!$product->isAttrValuesRecommendedFor($attrAlias))
			{
				$this->productItemDummy->removeAttribute($attrAlias);
			}
		}

		foreach ($product->getProductFamily()->getAttributes() as $attrAlias => $attrUID)
		{
			$this->run($attrUID, $attrAlias);
		}

		parent::__construct($this->map);
	}

	protected function run(string $attrUID, string $attrAlias)
	{
		// TODO: Implement "does attr:value allow attributeName to be attrValue"
		// Currently only does the other way around, see sticker wizard logic
		$attrValues            = array();
		$constraintsCollection = $this->product->getProductFamily()->getConstraintsCollection();
		$iconsCollection 	 = $this->product->getProductFamily()->getIconsCollection();
		$outOfStockCollection  = $this->product->getProductFamily()->getStockCollection();

		if ($attr = $this->ps->retrieveAttribute($attrUID))
		{
			$allPossibleValueOptions     	= $this->attrComputer->getAllAttrValueOptionsForProduct($this->product, $attrAlias);
			$allPossibleValueOptions 	 	= $this->attrComputer->removeConstrainedValues($this->productItemDummy, $attrAlias, $allPossibleValueOptions);
			$icons 				 	= [];
			$outOfStockAttrValues	= [];

			if( !is_null( $outOfStockCollection ) )
			{
				$outOfStockAttrValues	= $outOfStockCollection->getOutOfStockFor($attrAlias)->out_of_stock ?? [];
			}

			foreach ($allPossibleValueOptions as $attrValue)
			{
				$conditionsBuilder                                 = $constraintsCollection ? $constraintsCollection->findConditionsFor($attrAlias, $attrValue) : NULL;
				$iconBuilder                                       = $iconsCollection ? $iconsCollection->findIconFor($attrAlias, $attrValue) : NULL;

				if ($iconBuilder)
				{
					$icons[$attrValue] = $iconBuilder;
				}

				$attrValues[ArrayUtil::toIndexableKey($attrValue)] = $conditionsBuilder ? "$conditionsBuilder" : NULL;
			}

			// TODO: Double check all filter values that they are correct value types (especially for booleans and ints), if not throw error
			$filters = NULL;
			$filterMode = NULL;
			if ($this->includeFilters)
			{
				$filterCollection = $this->product->getProductFamily()->getFilterCollection();
				if ($filterCollection && $filter = $filterCollection->getFilterFor($attrAlias))
				{
					$filters = $filters[] = $filter->jsonSerialize();
					$filterMode = $filter->mode;
				}
			}

			$this->map[$attrAlias] = [
				"alias" 				=> $attrAlias,
				"isDynamicValue" 		=> $attr->isDynamicValue(),
				"isMultiValue" 			=> $attr->isMultiValue(),
				"valueType" 			=> $attr->getValueType(),
				"isRequired" 			=> array_key_exists($attrAlias, $this->product->getProductFamily()->getRequiredAttrs()),
				"valuesAndConstraints" 	=> $attrValues,
				"icons" 				=> !empty($icons) ? $icons : NULL,
				"filters" 				=>  $filters,
				"filterMode" 			=> $filterMode,
				"outOfStockValues" 		=> $outOfStockAttrValues
			];
		}
	}
}
