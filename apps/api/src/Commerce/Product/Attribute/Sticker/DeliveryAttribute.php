<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class DeliveryAttribute extends ProductAttr
	{
		const ALIAS            = "delivery";
		const DELIVERY_SINGLE  = "single";
		const DELIVERY_SHEET   = "sheet";
		const DELIVERY_ROLL    = "roll";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, FALSE );

			$this->addAttrValue( self::DELIVERY_SINGLE );
			$this->addAttrValue( self::DELIVERY_SHEET );
			$this->addAttrValue( self::DELIVERY_ROLL );
		}
	}
