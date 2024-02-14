<?php

	namespace StickerApp\Babylon\Commerce\Core\Product;

	use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrNotFoundException;
	use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrValueInvalidException;
	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Helper\Condition\Condition;
	use StickerApp\Babylon\Helper\Condition\ConditionBuilder;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;
	use function array_key_exists;
	use function in_array;

	class Product
	{
		protected ProductService   $productService;
		protected ProductFamily    $productFamily;
		protected string           $name;
		protected array            $withAttrValueMap    = array();
		protected array            $withAttrStrictMatch = array();
		protected ConditionBuilder $conditions;
		protected bool			   $inStock;
		public string		  	   $sku;

		public function __construct( ProductFamily $productFamily, string $name, string $sku )
		{
			$this->productFamily = $productFamily;
			$this->name          = $name;
			$this->conditions    = new ConditionBuilder();
			$this->inStock		 = true;
			$this->sku			 = $sku;
		}

		/**
		 * @param string $attrName
		 * @param string $operator
		 * @param int|string|number|array|bool $attrValue
		 *
		 * @return $this
		 * @throws \StickerApp\Babylon\Helper\Condition\Exception\ConditionTestFailedException
		 */
		public function addCondition( string $attrName, string $operator, $attrValue = NULL ): self
		{
			$this->conditions->addCondition( $attrName, $operator, $attrValue );

			return $this;
		}

		public function isAttrValuesRecommendedFor( string $attrName ): bool
		{
			return array_key_exists( $attrName, $this->withAttrValueMap );
		}

		public function isAttrValuesStrictlyRequiredFor( string $attrName ): bool
		{
			return in_array( $attrName, $this->withAttrStrictMatch );
		}

		public function testAttributes( array $attributes )
		{
			return $this->getConditions()->test( $attributes );
		}

		/**
		 * Does this product has any constraints / conditions on this attribute?
		 */
		public function canAttrBe( string $attrName, $attrValue ): bool
		{
			$attrUID = $this->productFamily->findAttrUIDByAlias( $attrName );
			$attr    = $this->productService->retrieveAttribute( $attrUID );
			if ( $attr )
			{
				try
				{
					$attr->canBe( $attrValue );
				}
				catch( ProductAttrValueInvalidException $exception )
				{
					return FALSE;
				}
				$testData = array(
					$attrName => $attrValue
				);

				foreach ( $this->conditions->getConditions() as $condition )
				{
					if ( $condition->columnName == $attrName )
					{
						$result = $condition->test( $testData );
						if ( !$result )
						{
							return FALSE;
						}
					}
				}

				return TRUE;
			}

			return FALSE;
		}

		public function canHaveAttr( string $attrName ): bool
		{
			if ( array_key_exists( $attrName, $this->productFamily->getRequiredAttrs() ) || array_key_exists( $attrName, $this->productFamily->getSupportedAttrs() ) )
			{
				return TRUE;
			}

			return FALSE;
		}

		public function getWithAttrValue( string $attrName )
		{
			return array_key_exists( $attrName, $this->withAttrValueMap ) ? $this->withAttrValueMap[ $attrName ] : NULL;
		}

		public function withAttrValue( string $attrName, $value, $required = TRUE, bool $strictMatchIfRequired = TRUE ): self
		{
			$attrUID = $this->productFamily->findAttrUIDByAlias( $attrName );
			if ( !$attrUID || !($attr = $this->productService->retrieveAttribute( $attrUID )) )
			{
				throw new ProductAttrNotFoundException( "Cannot do Product::withAttrValue( $attrName ) because '$attrName' is not an alias for product {$this->getName()}." );
			}

			$this->withAttrValueMap[ $attrName ] = $value;
			if ( $required && $strictMatchIfRequired )
			{
				$this->withAttrStrictMatch[] = $attrName;
			}

			if ( $required )
			{
				if ( $attr->isMultiValue() )
				{
					if ( $strictMatchIfRequired )
					{
						$this->addCondition( $attrName, "==", $value );
					}
					else
					{
						if ( !is_array( $value ) )
						{
							$value = array($value);
						}
						foreach ( $value as $subValue )
						{
							$this->addCondition( $attrName, ConditionOperators::IN, $subValue );
						}
					}
				}
				else
				{
					if ( is_array( $value ) )
					{
						$this->addCondition( $attrName, ConditionOperators::IN, $value );
					}
					else
					{
						$this->addCondition( $attrName, "==", $value );
					}
				}
			}

			return $this;
		}

		public function setStock() : void
		{
			$inStock = $this->getInStock();
			foreach ( $this->getWithAttrValueMap() as $key => $value )
			{
				if( !is_array( $value ) )
				{
					$value = array( $value );
				}
				if( !$this->isWithAttrInStock( $key, $value )  )
				{
					$inStock = false;
					break;
				}
			}
			$this->inStock = $inStock;
		}

		public function isWithAttrInStock( string $attrName,  array $attrValue ): bool
		{
			$outOfStock = $this->productService->retrieveAttrStockCollection( $this->productFamily->getStockCollectionName() );
			$outOfStockForAttr = $outOfStock->getOutOfStockFor( $attrName )->out_of_stock ?? array();
			return empty( array_intersect( $outOfStockForAttr, $attrValue ) );
		}

		public function getName(): string
		{
			return $this->name;
		}

		public function getProductService(): ProductService
		{
			return $this->productService;
		}

		public function setProductService( ProductService $productService ): void
		{
			$this->productService = $productService;
		}

		public function getProductFamily(): ProductFamily
		{
			return $this->productFamily;
		}

		public function getWithAttrValueMap(): array
		{
			return $this->withAttrValueMap;
		}

		/**
		 * @return ConditionBuilder
		 */
		public function getConditions(): ConditionBuilder
		{
			return $this->conditions;
		}

		/**
		 * @return bool
		 */
		public function getInStock(): bool
		{
			return $this->inStock;
		}


		/**
		 * @return string
		 */
		public function getSku(): string
		{
			return $this->sku;
		}

		/**
		 * @param string $sku
		 * @return Product
		 */
		public function setSku(string $sku): self
		{
			$this->sku = $sku;
			return $this;
		}
	}
