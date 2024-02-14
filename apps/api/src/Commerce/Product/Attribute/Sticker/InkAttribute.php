<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class InkAttribute extends ProductAttr
	{
		const ALIAS    = "ink";
		const PINK_INK = "pink_ink";
		const INVISIBLE_INK = "invisible_ink";
		const OUT_OF_STOCK = array( InkAttribute::PINK_INK, InkAttribute::INVISIBLE_INK );

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE );

			$this->addAttrValue( self::PINK_INK );
			$this->addAttrValue( self::INVISIBLE_INK );
		}
	}
