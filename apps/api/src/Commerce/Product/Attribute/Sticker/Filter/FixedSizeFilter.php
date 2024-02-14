<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
	use StickerApp\Babylon\Commerce\Product\Attribute\FixedSizeAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
    use StickerApp\Babylon\Helper\Condition\ConditionOperators;
    use StickerApp\Babylon\Helper\Condition\ConditionRelations;

	class FixedSizeFilter extends ProductAttrFilter
	{
		public function __construct()
		{
			parent::__construct( FixedSizeAttribute::ALIAS );

			$conditions = $this->createFilter( array(
				TRUE
			))
				->conditionBuilder
                ->addCondition("item.attributes.reseller", ConditionOperators::NOT_IN, array(ResellerAttribute::VALUE_STICKERSTHATSTICK, ResellerAttribute::VALUE_STICKIT))
                ->addSubGroup(ConditionRelations::OR)
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_3D_DOME,
					CustomStickerFamily::PRODUCT_SHEET_LEGACY,
				) )
				->addCondition( "item.attributes.laminate", "IN", array(
					LaminateAttribute::EPOXY
				) );
		}
	}
