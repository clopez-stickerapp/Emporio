<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeOtherSideAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;

	class MaxSizeOtherSideFilter extends ProductAttrFilter
	{
		public function __construct()
		{
			parent::__construct( MaxSizeOtherSideAttribute::ALIAS );

			$this->createFilter( array( 
				MaxSizeOtherSideAttribute::MAX_SIZE_OTHER_SIDE_ROLL 
			) )
				->conditionBuilder
				->addCondition( "item.productName", ConditionOperators::IN, array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL,
				) )
			;
		}
	}
