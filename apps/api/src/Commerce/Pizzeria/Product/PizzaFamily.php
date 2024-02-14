<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria\Product;

	use StickerApp\Babylon\Commerce\Core\Product\ProductFamily;
	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\Constraint\PizzeriaConstraintsCollection;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\CuisineAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\IngredientAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\PortionAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\SauceBaseAttribute;

	class PizzaFamily extends ProductFamily
	{
		public function __construct( ProductService $productService )
		{
			parent::__construct( "pizza", 1, $productService );

			$this->relateConstraintCollection( PizzeriaConstraintsCollection::NAME );

			$this->requireAttr( SauceBaseAttribute::class, "sauce_base" );
			$this->requireAttr( IngredientAttribute::class, "ingredient" );
			$this->requireAttr( CuisineAttribute::class, "cuisine" );
			$this->requireAttr( PortionAttribute::class, "portion" );

			$this->addProduct( "make_your_own", 123 )
			     ->withAttrValue( "ingredient", array(
				     "cheese",
			     ), FALSE );
			$this->addProduct( "margarhita", 124 )
			     ->withAttrValue( "sauce_base", "tomato" ) // Cannot change sauce base to creme fraiche
			     ->withAttrValue( "ingredient", array(
					"cheese"
				) );
			$this->addProduct( "capriciosa", 125 )
			     ->withAttrValue( "sauce_base", "tomato" )
			     ->withAttrValue( "ingredient", array(
				     "cheese",
				     "ham",
				     "mushroom"
			     ) );
			$this->addProduct( "hawaii", 121 )
			     ->withAttrValue( "sauce_base", "tomato" )
			     ->withAttrValue( "ingredient", array(
				     "cheese",
				     "ham",
				     "pineapple"
			     ) );
			$this->addProduct( "bianca", 129 )
			     ->withAttrValue( "sauce_base", "creme_fraiche" )
			     ->withAttrValue( "ingredient", array(
				     "cheese",
				     "garlic",
				     "walnut"
			     ) );

//			$this->addProduct( "make_your_own" )
//			     ->withAttrValue( "ingredient", array(
//				     "ica_basic_mozzarella",
//			     ), FALSE );

//			$this->addProduct( "margarhita_swedish" )
//			     ->withAttrValue( "sauce_base", "ica_basic_tomato" )
//			     ->withAttrValue( "ingredient", array(
//				     "ica_basic_mozzarella"
//			     ) );
//			$this->addProduct( "margarhita_neopolitan" )
//			     ->withAttrValue( "sauce_base", "zeta_san_marzano_tomato" )
//			     ->withAttrValue( "ingredient", array(
//				     "zeta_mozzarella"
//			     ) );
//			$this->addProduct( "capriciosa_swedish" )
//			     ->withAttrValue( "sauce_base", "ica_basic_tomato" )
//			     ->withAttrValue( "ingredient", array(
//				     "ica_basic_mozzarella",
//				     "ica_basic_ham",
//				     "mushroom"
//			     ) );
//			$this->addProduct( "capriciosa_neopolitan" )
//			     ->withAttrValue( "sauce_base", "zeta_san_marzano_tomato" )
//			     ->withAttrValue( "ingredient", array(
//				     "zeta_mozzarella",
//				     "zeta_ham",
//				     "mushroom"
//			     ) );
//
//			$this->addProduct( "hawaii_swedish" )
//			     ->withAttrValue( "sauce_base", "ica_basic_tomato" )
//			     ->withAttrValue( "ingredient", array(
//				     "ica_basic_mozzarella",
//				     "ica_basic_ham",
//				     "pineapple"
//			     ) );
//
//			$this->addProduct( "bianca_swedish" )
//			     ->withAttrValue( "sauce_base", "skanemejeriet_creme_fraiche" )
//			     ->withAttrValue( "ingredient", array(
//				     "ica_basic_mozzarella",
//				     "garlic",
//				     "walnut"
//			     ) );
//			$this->addProduct( "bianca_neopolitan" )
//			     ->withAttrValue( "sauce_base", "zeta_creme_fraiche" )
//			     ->withAttrValue( "ingredient", array(
//				     "zeta_mozzarella",
//				     "garlic",
//				     "walnut"
//			     ) );
		}
	}
