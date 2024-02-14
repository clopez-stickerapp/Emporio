<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Item\Processor;

	use StickerApp\Babylon\Commerce\Core\Product\Helper\ProductAttrComputer;
	use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
	use function in_array;
	use function is_array;
	use function is_string;

	class ProductItemProcessor
	{
		/**
		 * @var string|string[]
		 */
		private $productNames;

		/**
		 * @param string|string[] $productNames
		 */
		public function __construct( $productNames = "*" )
		{
			$this->productNames = $productNames;
		}

		/**
		 * Override.
		 */
		abstract public function process( ProductItem &$item, ProductAttrComputer $attrComputer );

		public function shouldProcess( ProductItem $item ): bool
		{
			$productNameMatch = FALSE;

			if ( is_string( $this->productNames ) )
			{
				$productNameMatch = $this->productNames == "*" || $this->productNames == $item->getProductName();
			}
			else if ( is_array( $this->productNames ) )
			{
				$productNameMatch = in_array( $item->getProductName(), $this->productNames );
			}

			return $productNameMatch;
		}
	}
