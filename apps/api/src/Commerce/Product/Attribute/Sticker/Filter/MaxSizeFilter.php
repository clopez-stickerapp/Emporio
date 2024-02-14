<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;
	use StickerApp\Babylon\Helper\Condition\ConditionRelations;

	class MaxSizeFilter extends ProductAttrFilter
	{
		public function __construct()
		{
			parent::__construct( MaxSizeAttribute::ALIAS );

			$this->createFilter( array( MaxSizeAttribute::MAX_SIZE_LASER ) )
				->conditionBuilder
				->addSubGroup(ConditionRelations::OR)
				->addCondition("item.attributes.material", ConditionOperators::IN, 
					array(
						MaterialAttribute::CLEAR,
						MaterialAttribute::MIRROR,
						MaterialAttribute::BRUSHED_ALLOY,
						MaterialAttribute::WHITE_REMOVABLE
					)
				)
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_SHEET,
					CustomStickerFamily::PRODUCT_SHEET_KISS_CUT
				) );

			$this->createFilter( array(
				MaxSizeAttribute::MAX_SIZE_SHEET_LEGACY
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_SHEET_LEGACY,
				) );

			$this->createFilter( array(
				MaxSizeAttribute::MAX_SIZE_ROLL
			) )
				->conditionBuilder
				->addCondition( "item.productName", ConditionOperators::IN, array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL
				) )
			;
		}
	}
