<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
	use StickerApp\Babylon\Helper\Condition\ConditionRelations;

	class ProductionLineConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( ProductionLineAttribute::ALIAS );

			$this->createConditionsFor( ProductionLineAttribute::DIGITAL )
			     ->addCondition( "item.attributes.material", "IN", ProductionLineAttribute::DIGITAL_MATERIALS )
				 ->addCondition( "item.attributes.laminate", "IN", ProductionLineAttribute::DIGITAL_LAMINATES )
				 ->addCondition( "item.attributes.feature", "NOT IN", array(
					FeatureAttribute::BACKPAPER_PRINT
				 ) );
			$this->createConditionsFor( ProductionLineAttribute::LASER )
			     ->addCondition( "item.attributes.material", "IN", ProductionLineAttribute::LASER_MATERIALS )
				 ->addCondition( "item.attributes.laminate", "IN", ProductionLineAttribute::LASER_LAMINATES )
				 ->addCondition("item.attributes.width_mm", "<=", MaxSizeAttribute::MAX_SIZE_ONE_SIDE_LASER)
				 ->addCondition("item.attributes.height_mm", "<=", MaxSizeAttribute::MAX_SIZE_ONE_SIDE_LASER)
				 ->addSubGroup(ConditionRelations::OR)
				 ->addCondition("item.attributes.width_mm", "<=", MaxSizeAttribute::MAX_SIZE_LASER)
				 ->addCondition("item.attributes.height_mm", "<=", MaxSizeAttribute::MAX_SIZE_LASER);
			
			$this->createConditionsFor( ProductionLineAttribute::SPECIAL )
				 ->addCondition( "item.attributes.material", "==", "special" );
		}
	}
