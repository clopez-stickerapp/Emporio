<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class DynamicStringAttr extends ProductAttr
	{
		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, TRUE );
		}
	}
