<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class FixedSizeAttribute extends ProductAttr
	{
		const ALIAS = "fixed_size";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::BOOL, FALSE, TRUE );
		}
	}
