<?php

namespace StickerApp\Babylon\Commerce\Core\Product\Helper;

use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrNotSupportedException;
use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrValueNotSupportedException;
use StickerApp\Babylon\Commerce\Core\Exception\ProductItemInvalidException;
use StickerApp\Babylon\Commerce\Core\Exception\ProductItemOutOfStockException;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Stock\StickerWizardStockCollection;

use function is_array;
use function var_export;

class ProductItemValidator
{
	protected ProductService $ps;
	public ProductAttrComputer $attrComputer;
	public bool $allowUnsupportedAttributes = false;
	public bool $allowUnavailableAttributeValues = true;


	public function __construct(ProductService $ps)
	{
		$this->ps = $ps;
		$this->attrComputer = new ProductAttrComputer($ps);
	}

	public function validate(ProductItem $item, bool $allowUnsupportedAttributeAliases = true, bool $allowUnsuggestedAttributeValues = true): bool
	{
		// TODO: Custom errors
		$productFamily = $this->ps->retrieveProductFamily($item->getProductFamilyName());
		if (!$productFamily)
		{
			throw new ProductItemInvalidException("Product type doesn't exists: " . $item->getProductFamilyName());
		}
		$product = $productFamily->getProduct($item->getProductName());
		if (!$product)
		{
			throw new ProductItemInvalidException("Product (" . $item->getProductName() . ") doesn't exists in type (" . $item->getProductFamilyName() . ").");
		}
		if (!$item->units)
		{
			throw new ProductItemInvalidException("Item units can't be zero.");
		}
		// $minUnits = $productFamily->getMinimumUnits( $item );
		// if ( $item->getUnits() < $productFamily->getMinimumUnits( $item ) )


		// $minUnits = $productFamily->getMinimumUnits( $item->getAttributes() );
		// if ( $item->getUnits() < $productFamily->getMinimumUnits( $item->getAttributes() ) )
		// {
		// 	throw new ProductItemInvalidException( "Item units (" . $item->getUnits() . ") is less than minimum ($minUnits)." );
		// }

		/**
		 * TODO:
		 * - Does units match? float / int
		 * - Does attr match?
		 */

		if (!$product->testAttributes($item->getAttributes()))
		{
			throw new ProductItemInvalidException("Attributes doesn't match product recipe.");
		}

		$stockCollection = $product->getProductFamily()->getStockCollection( StickerWizardStockCollection::NAME );
		$stockMap = array();
		if( !is_null( $stockCollection ) )
		{
			$stockMap = $stockCollection->getAllOutOfStock() ?? array();
		}
		foreach ($item->getAttributes() as $attrName => $value)
		{
			if(is_array($value))
			{
				// Remove empty arrays
				$value = array_filter( $value, function($v, $k) {
					return !is_null($v) && (is_string($v) && $v != "");
				}, ARRAY_FILTER_USE_BOTH );
			}
			if (!$product->canHaveAttr($attrName) && !$allowUnsupportedAttributeAliases)
			{
				throw new ProductAttrNotSupportedException("Attribute name is not supported by product: $attrName", 0, E_WARNING);
				continue;
			}
			else if (!$product->canHaveAttr($attrName))
			{
				continue;
			}

			$attrUID = $productFamily->findAttrUIDByAlias($attrName);
			$attr    = $this->ps->retrieveAttribute($attrUID);
			if ($attr->canBe($value))
			{
				if (!$allowUnsuggestedAttributeValues && !empty($value) && !$attr->isDynamicValue())
				{
					if (!$this->attrComputer->isInSuggestedValues($item, $attrName, $value))
					{
						throw new ProductAttrValueNotSupportedException( var_export($value, true) . " is not suggested as '$attrName'.", 0, E_WARNING );
					}
				}

				$iteration = !is_array($value) ? array($value) : $value;
				foreach ($iteration as $attrValue)
				{
					if ($attrValue = $attr->getAttrValue($attrValue))
					{
						if ($productFamily->getConstraintsCollection())
						{
							$result = $productFamily->getConstraintsCollection()->test($attrName, $attrValue->getValue(), $item);
							if ($result === FALSE)
							{
								throw new ProductItemInvalidException("Failed due to constraints related to " . var_export($attrValue->getValue(), TRUE) . " ($attrName)\n");
							}
						}
					}
				}

				if( array_key_exists( $attrName, $stockMap ) )
				{
					$outOfStock = $stockMap[ $attrName ];
					if( !is_array( $value ) )
					{
						$value = array( $value );
					}

					foreach( $value as $v )
					{
						if( in_array( $v, $outOfStock->out_of_stock ) )
						{
							/*Translation mekk if we want to present the user with a translated value.*/
							//$translatedValue = get_language_model()->findTranslation( "products_".$attrName."_".$v, "us", "shared", "products" );
							//throw new ProductItemOutOfStockException("The product item can't be ordered because the value for $attrName is out of stock: $translatedValue" );

							throw new ProductItemOutOfStockException("The product item can't be ordered because the value for $attrName is out of stock: $v" );

						}
					}
				}
			}
		}

		return TRUE;
	}
}
