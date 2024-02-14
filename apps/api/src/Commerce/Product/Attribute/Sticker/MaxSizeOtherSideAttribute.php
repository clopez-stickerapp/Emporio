<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class MaxSizeOtherSideAttribute extends ProductAttr
	{
		const ALIAS = "max_size_other_side_mm";

		const MAX_SIZE_OTHER_SIDE_ROLL = 275;

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::INT, FALSE, TRUE );

			$this->addAttrValue( self::MAX_SIZE_OTHER_SIDE_ROLL );
		}
	}
