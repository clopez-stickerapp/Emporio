<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollSizeTypeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliveryAttribute;

	class DeliveryRollSizeTypeFilter extends ProductAttrFilter
	{
		public function __construct()
		{
			parent::__construct( DeliveryRollSizeTypeAttribute::ALIAS );
			
			$this->createFilter( array( 
				DeliveryRollSizeTypeAttribute::ROLL_SIZE_SMALL,
				DeliveryRollSizeTypeAttribute::ROLL_SIZE_MEDIUM,
				DeliveryRollSizeTypeAttribute::ROLL_SIZE_LARGE,
				DeliveryRollSizeTypeAttribute::ROLL_SIZE_XLARGE,
				DeliveryRollSizeTypeAttribute::ROLL_SIZE_XXLARGE,
				DeliveryRollSizeTypeAttribute::ROLL_SIZE_MAX,
			) )
				->conditionBuilder
				->addCondition( "item.attributes.delivery", "==", DeliveryAttribute::DELIVERY_ROLL );
			
		}
	}
