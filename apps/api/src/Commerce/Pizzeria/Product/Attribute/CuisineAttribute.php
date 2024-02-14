<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class CuisineAttribute extends ProductAttr
	{
		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING );

			$this->addAttrValue( "swedish" );
			$this->addAttrValue( "neopolitan" );
		}
	}
