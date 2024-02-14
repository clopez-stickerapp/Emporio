<?php

	namespace StickerApp\Babylon\Commerce\Core\Product;

	use ErrorException;
    use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrAliasNotSupportedByFamilyException;
	use StickerApp\Babylon\Commerce\Core\Exception\ProductFamilyException;
	use StickerApp\Babylon\Commerce\Core\Exception\ProductServiceException;
    use StickerApp\Babylon\Commerce\Core\Price\ProductPriceProvider;
    use StickerApp\Babylon\Commerce\Core\Price\ProductQuantityListCollection;
    use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrContraintCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilterCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Icon\ProductAttrIconCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Stock\ProductAttrStockCollection;
    use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
    use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Core\Product\Value\ProductDynamicValue;
    use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;

	use function array_key_exists;
	use function array_keys;
	use function array_merge;
	use function array_pop;
	use function floatval;
	use function intval;
	use function is_string;
	use function ksort;
	use function var_export;
	use const SORT_DESC;

	abstract class ProductFamily
	{
		protected ProductService   $productService;
		protected string           $name;
		protected ?string          $attrConstraintCollectionName       = NULL;
		protected ?string          $attrFilterCollectionName           = NULL;
		protected ?string          $attrOutOfStockCollectionName       = NULL;
		protected ?string          $attrIconCollectionName             = NULL;
    	protected ?string          $attrStockCollectionName            = NULL;
		protected ?string          $productItemProcessorCollectionName = NULL;
    	protected ?string          $priceProviderName                  = NULL;
    	protected ?string          $productQuantityListCollectionName  = NULL;

    public ProductDynamicValue $minimumUnitsValue;
		/**
		 * @var Product[]
		 */
		protected array $products       = array();
		protected array $requiredAttrs  = array();
		protected array $supportedAttrs = array();

		public function __construct( string $name, float $defaultMinimumUnitsValue, ProductService $productService )
		{
			$this->name = $name;
			// TODO: Validate that the float val of the minimum values matches min unit value when Units are in place
			$this->minimumUnitsValue = new ProductDynamicValue( $defaultMinimumUnitsValue );
			$this->productService    = $productService;
		}

		// TODO: Move to helper class
		public function findProductByAttr( array $attr ): ?Product
		{
			$searchResult    = array();
			$totalAttributes = count( $attr );

			foreach ( $this->products as $product )
			{
				echo "-------------------------" . "<br/>";
				echo $product->getName() . "<br/>";
				$totalMatches = 0;
				foreach ( $attr as $name => $value )
				{
					if ( $product->canAttrBe( $name, $value ) )
					{
						$totalMatches ++;
						echo "$name can be " . var_export( $value, TRUE ) . "<br/>";
					}
				}
				echo "-------------------------" . "<br/>" . "<br/>";
//				var_export( array(
//					"product"      => $product->getName(),
//					"totalMatches" => $totalMatches
//				) );
				$rating = intval( floatval( $totalMatches / $totalAttributes ) * 100 );
				if ( $rating >= 100 )
				{
					return $product;
				}
				else
				{
					while( array_key_exists( $rating, $searchResult ) )
					{
						$rating += 1;
					}
					$searchResult[ $rating ] = $product;
				}
			}
			var_export( array_keys( $searchResult ) );

			if ( !empty( $searchResult ) )
			{
				ksort( $searchResult, SORT_DESC );

				return array_pop( $searchResult );
			}

			return NULL;
		}

		/**
		 * @param string|Product $product
		 * @param string $sku
		 *
		 * @return Product
		 * @throws ProductFamilyException
		 */
		public function addProduct( $product, $sku ): Product
		{
			if ( is_string( $product ) )
			{
				$productName = $product;
				$product     = new Product( $this, $productName, $sku );
			}
			else if ( $product instanceof Product )
			{
				$productName = $product->getName();
			}
			else
			{
				throw new ProductFamilyException( "Is not a product." );
			}
			$product->setProductService( $this->productService );

			if ( array_key_exists( $productName, $this->products ) )
			{
				throw new ProductFamilyException( "Product already exists: $productName" );
			}

			$this->productService->registerProductSku($sku);

			$this->products[ $productName ] = $product;

			return $product;
		}

		public function getMinimumUnits( ProductItem $productItem ): float
		{
			return $this->minimumUnitsValue->getValue( $productItem );
		}

		public function getProduct( string $productName ): ?Product
		{
			if ( array_key_exists( $productName, $this->products ) )
			{
				return $this->products[ $productName ];
			}

			return NULL;
		}

		public function getProducts(): array
		{
			return $this->products;
		}

		public function requireAttr( string $attributeClassRef, string $alias ): void
		{
			if ( array_key_exists( $alias, $this->requiredAttrs ) )
			{
				throw new ErrorException( "Attribute alias already required." );
			}
			if ( array_key_exists( $alias, $this->supportedAttrs ) )
			{
				throw new ErrorException( "Attribute alias already supported." );
			}

			$this->requiredAttrs[ $alias ] = $attributeClassRef;
		}

		public function getName(): string
		{
			return $this->name;
		}

		public function findAttrUIDByAlias( string $attrAlias ): ?string
		{
			if ( array_key_exists( $attrAlias, $this->requiredAttrs ) )
			{
				return $this->requiredAttrs[ $attrAlias ];
			}
			if ( array_key_exists( $attrAlias, $this->supportedAttrs ) )
			{
				return $this->supportedAttrs[ $attrAlias ];
			}

			throw new ProductAttrAliasNotSupportedByFamilyException( "Alias is not supported by product family: $attrAlias ({$this->getName()})" );

			return NULL;
		}

		public function isRequired(string $attrAlias):bool
		{
			return array_key_exists($attrAlias, $this->requiredAttrs);
		}

		public function isSupported(string $attrAlias):bool
		{
			if($this->isRequired($attrAlias))
			{
				return true;
			}

			return array_key_exists($attrAlias, $this->supportedAttrs);
		}

		public function getRequiredAttrs(): array
		{
			return $this->requiredAttrs;
		}

		public function supportAttr( string $attributeClassRef, string $alias ): void
		{
			if ( array_key_exists( $alias, $this->requiredAttrs ) )
			{
				throw new ErrorException( "Attribute alias already required." );
			}
			if ( array_key_exists( $alias, $this->supportedAttrs ) )
			{
				throw new ErrorException( "Attribute alias already supported." );
			}

			$this->supportedAttrs[ $alias ] = $attributeClassRef;
		}

		public function getAttributes(): array
		{
			return array_merge( $this->supportedAttrs, $this->requiredAttrs );
		}

		public function getSupportedAttrs(): array
		{
			return $this->supportedAttrs;
		}

		public function getProductService(): ProductService
		{
			return $this->productService;
		}

		public function setProductService( ProductService $productService ): void
		{
			$this->productService = $productService;
		}

		public function getConstraintsCollection(): ?ProductAttrContraintCollection
		{
			return $this->getConstraintCollectionName() ? $this->getProductService()->retrieveAttrConstraintCollection( $this->getConstraintCollectionName() ) : NULL;
		}

		public function getConstraintCollectionName(): ?string
		{
			return $this->attrConstraintCollectionName;
		}

		public function getIconsCollection(): ?ProductAttrIconCollection
		{
			return $this->getIconCollectionName() ? $this->getProductService()->retrieveAttrIconCollection( $this->getIconCollectionName() ) : NULL;
		}

		public function getIconCollectionName(): ?string
		{
			return $this->attrIconCollectionName;
		}

		public function relateIconCollection( ?string $collectionName ): void
		{
			$this->attrIconCollectionName = $collectionName;
		}

		public function relateConstraintCollection( ?string $collectionName ): void
		{
			$this->attrConstraintCollectionName = $collectionName;
		}

		public function getFilterCollection(): ?ProductAttrFilterCollection
		{
			return $this->getFilterCollectionName() ? $this->getProductService()->retrieveAttrFilterCollection( $this->getFilterCollectionName() ) : NULL;
		}

		public function getFilterCollectionName(): ?string
		{
			return $this->attrFilterCollectionName;
		}

		public function relateFilterCollection( ?string $attrFilterCollectionName ): void
		{
			$this->attrFilterCollectionName = $attrFilterCollectionName;
		}

		public function getStockCollection(): ?ProductAttrStockCollection
		{
			return $this->getStockCollectionName() ? $this->getProductService()->retrieveAttrStockCollection( $this->getStockCollectionName() ) : NULL;
		}

		public function getStockCollectionName(): ?string
		{
			return $this->attrStockCollectionName;
		}

		public function relateStockCollection( ?string $attrStockCollectionName ): void
		{
			$this->attrStockCollectionName = $attrStockCollectionName;
		}

        public function relateProductPriceProvider( ?string $collectionName ): void
		{
			$this->priceProviderName = $collectionName;
		}

		public function getProductPriceProvider(): ?ProductPriceProvider
		{
			return $this->getProductPriceProviderName() ? $this->getProductService()->retrievePriceProvider( $this->getProductPriceProviderName() ) : NULL;
		}

		public function getProductPriceProviderName(): ?string
		{
			return $this->priceProviderName;
		}

        public function relateProductQuantityListCollection( ?string $collectionName ): void
		{
			$this->productQuantityListCollectionName = $collectionName;
		}

		public function getProductQuantityListCollection(): ?ProductQuantityListCollection
		{
			return $this->getProductQuantityListCollectionName() ? $this->getProductService()->retrieveQuantityListCollection( $this->getProductQuantityListCollectionName() ) : NULL;
		}

		public function getProductQuantityListCollectionName(): ?string
		{
			return $this->productQuantityListCollectionName;
		}

        /**
         * Allows for custom unit calculations before the price is calculated
         *
         * @return boolean
         */
        public function validateUnits(ProductItem $p): bool{
            return true;
        }

		/**
		 * Returns the minimum quantity for a ProductItem that can be ordered.
		 *
		 * @param ProductItem $productItem
		 * @param string $lang
		 * @return int
		 */
		public function getMinimumQuantity(ProductItem $productItem): int
		{
			return 1;
		}

		public function getOutOfStockProducts(): array
		{
			$outOfStockProducts = array();
			foreach( $this->products as $product ) {
				if( !$product->getInStock() )
				{
					$outOfStockProducts[] = $product->getName();
				}
			}
			return $outOfStockProducts;
		}
	}
