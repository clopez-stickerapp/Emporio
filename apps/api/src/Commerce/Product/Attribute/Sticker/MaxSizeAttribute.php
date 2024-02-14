<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class MaxSizeAttribute extends ProductAttr
	{
		const ALIAS                       = "max_size_mm";

		const MAX_SIZE_LASER          = 275;
		const MAX_SIZE_DIGITAL        = 1250;
		const MAX_SIZE_SHEET_LEGACY   = 300;
		const MAX_SIZE_ONE_SIDE_LASER = 800;
		const MAX_SIZE_ROLL           = 980;
		const MAX_SIZE_TRANSFER_TAPE  = 1130;

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::INT, FALSE, TRUE );
			$this->addAttrValue( self::MAX_SIZE_LASER );
			$this->addAttrValue( self::MAX_SIZE_DIGITAL );
			$this->addAttrValue( self::MAX_SIZE_SHEET_LEGACY );
			$this->addAttrValue( self::MAX_SIZE_ONE_SIDE_LASER );
			$this->addAttrValue( self::MAX_SIZE_ROLL );
		}
	}
