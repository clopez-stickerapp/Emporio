<?php

namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter;

use JsonSerializable;
use StickerApp\Babylon\Helper\Condition\ConditionRelations;

/**
 * This is a way to be able to filter the attribute values and say
 * "these attribute values are available if these conditions are met".
 * The order of the values will be presented as you put them.
 *
 * This is NOT used for telling which attribute values are disabled,
 * just to tell which values should be shown and in what order.
 */
class ProductAttrFilter implements JsonSerializable
{
	const MODE_HIGHEST_SCORE_WINS = "mode_highest_score_wins";
	const MODE_MERGE_ALL_WINNERS = "mode_merge_all_winners";
	public string $attributeName;
	/**
	 * @var ProductAttrFilteredValues[]
	 */
	protected array $filtersMap = array();

	public string $mode = self::MODE_HIGHEST_SCORE_WINS;

	public function __construct(string $attrAlias, string $mode = self::MODE_HIGHEST_SCORE_WINS)
	{
		$this->attributeName = $attrAlias;
		$this->mode = $mode;
	}

	public function createFilter(array $attrValues, string $conditionRelationMode = ConditionRelations::AND): ProductAttrFilteredValues
	{
		return $this->filtersMap[] = new ProductAttrFilteredValues($attrValues, $conditionRelationMode);
	}

	public function jsonSerialize()
	{
		$filters = array();
		foreach ($this->filtersMap as $filteredValues)
		{
			$filter    = array(
				"values"                    => $filteredValues->values,
				"conditions"                => "$filteredValues->conditionBuilder",
				"conditionsComplexityScore" => $filteredValues->conditionBuilder->calculateComplexityScore(),
			);
			$filters[] = $filter;
		}

		return $filters;
	}

	/**
	 * @return ProductAttrFilteredValues[]
	 */
	public function getAllFilters(): array
	{
		return $this->filtersMap;
	}
}
