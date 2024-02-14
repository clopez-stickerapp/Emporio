<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class InnercutAsKisscutAttribute extends ProductAttr
	{
		const ALIAS = "innercut_as_kisscut";
		const NO    = "no";
		const YES   = "yes";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE, FALSE );

			$this->addAttrValue( self::NO );
			$this->addAttrValue( self::YES );
		}
	}
