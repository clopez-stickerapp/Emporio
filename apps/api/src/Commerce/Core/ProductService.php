<?php

	namespace StickerApp\Babylon\Commerce\Core;

    use StickerApp\Babylon\Commerce\Core\Exception\ProductServiceException;
    use StickerApp\Babylon\Commerce\Core\Price\ProductPriceProvider;
    use StickerApp\Babylon\Commerce\Core\Price\ProductQuantityListCollection;
    use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrContraintCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilterCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Icon\ProductAttrIconCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Stock\ProductAttrStockCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValue;
	use StickerApp\Babylon\Commerce\Core\Product\Product;
	use StickerApp\Babylon\Commerce\Core\Product\ProductFamily;

	use function array_key_exists;
	use function is_bool;
	use function var_export;

	class ProductService
	{
		/**
		 * @var ProductAttr[]
		 */
		protected array $attributes = array();

		/**
		 * @var ProductFamily[]
		 */
		protected array $productFamilies = array();

		/**
		 * @var string[]
		 */
		protected array $productSkus = array();


		/**
		 * Constraints are used to tell the product service which attributes can not be combined.
		 * In other words here we set rules for what is simply not possible to do.
		 *
		 * For instance: Laser materials are impossible to produce a sticker larger than 28cm.
		 *
		 * @var ProductAttrContraintCollection[]
		 */
		protected array $attrConstraintCollections = array();

		/**
		 * Filters are used to limit what attribute values are available / visible.
		 * For instance: only show a set of materials if a specific product is selected.
		 *
		 * We can then choose to ignore filters for admin / QT users.
		 *
		 * @var ProductAttrFilterCollection[]
		 */
		protected array $attrFilterCollections = array();

		/**
		 * Icons are used to show icons in the wizard for attributes.
		 * For instance: show a material icon for the material attribute.
		 *
		 * @var ProductAttrIconCollection[]
		 */
		protected array $attrIconCollections = array();

    /**
     * Stock keeps track of which attribute values are available to filter on
		 * An product with no valid attribute values should be out of stock
		 *
		 * We can then choose to ignore filters for admin / QT users.
		 *
		 * @var ProductAttrStockCollection[]
		 */
		protected array $attrStockCollections = array();

        /**
         * @var ProductPriceProvider[]
         */
        protected array $priceProviders = array();

        /**
         * @var ProductQuantityListCollection[]
         */
        protected array $quantityListCollections = array();

		public function registerAttrFilterCollection( ProductAttrFilterCollection $collection ): void
		{
			if ( array_key_exists( $collection->getCollectionName(), $this->attrFilterCollections ) )
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Constraint collection already exists with name {$collection->getCollectionName()}" );
			}

			$this->attrFilterCollections[ $collection->getCollectionName() ] = $collection;
		}

		public function retrieveAttrFilterCollection( string $collectionName ): ProductAttrFilterCollection
		{
			if ( !array_key_exists( $collectionName, $this->attrFilterCollections ) )
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Constraint collection not found with name {$collectionName}" );
			}

			return $this->attrFilterCollections[ $collectionName ];
		}

		public function registerAttrIconCollection(ProductAttrIconCollection $collection): void
		{
			if (array_key_exists($collection->getCollectionName(), $this->attrIconCollections)) {
				// TODO: Custom exception
				throw new ProductServiceException("Constraint collection already exists with name {$collection->getCollectionName()}");
			}

			$this->attrIconCollections[$collection->getCollectionName()] = $collection;
		}

		public function retrieveAttrIconCollection(string $collectionName): ProductAttrIconCollection
		{
			if (!array_key_exists($collectionName, $this->attrIconCollections)) {
				// TODO: Custom exception
				throw new ProductServiceException("Icon collection not found with name {$collectionName}");
			}

			return $this->attrIconCollections[$collectionName];
		}

		public function registerAttrConstraintCollection( ProductAttrContraintCollection $collection ): void
		{
			if ( array_key_exists( $collection->getCollectionName(), $this->attrConstraintCollections ) )
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Constraint collection already exists with name {$collection->getCollectionName()}" );
			}

			$this->attrConstraintCollections[ $collection->getCollectionName() ] = $collection;
		}

		public function retrieveAttrConstraintCollection( string $collectionName ): ProductAttrContraintCollection
		{
			if ( !array_key_exists( $collectionName, $this->attrConstraintCollections ) )
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Constraint collection not found with name {$collectionName}" );
			}

			return $this->attrConstraintCollections[ $collectionName ];
		}

		public function registerAttrStockCollection( ProductAttrStockCollection $collection ): void
		{
			if ( array_key_exists( $collection->getCollectionName(), $this->attrStockCollections ) )
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Stock collection already exists with name {$collection->getCollectionName()}" );
			}

			$this->attrStockCollections[ $collection->getCollectionName() ] = $collection;
		}

		public function retrieveAttrStockCollection( string $collectionName ): ProductAttrStockCollection
		{
			if ( !array_key_exists( $collectionName, $this->attrStockCollections ) )
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Stock collection not found with name {$collectionName}" );
			}

			return $this->attrStockCollections[ $collectionName ];
		}

		public function registerAttribute( ProductAttr $attr ): void
		{
			if ( array_key_exists( $attr->getUID(), $this->attributes ) )
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Cannot add attribute. Attribute already exists." );
			}

			$this->attributes[ $attr->getUID() ] = $attr;
		}

		public function retrieveAttribute( ?string $attrUID ): ProductAttr
		{
			if ( $attrUID && array_key_exists( $attrUID, $this->attributes ) )
			{
				return $this->attributes[ $attrUID ];
			}
			else
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Attribute not found with UID: {$attrUID}" );
			}
		}

		public function findAttributeValue( string $attributeUID, $attributeValue ): ?ProductAttrValue
		{
			if ( $attr = $this->retrieveAttribute( $attributeUID ) )
			{
				return $attr->getAttrValue( $attributeValue );
			}

			return NULL;
		}

		public function registerProductFamily( ProductFamily $productFamily ): void
		{
			if ( array_key_exists( $productFamily->getName(), $this->productFamilies ) )
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Cannot add product type. Product type already exists." );
			}

			$this->productFamilies[ $productFamily->getName() ] = $productFamily;
		}

		public function registerProductSku( string $sku ): void
		{
			if ( in_array( $sku, $this->productSkus ) )
			{
				throw new ProductServiceException( "SKU $sku already exists. SKU value must be unique per product" );
			}
			$this->productSkus[] = $sku;
		}

		public function retrieveProductFamily( string $productFamilyName ): ProductFamily
		{
			if ( array_key_exists( $productFamilyName, $this->productFamilies ) )
			{
				return $this->productFamilies[ $productFamilyName ];
			}
			else
			{
				// TODO: Custom exception
				throw new ProductServiceException( "Product family not found with name {$productFamilyName}" );
			}
		}

		public function retrieveProductFamilies(): array
		{
			return $this->productFamilies;
		}

		public function findProduct( string $productFamilyName, string $productName ): ?Product
		{
			if ( $type = $this->retrieveProductFamily( $productFamilyName ) )
			{
				if ( $product = $type->getProduct( $productName ) )
				{
					return $product;
				}
			}

			return NULL;
		}

		public function retrieveAttributes(): array
		{
			return $this->attributes;
		}

        public function registerPriceProvider( ProductPriceProvider $provider ): void
		{
			if ( array_key_exists( $provider->getName(), $this->priceProviders ) )
			{
                // TODO: Custom exception
				throw new ProductServiceException( "PriceProvider already exists with name {$provider->getName()}" );
			}

			$this->priceProviders[ $provider->getName() ] = $provider;
		}

		public function retrievePriceProvider( string $providerName ): ProductPriceProvider
		{
			if ( !array_key_exists( $providerName, $this->priceProviders ) )
			{
                // TODO: Custom exception
				throw new ProductServiceException( "PriceProvider not found with name {$providerName}" );
			}

			return $this->priceProviders[ $providerName ];
		}

        public function registerQuantityListCollection( ProductQuantityListCollection $collection ): void
		{
			if ( array_key_exists( $collection->getCollectionName(), $this->quantityListCollections ) )
			{
                // TODO: Custom exception
				throw new ProductServiceException( "QuantityList collection already exists with name {$collection->getCollectionName()}" );
			}

			$this->quantityListCollections[ $collection->getCollectionName() ] = $collection;
		}

		public function retrieveQuantityListCollection( string $collectionName ): ProductQuantityListCollection
		{
			if ( !array_key_exists( $collectionName, $this->quantityListCollections ) )
			{
                // TODO: Custom exception
				throw new ProductServiceException( "QuantityList collection not found with name {$collectionName}" );
			}

			return $this->quantityListCollections[ $collectionName ];
		}
	}
