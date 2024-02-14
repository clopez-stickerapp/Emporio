<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class DeliverySheetInsidePaddingAttribute extends ProductAttr
	{
		const ALIAS = "delivery_sheet_inside_padding";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::INT, FALSE, TRUE );
		}
	}
