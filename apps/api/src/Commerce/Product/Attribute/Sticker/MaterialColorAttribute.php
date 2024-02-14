<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class MaterialColorAttribute extends ProductAttr
	{
		const ALIAS         = "material_color";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, TRUE );
		}
	}
