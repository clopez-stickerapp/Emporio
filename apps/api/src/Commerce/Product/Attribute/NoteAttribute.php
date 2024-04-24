<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class NoteAttribute extends ProductAttr
	{
		const ALIAS 		 = "note";
		const HANG_TAG 		 = "Hang tag";
		const FRONT_ADHESIVE = "Front adhesive";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, TRUE );
		}
	}
