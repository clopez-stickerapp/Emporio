<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class SheetTypeAttribute extends ProductAttr
	{
		const ALIAS        = "sheet_type";
		const SINGLE       = "single";
		const SHEET        = "sheet";
		const SKIN         = "skin";
		const DIE_CUT      = "die_cut";
		const GIFTCARD     = "giftcard";
		const STICKER_PACK = "sticker_pack";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, TRUE );

			$this->addAttrValue( self::SINGLE );
			$this->addAttrValue( self::SHEET );
			$this->addAttrValue( self::SKIN );
			$this->addAttrValue( self::DIE_CUT );
			$this->addAttrValue( self::GIFTCARD );
			$this->addAttrValue( self::STICKER_PACK );
		}
	}
