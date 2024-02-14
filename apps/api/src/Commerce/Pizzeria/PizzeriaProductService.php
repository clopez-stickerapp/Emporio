<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria;

	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\CuisineAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\IngredientAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\SauceBaseAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\ToppingAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\PizzaFamily;

	class PizzeriaProductService extends ProductService
	{
		public function __construct()
		{
			$this->registerAttribute( new SauceBaseAttribute() );
			$this->registerAttribute( new IngredientAttribute() );
			$this->registerAttribute( new ToppingAttribute() );
			$this->registerAttribute( new CuisineAttribute() );

			$this->registerProductFamily( new PizzaFamily( $this ) );
		}
	}
