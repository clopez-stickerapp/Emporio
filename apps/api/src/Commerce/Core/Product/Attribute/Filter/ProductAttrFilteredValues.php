<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Condition\ProductConditionBuilder;
	use StickerApp\Babylon\Helper\Condition\ConditionRelations;

	class ProductAttrFilteredValues
	{
		public array                   $values;
		public ProductConditionBuilder $conditionBuilder;

		public function __construct( array $values, string $conditionRelationMode = ConditionRelations::AND )
		{
			$this->values           = $values;
			$this->conditionBuilder = new ProductConditionBuilder( $conditionRelationMode );
		}
	}
