<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class FixedQuantityAttribute extends ProductAttr
	{
		const ALIAS = "fixed_quantity";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::BOOL, FALSE, TRUE );
		}
	}
