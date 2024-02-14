<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class CutDirectionAttribute extends ProductAttr
	{
		const ALIAS = "cut_direction";
		const AUTO = "auto";
		const BOTTOM_FIRST = "bottom_first";
		const TOP_FIRST = "top_first";
		const LEFT_FIRST = "left_first";
		const RIGHT_FIRST = "right_first";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, FALSE );

			$this->addAttrValue( self::AUTO );
			$this->addAttrValue( self::TOP_FIRST );
			$this->addAttrValue( self::BOTTOM_FIRST );
			$this->addAttrValue( self::RIGHT_FIRST );
			$this->addAttrValue( self::LEFT_FIRST );
		}
	}
