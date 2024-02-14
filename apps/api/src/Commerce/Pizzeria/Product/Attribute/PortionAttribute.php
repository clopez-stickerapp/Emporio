<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class PortionAttribute extends ProductAttr
	{
		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE );

			$this->addAttrValue( "normal" );
			$this->addAttrValue( "family" );
		}
	}
