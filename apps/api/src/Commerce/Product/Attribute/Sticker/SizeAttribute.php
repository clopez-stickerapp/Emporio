<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class SizeAttribute extends ProductAttr
	{
		const ALIAS = "size";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE );

			$this->setDynamicValue( TRUE );
		}
	}
