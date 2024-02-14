<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class FeatureAttribute extends ProductAttr
	{
		const ALIAS           = "feature";
		const BACKPAPER_PRINT = "backpaper_print";
		const HANGTAGGING      = "hangtagging";
		const TRANSFER_TAPE = "transfer_tape";
		const EFFECT_LAYER     = "effect_layer";
		const VARIABLE_DATA    = "variable_data";
		const MANUAL_BACKSCORE = "manual_backscore";
		const PACK_SET_AMOUNT = "pack_set_amount";
		const PERFORATION = "perforation";

		const OUT_OF_STOCK = array();

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, TRUE );

			$this->addAttrValue( self::HANGTAGGING );
			$this->addAttrValue( self::BACKPAPER_PRINT );
			$this->addAttrValue( self::EFFECT_LAYER );
			$this->addAttrValue( self::TRANSFER_TAPE );
			$this->addAttrValue( self::VARIABLE_DATA );
			$this->addAttrValue( self::MANUAL_BACKSCORE );
			$this->addAttrValue( self::PACK_SET_AMOUNT );
			$this->addAttrValue( self::PERFORATION );
		}
	}
