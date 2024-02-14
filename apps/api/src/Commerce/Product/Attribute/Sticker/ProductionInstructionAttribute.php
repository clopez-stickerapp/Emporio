<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class ProductionInstructionAttribute extends ProductAttr
	{
		const ALIAS = "production_instruction";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, FALSE );

			$this->addAttrValue( "manual" );
			$this->addAttrValue( "cut_square_color_bleed" );
		}
	}
