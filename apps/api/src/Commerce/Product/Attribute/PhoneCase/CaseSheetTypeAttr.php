<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\PhoneCase;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class CaseSheetTypeAttr extends ProductAttr
	{
		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING );

			$this->addAttrValue( "case" );
		}
	}
