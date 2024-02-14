<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class ImperialUnitsAttribute extends ProductAttr
	{
		const ALIAS = "imperial_units";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::BOOL, FALSE );

			$this->addAttrValue( FALSE );
			$this->addAttrValue( TRUE );
		}
	}
