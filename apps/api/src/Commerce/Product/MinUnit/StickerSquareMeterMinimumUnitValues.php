<?php

	namespace StickerApp\Babylon\Commerce\Product\MinUnit;

	use StickerApp\Babylon\Commerce\Core\Product\Value\ProductDynamicValue;
    use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
    use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
    use StickerApp\Babylon\Helper\Condition\ConditionOperators;

	class StickerSquareMeterMinimumUnitValues extends ProductDynamicValue
	{
		public function __construct()
		{
			parent::__construct( $default = 0.1407 );

			$this->addConditionedValue( 0.5 )
				->conditionBuilder
                ->setBaseComplexityScore(120)
				->addCondition( "item.productName", "==", CustomStickerFamily::PRODUCT_LABELS_ON_ROLL );

			// Material specifics, for all
            $this->addConditionedValue( 0.1090 )
                ->conditionBuilder
                ->setBaseComplexityScore(1)
                ->addCondition( "item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::HOLOGRAPHIC, MaterialAttribute::GLITTER, MaterialAttribute::MIRROR, MaterialAttribute::PRISMATIC, MaterialAttribute::PIXIE_DUST ));

            $this->addConditionedValue( 0.1360 )
                ->conditionBuilder
                ->setBaseComplexityScore(1)
                ->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::WHITE_HI_TACK));

            $this->addConditionedValue( 0.1635 )
                ->conditionBuilder
                ->setBaseComplexityScore(1)
                ->addCondition( "item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::GITD));

            $this->addConditionedValue( 0.1440 )
                ->conditionBuilder
                ->setBaseComplexityScore(1)
                ->addCondition( "item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::CLEAR))
                ->addCondition( "item.productName", "!=", CustomStickerFamily::PRODUCT_LABELS_ON_SHEET);

            $this->addConditionedValue( 0.35 )
                ->conditionBuilder
                ->setBaseComplexityScore(1)
                ->addCondition( "item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::WHITE_WALL));

			// Laminate specifics
            $this->addConditionedValue( 0.058 )
				->conditionBuilder
                ->addCondition( "item.attributes.laminate", "==", LaminateAttribute::EPOXY );

            $this->addConditionedValue( 0.06 )
				->conditionBuilder
                ->setBaseComplexityScore(10)
                ->addCondition( "item.productName", "==", CustomStickerFamily::PRODUCT_SHEET_LEGACY );

		}
	}
