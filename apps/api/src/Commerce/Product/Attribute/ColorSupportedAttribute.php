<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class ColorSupportedAttribute extends ProductAttr
	{
		const ALIAS = "color_supported";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::BOOL );

			$this->addAttrValue( TRUE );
			$this->addAttrValue( FALSE );
		}
	}