<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class SauceBaseAttribute extends ProductAttr
	{
		public function __construct()
		{
			parent::__construct(ProductAttrValueTypes::STRING, FALSE );

			$this->addAttrValue( "tomato" );
			$this->addAttrValue( "creme_fraiche" );

//			$this->addAttrValue( "ica_basic_tomato" );
//			$this->addAttrValue( "zeta_san_marzano_tomato" );
//			$this->addAttrValue( "skanemejeriet_creme_fraiche" );
//			$this->addAttrValue( "zeta_creme_fraiche" );
		}
	}
