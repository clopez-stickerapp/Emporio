<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class MinSizeAttribute extends ProductAttr
	{
		const ALIAS = "min_size_mm";

		const MIN_SIZE_SPECIAL_STS        = 6;
		const MIN_SIZE_DEFAULT            = 25;
		const MIN_SIZE_BIGGER             = 150;
		const MIN_SIZE_SHEET_CUSTOMIZABLE = 50;
		const MIN_SIZE_SHEET_LEGACY       = 200;
		const MIN_SIZE_ADMIN              = 5;
		const MIN_SIZE_STICKER_ON_SHEET   = 10;

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::INT, false, true );

			// TODO: Can we remove this special?
			$this->addAttrValue( self::MIN_SIZE_SPECIAL_STS );
			// TODO: Can we do minimum size 20 mm for all materials?
			$this->addAttrValue( self::MIN_SIZE_DEFAULT );
			$this->addAttrValue( self::MIN_SIZE_BIGGER );
			$this->addAttrValue( self::MIN_SIZE_SHEET_CUSTOMIZABLE );
			$this->addAttrValue( self::MIN_SIZE_SHEET_LEGACY );
			$this->addAttrValue( self::MIN_SIZE_ADMIN );
			$this->addAttrValue( self::MIN_SIZE_STICKER_ON_SHEET );
		}
	}
