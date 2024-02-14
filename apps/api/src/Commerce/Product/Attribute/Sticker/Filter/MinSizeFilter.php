<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MinSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
	use StickerApp\Babylon\Helper\Condition\ConditionRelations;

	class MinSizeFilter extends ProductAttrFilter
	{
		public function __construct()
		{
			parent::__construct( MinSizeAttribute::ALIAS );

			// Default min size
			$this->createFilter( array(
				MinSizeAttribute::MIN_SIZE_DEFAULT
			) );

			$this->createFilter( array(
				MinSizeAttribute::MIN_SIZE_SPECIAL_STS
			) )->conditionBuilder
				->addCondition( "item.attributes.reseller", "==", ResellerAttribute::VALUE_STICKERSTHATSTICK );

			$this->createFilter( array(
				MinSizeAttribute::MIN_SIZE_BIGGER
			), ConditionRelations::OR )
				->conditionBuilder
				->addCondition( "item.attributes.material", "IN", array(
					MaterialAttribute::WHITE_WALL,
				) )
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_WALL,
					CustomStickerFamily::PRODUCT_FLOOR,
				) );

			$this->createFilter( array( 
				MinSizeAttribute::MIN_SIZE_SHEET_CUSTOMIZABLE
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_SHEET,
					CustomStickerFamily::PRODUCT_SHEET_KISS_CUT
				) );

			$this->createFilter( array( 
				MinSizeAttribute::MIN_SIZE_SHEET_LEGACY
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_SHEET_LEGACY,
				) );

			$this->createFilter( array( 
				MinSizeAttribute::MIN_SIZE_STICKER_ON_SHEET
			) )
				->conditionBuilder
				->addCondition( "item.productName", "IN", array(
					CustomStickerFamily::PRODUCT_LABELS_ON_SHEET,
					CustomStickerFamily::SINGLE_ON_SHEET,
				) );
			
		}
	}
