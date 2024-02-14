<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class HeightAttribute extends ProductAttr
	{
		const ALIAS = "height_mm";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::INT, FALSE, TRUE );
		}
	}
