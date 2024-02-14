<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class WhiteLayerAttribute extends ProductAttr
	{
		const ALIAS = "white_layer";
		const ALPHA = "alpha";
		const MANUALLY = "manually";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, FALSE );

			$this->addAttrValue( self::ALPHA );
			$this->addAttrValue( self::MANUALLY );
		}
	}
