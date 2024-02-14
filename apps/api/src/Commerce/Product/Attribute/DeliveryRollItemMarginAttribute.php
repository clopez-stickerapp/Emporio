<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class DeliveryRollItemMarginAttribute extends ProductAttr
	{
		const ALIAS 		= "delivery_roll_item_margin";
		const DEFAULT_VALUE	= 4;

		public function __construct()
		{
			parent::__construct(ProductAttrValueTypes::INT, FALSE, TRUE );
		}
	}