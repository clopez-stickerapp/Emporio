<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\CutDirectionAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeOtherSideAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;
	use StickerApp\Babylon\Helper\Condition\ConditionRelations;

	class CutDirectionConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( CutDirectionAttribute::ALIAS );

			$this->createConditionsFor( CutDirectionAttribute::AUTO )
				->addCondition( "item.productName", ConditionOperators::NOT_IN, array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL
				) )
			;

			$this->createConditionsFor( CutDirectionAttribute::TOP_FIRST, ConditionRelations::OR )
				->addCondition( "item.attributes.width_mm", "<=", MaxSizeOtherSideAttribute::MAX_SIZE_OTHER_SIDE_ROLL )
				->addCondition( "item.productName", ConditionOperators::NOT_IN, array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL
				) )
			;

			$this->createConditionsFor( CutDirectionAttribute::BOTTOM_FIRST, ConditionRelations::OR )
				->addCondition( "item.attributes.width_mm", "<=", MaxSizeOtherSideAttribute::MAX_SIZE_OTHER_SIDE_ROLL )
				->addCondition( "item.productName", ConditionOperators::NOT_IN, array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL
				) )
			;

			$this->createConditionsFor( CutDirectionAttribute::LEFT_FIRST, ConditionRelations::OR )
				->addCondition( "item.attributes.height_mm", "<=", MaxSizeOtherSideAttribute::MAX_SIZE_OTHER_SIDE_ROLL )
				->addCondition( "item.productName", ConditionOperators::NOT_IN, array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL
				) )
			;

			$this->createConditionsFor( CutDirectionAttribute::RIGHT_FIRST, ConditionRelations::OR )
				->addCondition( "item.attributes.height_mm", "<=", MaxSizeOtherSideAttribute::MAX_SIZE_OTHER_SIDE_ROLL )
				->addCondition( "item.productName", ConditionOperators::NOT_IN, array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL
				) )
			;
		}
	}
