<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class TextAttribute extends ProductAttr
	{
		const ALIAS = "text";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING );
		}
	}
