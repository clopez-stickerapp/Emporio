<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class ToppingAttribute extends ProductAttr
	{
		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, TRUE );

			$this->addAttrValue( "cheese" );
			$this->addAttrValue( "mushroom" );
			$this->addAttrValue( "ham" );
			$this->addAttrValue( "onion" );
			$this->addAttrValue( "garlic" );
			$this->addAttrValue( "walnut" );
			$this->addAttrValue( "pineapple" );
		}
	}
