<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class OutlineAttribute extends ProductAttr
	{
		const ALIAS = "outline";

		public function __construct()
		{
			parent::__construct(ProductAttrValueTypes::STRING, FALSE, TRUE );
		}
	}
