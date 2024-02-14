<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class DeliverySheetWidthAttribute extends ProductAttr
	{
		const ALIAS = "delivery_sheet_width";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::INT, FALSE, TRUE );
		}
	}
