<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Item;

	use JsonSerializable;
	use function array_key_exists;

	final class ProductItem implements JsonSerializable
	{
		public string $productFamilyName;
		public string $productName;
		public float  $units      = 0;
		public string $sku        = "";
		public array  $attributes = array();

		public function __construct( string $productFamilyName, string $productName )
		{
			$this->productFamilyName = $productFamilyName;
			$this->productName       = $productName;
		}

		public function removeAttribute( string $attributeName ): self
		{
			unset( $this->attributes[ $attributeName ] );

			return $this;
		}

		public function setAttribute( string $attributeName, $value ): self
		{
			$this->attributes[ $attributeName ] = $value;

			return $this;
		}

		public function hasAttribute( string $attributeName ): bool
		{
			return array_key_exists( $attributeName, $this->attributes );
		}

		public function getAttribute( string $attributeName )
		{
			return array_key_exists( $attributeName, $this->attributes ) ? $this->attributes[ $attributeName ] : NULL;
		}

		public function setAttributes( array $attributes ): void
		{
			$this->attributes = $attributes;
		}

		/**
		 * @return float|int
		 */
		public function getUnits()
		{
			return $this->units;
		}

		/**
		 * @param float|int $units
		 */
		public function setUnits( $units ): void
		{
			$this->units = $units;
		}

		public function getAttributes(): array
		{
			return $this->attributes;
		}

		public function getProductFamilyName(): string
		{
			return $this->productFamilyName;
		}

		public function getProductName(): string
		{
			return $this->productName;
		}

		public static function fromJSON( $productItemAsJSON ): ProductItem
		{
			$productItem = new ProductItem( $productItemAsJSON[ 'productFamilyName' ], $productItemAsJSON[ 'productName' ] );
			$productItem->setAttributes( $productItemAsJSON[ 'attributes' ] );
			$productItem->setUnits( $productItemAsJSON[ 'units' ] );

			return $productItem;
		}

		public function toTestableOneDimensionalArray(): array
		{
			$oneDimensionalArray = array(
				"item.productFamilyName" => $this->productFamilyName,
				"item.productName"       => $this->productName,
				"item.units"             => $this->units,
			);

			foreach ( $this->attributes as $attributeName => $attributeValue )
			{
				$oneDimensionalArray[ 'item.attributes.' . $attributeName ] = $attributeValue;
			}

			return $oneDimensionalArray;
		}

		public function jsonSerialize()
		{
			return [
				"productFamilyName" => $this->productFamilyName,
				"productName"       => $this->productName,
				"units"             => $this->units,
				"attributes"        => $this->attributes,
				"sku"        		=> $this->sku
			];
		}


		public function getSku(): string
		{
			return $this->sku;
		}

		public function setSku(string $sku): self
		{
			$this->sku = $sku;
			return $this;
		}
	}
