<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class SheetTypeSaveAsAttribute extends ProductAttr
	{
		const ALIAS = "sheet_type_save_as";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, TRUE );
		}
	}
