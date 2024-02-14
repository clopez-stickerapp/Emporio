<?php

namespace StickerApp\Babylon\Commerce\Core\Product\Helper;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilteredValues;
use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\Product\Product;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;
use StickerApp\Babylon\Util\ArrayUtil;

use function array_diff;
use function array_key_exists;
use function array_shift;
use function count;
use function in_array;
use function intval;
use function is_array;
use function is_null;
use function krsort;
use const SORT_NUMERIC;

class ProductAttrComputer
{
	protected ProductService $ps;
	public bool              $useFilters;

	/**
	 * TODO: IT IS IMPORTANT THAT THIS HELPER REPLICATES EXACT SAME BEHAVIOUR AS ProductAttrComputer.ts
	 *
	 * Until we move the whole ProductService to a Node server where backend and frontend can share same logic.
	 */
	public function __construct(ProductService $ps, bool $useFilters = TRUE)
	{
		$this->ps         = $ps;
		$this->useFilters = $useFilters;
	}

	public function canHaveAttribute(ProductItem $productItem, string $attributeName): bool
	{
		$product = $this->ps->findProduct($productItem->productFamilyName, $productItem->productName);

		return $product->canHaveAttr($attributeName);
	}

	/**
	 * Checks if an attribute alias has a recommended value by the product.
	 * Will also return true if the attribute itself is required by the family.
	 * 
	 * @param ProductItem $productItem
	 * @param string $attributeName
	 * 
	 * @return bool
	 */
	public function hasProductRecommendedValuesFor(ProductItem $productItem, string $attributeName): bool
	{
		$productFamily = $this->ps->retrieveProductFamily($productItem->productFamilyName);
		
		if ($productFamily->isRequired($attributeName))
		{
			return true;
		}
		else if ($productFamily->isSupported($attributeName))
		{
			$product = $this->ps->findProduct($productItem->productFamilyName, $productItem->productName);

			return $product->isAttrValuesRecommendedFor($attributeName);
		}

		return false;
	}


	/**
	 * Checks if an attribute alias has a required value by the product.
	 * Will also return true if the attribute is required by the family.
	 * 
	 * @param ProductItem $productItem
	 * @param string $attributeName
	 * 
	 * @return bool
	 */
	public function isAttrRequired(ProductItem $productItem, string $attributeName): bool
	{
		$productFamily = $this->ps->retrieveProductFamily($productItem->productFamilyName);
		
		if ($productFamily->isRequired($attributeName))
		{
			return true;
		}
		else if ($productFamily->isSupported($attributeName))
		{
			$product = $this->ps->findProduct($productItem->productFamilyName, $productItem->productName);

			return $product->isAttrValuesStrictlyRequiredFor($attributeName);
		}

		return false;
	}

	public function getAllValues(string $attrUID): array
	{
		$attr   = $this->ps->retrieveAttribute($attrUID);
		$values = [];
		foreach ($attr->getValues() as $attrValue)
		{
			$values[] = $attrValue->getValue();
		}

		return $values;
	}

	public function getDefaultAttrValueOptionsForProduct(Product $product, string $attrAlias): array
	{
		$attrValues     = array();
		$attrUID = $product->getProductFamily()->findAttrUIDByAlias($attrAlias);
		$attr = $product->getProductService()->retrieveAttribute($attrUID);
		$withAttrValues = $product->getWithAttrValue($attrAlias) ? $product->getWithAttrValue($attrAlias) : array();
		if (!is_array($withAttrValues))
		{
			$withAttrValues = array($withAttrValues);
		}

		foreach ($withAttrValues as $attrRawValue)
		{
			if ($attr->isDynamicValue())
			{
				$attrValues[ArrayUtil::toIndexableKey($attrRawValue)] = $attrRawValue;
			}
			else
			{
				$attrValue = $this->ps->findAttributeValue($attrUID, $attrRawValue);
				if ($attrValue)
				{
					$attrValues[ArrayUtil::toIndexableKey($attrValue->getValue())] = $attrValue->getValue();
				}
			}
		}

		return $attrValues;
	}

	public function getAllAttrValueOptionsForProduct(Product $product, string $attrAlias): array
	{
		$attrUID = $product->getProductFamily()->findAttrUIDByAlias($attrAlias);
		$attrValues     = $this->getDefaultAttrValueOptionsForProduct($product, $attrAlias);

		if (!$product->isAttrValuesStrictlyRequiredFor($attrAlias))
		{
			$attr = $this->ps->retrieveAttribute($attrUID);
			foreach ($attr->getValues() as $attrValue)
			{
				$valueAsIndexable = ArrayUtil::toIndexableKey($attrValue->getValue());
				if (!array_key_exists($valueAsIndexable, $attrValues))
				{
					$attrValues[$valueAsIndexable] = $attrValue->getValue();
				}
			}
		}

		return $attrValues;
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 */
	public function getDefaultValue(ProductItem $productItem, string $attributeName)
	{
		$productFamily = $this->ps->retrieveProductFamily($productItem->getProductFamilyName());
		$attrUID       = $productFamily->findAttrUIDByAlias($attributeName);
		$attr          = $this->ps->retrieveAttribute($attrUID);

		if ($attr && $productFamily)
		{
			$values = $this->getSuggestedValues($productItem, $attributeName);
			$values = $this->removeConstrainedValues($productItem, $attributeName, $values);

			return array_shift($values);
		}

		return NULL;
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 */
	public function getLowestAvailableValue(ProductItem $productItem, string $attributeName): ?float
	{
		$values       = $this->getSuggestedValues($productItem, $attributeName);
		$values       = $this->removeConstrainedValues($productItem, $attributeName, $values);
		$lowestValue = NULL;
		if (count($values))
		{
			foreach ($values as $value)
			{
				$valueAsInt = intval($value);
				if ($valueAsInt < $lowestValue || is_null($lowestValue))
				{
					$lowestValue = $valueAsInt;
				}
			}
		}

		return $lowestValue;
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 */
	public function getHighestAvailableValue(ProductItem $productItem, string $attributeName): ?float
	{
		$values       = $this->getSuggestedValues($productItem, $attributeName);
		$values       = $this->removeConstrainedValues($productItem, $attributeName, $values);
		$highestValue = NULL;
		if (count($values))
		{
			foreach ($values as $value)
			{
				$valueAsInt = intval($value);
				if ($valueAsInt > $highestValue)
				{
					$highestValue = $valueAsInt;
				}
			}
		}

		return $highestValue;
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 * 
	 * Suggested values are filtered values, but if filtered values are empty
	 * it will fallback to all non constrained values.
	 * 
	 * @param ProductItem $productItem
	 * @param string $attributeName
	 *
	 * @return array
	 */
	public function getSuggestedValues(ProductItem $productItem, string $attributeName): array
	{
		// Will throw errors
		$values = $this->getFilteredValues($productItem, $attributeName);
		if (empty($values))
		{
			// Fallback to all values if filter didn't result in any
			$product = $this->ps->findProduct($productItem->getProductFamilyName(), $productItem->getProductName());
			return $this->getAllAttrValueOptionsForProduct($product, $attributeName);
		}

		return $values;
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 */
	public function getFilteredValues(ProductItem $productItem, string $attributeAlias): ?array
	{
		if (!$this->useFilters)
		{
			return [];
		}

		$productFamily    = $this->ps->retrieveProductFamily($productItem->getProductFamilyName());
		$filterCollection = $productFamily->getFilterCollection();

		
		if ($filterCollection && $filter = $filterCollection->getFilterFor($attributeAlias))
		{
			$successfulFilters = [];
			foreach ($filter->getAllFilters() as $productAttrFilteredValues)
			{
				$result = FALSE;
				try
				{
					$result = $productAttrFilteredValues->conditionBuilder->testOnItem($productItem);
				}
				catch (ConditionTestDataKeyNotFoundException $e)
				{
					// Do nothing about this
				}
				if ($result === TRUE)
				{
					$complexityScore = $productAttrFilteredValues->conditionBuilder->calculateComplexityScore();
					while (array_key_exists($complexityScore, $successfulFilters))
					{
						$complexityScore++;
					}
					$successfulFilters[$complexityScore] = $productAttrFilteredValues;
				}
			}
			if (count($successfulFilters))
			{
				switch ($filter->mode)
				{
					case ProductAttrFilter::MODE_MERGE_ALL_WINNERS:

						$result = array();
						/**
						 * @var ProductAttrFilteredValues $filter
						 */
						foreach ($successfulFilters as $filter)
						{
							$result = array_merge($result, $filter->values);
						}

						$result = array_unique($result);

						return $this->removeInvalidValues($productItem, $attributeAlias, $result);

						break;
					case ProductAttrFilter::MODE_HIGHEST_SCORE_WINS:
					default:

						krsort($successfulFilters, SORT_NUMERIC);
						/** @var ProductAttrFilteredValues $winner */
						$winner = array_shift($successfulFilters);

						return $this->removeInvalidValues($productItem, $attributeAlias, $winner->values);

						break;
				}
			}
		}

		return NULL;
	}

	public function getConstrainedValues(ProductItem $productItem, string $attributeName): ?array
	{
		$productFamily = $this->ps->retrieveProductFamily($productItem->getProductFamilyName());
		$attrUID       = $productFamily->findAttrUIDByAlias($attributeName);

		$values = [];
		if ($constraintCollection = $productFamily->getConstraintsCollection())
		{
			$attr = $this->ps->retrieveAttribute($attrUID);
			foreach ($attr->getValues() as $value)
			{
				try
				{
					$result = $constraintCollection->test($attributeName, $value->getValue(), $productItem);
					if ($result === FALSE)
					{
						$values[] = $value->getValue();
					}
				}
				catch (ConditionTestDataKeyNotFoundException $e)
				{
					//						var_dump($e->getMessage());
					// Do nothing about this error
				}
			}
		}

		return $values;
	}

	public function getOutOfStockValues( ProductItem $productItem, string $attributeName ): ?array
	{
		$productFamily = $this->ps->retrieveProductFamily( $productItem->getProductFamilyName() );

		$values = array();
		if ( $outOfStockCollection = $productFamily->getStockCollection() )
		{
			$values = $outOfStockCollection->getOutOfStockFor( $attributeName )->out_of_stock;
		}

		return $values;
	}

	/**
	 * Removes values that aren't registered in that attribute (or aren't matching product description)
	 * unless the attribute is marked as "dynamic value" which can have
	 * basically what ever value as long as value type is matching.
	 */
	public function removeInvalidValues(ProductItem $productItem, string $attributeAlias, array $values): array
	{
		// TODO: Check for type as well?
		$productFamily    = $this->ps->retrieveProductFamily($productItem->getProductFamilyName());
		$attrUID          = $productFamily->findAttrUIDByAlias($attributeAlias);
		$attr             = $this->ps->retrieveAttribute($attrUID);
		if (!$attr->isDynamicValue())
		{
			$product = $this->ps->findProduct($productItem->productFamilyName, $productItem->productName);
			$allValueOptions = $this->getAllAttrValueOptionsForProduct($product, $attributeAlias);
			return array_filter($values, fn ($v, $k) => in_array($v, $allValueOptions), ARRAY_FILTER_USE_BOTH);
		}

		return $values;
	}

	public function removeConstrainedValues(ProductItem $productItem, string $attributeName, array $values): array
	{
		$constrainedValues = $this->getConstrainedValues($productItem, $attributeName);

		return array_diff($values, $constrainedValues);
	}

	public function isConstrained(ProductItem $productItem, string $attributeName, $value): bool
	{
		return in_array($value, $this->getConstrainedValues($productItem, $attributeName));
	}

	public function isOutOfStock( ProductItem $productItem, string $attributeName, $value ): bool
	{
		return in_array( $value, $this->getOutOfStockValues( $productItem, $attributeName ) ) ?? false;
	}

	/**
	 * Out of stock should be handled outside of this function, so we've consciously excluded it.
	 */
	public function isAvailable(ProductItem $productItem, string $attributeName, $value): bool
	{
		return !$this->isConstrained($productItem, $attributeName, $value) &&
			( $this->isDynamicValue( $attributeName, $productItem ) || $this->isInSuggestedValues( $productItem, $attributeName, $value ) );
	}

	public function isUnavailable(ProductItem $productItem, string $attributeName, $value): bool
	{
		return !$this->isAvailable($productItem, $attributeName, $value);
	}

	public function isDynamicValue(string $attributeName, ProductItem $productItem): bool
	{
		$productFamily = $this->ps->retrieveProductFamily($productItem->getProductFamilyName());
		$attrUID       = $productFamily->findAttrUIDByAlias($attributeName);

		return $this->ps->retrieveAttribute($attrUID)->isDynamicValue();
	}

	public function isMultiValue(string $attributeName, ProductItem $productItem): bool
	{
		$productFamily = $this->ps->retrieveProductFamily($productItem->getProductFamilyName());
		$attrUID       = $productFamily->findAttrUIDByAlias($attributeName);

		return $this->ps->retrieveAttribute($attrUID)->isMultiValue();
	}

	public function isInSuggestedValues(ProductItem $productItem, string $attributeName, $value): bool
	{
		$suggestedValues = $this->getSuggestedValues($productItem, $attributeName);

		if (!is_array($value))
		{
			$value = array($value);
		}

		foreach ($value as $v)
		{
			if (!in_array($v, $suggestedValues))
			{
				return false;
			}
		}

		return true;
	}

	public function isInFilteredValues(ProductItem $productItem, string $attributeName, $value): bool
	{
		$values = $this->getFilteredValues($productItem, $attributeName);

		return is_array($values) && in_array($value, $values);
	}
}
