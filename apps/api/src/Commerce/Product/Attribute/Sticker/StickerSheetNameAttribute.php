<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class StickerSheetNameAttribute extends ProductAttr
	{
		const ALIAS              = "sheet_name";
		const CONTOUR            = "path";
		const SQUARE             = "square";
		const RECTANGLE          = "rect";
		const ROUND              = "circle";
		const OVAL               = "oval";
		const ROUNDED            = "rounded";
		const STICKER_INDIVIDUAL = "sticker_individual";
		const STICKER            = "sticker";
		const SHEET              = "sheet";
		const TEMPLATE           = "template";
		const MANUAL           = "manual";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, false );

			$this->addAttrValue( self::RECTANGLE );
			$this->addAttrValue( self::CONTOUR );
			$this->addAttrValue( self::RECTANGLE );
			$this->addAttrValue( self::ROUND );
			$this->addAttrValue( self::ROUNDED );
			$this->addAttrValue( self::STICKER_INDIVIDUAL );
			$this->addAttrValue( self::STICKER );
			$this->addAttrValue( self::SHEET );
			$this->addAttrValue( self::TEMPLATE );
			$this->addAttrValue( self::MANUAL );
		}
	}
