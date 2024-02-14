<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Attribute;

	use StickerApp\Babylon\Helper\Condition\Condition;
	use StickerApp\Babylon\Helper\Condition\ConditionBuilder;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;
	use StickerApp\Babylon\Helper\Condition\ConditionRelations;
	use function is_bool;
	use function var_export;

	class ProductAttrValue
	{
		protected ProductAttr $attr;
		/**
		 * @var int|string|number|bool
		 */
		protected               $value;

		public function __construct( $value )
		{
			$this->value             = $value;
		}

		public function setAttr( ProductAttr $attr ): void
		{
			$this->attr = $attr;
		}

		public function getAttr(): ProductAttr
		{
			return $this->attr;
		}

		/**
		 * @return bool|int|number|string
		 */
		public function getValue()
		{
			return $this->value;
		}
	}
