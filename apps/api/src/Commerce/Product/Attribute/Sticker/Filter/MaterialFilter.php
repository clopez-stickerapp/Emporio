<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
    use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
	use StickerApp\Babylon\Commerce\Product\Family\SkinProductFamily;
    use StickerApp\Babylon\Helper\Condition\ConditionOperators;
    use StickerApp\Babylon\Helper\Condition\ConditionRelations;

	class MaterialFilter extends ProductAttrFilter
	{
		public function __construct()
		{
			parent::__construct( MaterialAttribute::ALIAS );

            $this->addStickerappFilters();
            $this->addSTSFilters();
		}

        private function addStickerappFilters()
        {
            $this->createFilter( array(
				MaterialAttribute::WHITE,
				MaterialAttribute::HOLOGRAPHIC,
				MaterialAttribute::GLITTER,
				MaterialAttribute::CLEAR,
				MaterialAttribute::MIRROR,
				MaterialAttribute::PRISMATIC,
				MaterialAttribute::BRUSHED_ALLOY,
				MaterialAttribute::WHITE_HI_TACK,
				MaterialAttribute::KRAFT_PAPER,
				MaterialAttribute::WHITE_REMOVABLE,
				MaterialAttribute::PIXIE_DUST,
				MaterialAttribute::GITD,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_SHEET_LEGACY,
					CustomStickerFamily::PRODUCT_SHEET,
					CustomStickerFamily::PRODUCT_SHEET_KISS_CUT,
				) );

			$this->createFilter( array(
				MaterialAttribute::WHITE,
				MaterialAttribute::HOLOGRAPHIC,
				MaterialAttribute::CLEAR,
				MaterialAttribute::GLITTER,
				MaterialAttribute::MIRROR,
				MaterialAttribute::PIXIE_DUST,
				MaterialAttribute::PRISMATIC,
				MaterialAttribute::BRUSHED_ALLOY,
				MaterialAttribute::KRAFT_PAPER,
				MaterialAttribute::WHITE_HI_TACK,
				MaterialAttribute::GITD,
				MaterialAttribute::WHITE_REMOVABLE,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_DIE_CUT, CustomStickerFamily::SINGLE_ON_SHEET
				) );

			$this->createFilter( array(
				MaterialAttribute::WHITE,
				MaterialAttribute::WHITE_REMOVABLE,
				MaterialAttribute::CLEAR,
				MaterialAttribute::HOLOGRAPHIC,
				MaterialAttribute::MIRROR,
				MaterialAttribute::GLITTER,
				MaterialAttribute::BRUSHED_ALLOY,
				MaterialAttribute::GITD,
				MaterialAttribute::PRISMATIC,
				MaterialAttribute::KRAFT_PAPER,
				MaterialAttribute::PIXIE_DUST
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_HANG_TAG,
				) );

			$this->createFilter( array(
				MaterialAttribute::WHITE_STURDY,
				// MaterialAttribute::HOLOGRAPHIC,  // TODO: Will be released after Magnus template fix.
				// MaterialAttribute::MIRROR,
				// MaterialAttribute::BRUSHED_ALLOY,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_3D_DOME,
				) );

			$this->createFilter( array(
				MaterialAttribute::CLEAR,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_FRONT_ADHESIVE,
				) );

			$this->createFilter( array(
				MaterialAttribute::WHITE_HI_TACK,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_HEAVY_DUTY,
				) );

			$this->createFilter( array(
				MaterialAttribute::WHITE_REMOVABLE,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_REMOVABLE,
				) );

			$this->createFilter( array(
				MaterialAttribute::WHITE_WALL,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_WALL,
				) );

			$this->createFilter( array(
				MaterialAttribute::WHITE,
				// MaterialAttribute::WHITE_HI_TACK,
				// MaterialAttribute::WHITE_REMOVABLE,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_FLOOR,
				) );

			$skinFilter = $this->createFilter( array(
				MaterialAttribute::SKIN
			) );
			$skinFilter->conditionBuilder->relationMode = ConditionRelations::OR;
			$skinFilter->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_LAPTOP_SKIN,
				) )
				->addCondition( "item.productFamilyName", "IN", array(
					SkinProductFamily::NAME,
				) );

			$this->createFilter( array(
				MaterialAttribute::WHITE,
				MaterialAttribute::CLEAR,
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_LABELS_ON_SHEET,
				) );

			$this->createFilter( MaterialAttribute::MATERIALS_LABELS_ON_ROLL )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL,
				) );

			$this->createFilter( array(
					MaterialAttribute::CLEAR,
				) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_WINDOW,
				) );

            $this->createFilter( array(
                MaterialAttribute::COLORED_VINYL,
                MaterialAttribute::WHITE,
                MaterialAttribute::FROSTED,
                MaterialAttribute::WHITE_HI_TACK,
                MaterialAttribute::METALLIC_GOLD,
                MaterialAttribute::METALLIC_SILVER,
                MaterialAttribute::BUBBLE_FREE,
            ) )
            ->conditionBuilder
            ->addCondition( "item.productName", "==", CustomStickerFamily::PRODUCT_TRANSFER_DECAL);
        }

        private function addSTSFilters()
        {
            $this->createFilter( array(
				MaterialAttribute::WHITE,
				MaterialAttribute::HOLOGRAPHIC,
				MaterialAttribute::GLITTER,
				MaterialAttribute::CLEAR,
				MaterialAttribute::MIRROR,
				MaterialAttribute::PRISMATIC,
				MaterialAttribute::BRUSHED_ALLOY,
				MaterialAttribute::WHITE_HI_TACK,
				MaterialAttribute::KRAFT_PAPER,
				MaterialAttribute::WHITE_REMOVABLE,
				MaterialAttribute::WHITE_WALL,
				MaterialAttribute::GITD,
                MaterialAttribute::REFLECTIVE,
			) )
				->conditionBuilder
                ->setBaseComplexityScore(120)
                ->addCondition( "item.attributes.reseller", ConditionOperators::IN, array(ResellerAttribute::VALUE_STICKERSTHATSTICK, ResellerAttribute::VALUE_STICKIT))
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_DIE_CUT, CustomStickerFamily::SINGLE_ON_SHEET
				) );
        }
	}
