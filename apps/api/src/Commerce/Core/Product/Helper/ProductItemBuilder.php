<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Helper;

	use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrNotFoundException;
	use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;
	use function array_merge;
	use function array_pop;
	use function array_push;
	use function array_shift;
	use function is_array;

	class ProductItemBuilder
	{
		protected ProductService         $ps;
		protected ProductAttrComputer $attrComputer;

		public function __construct( ProductService $ps, bool $useFilters = true )
		{
			$this->ps              = $ps;
			$this->attrComputer = new ProductAttrComputer( $ps, $useFilters );
		}

		public function createItem( string $productFamilyName, string $productName, array $withAttributes = [] ): ?ProductItem
		{
			$productFamily = $this->ps->retrieveProductFamily( $productFamilyName );
			if ( $productFamily )
			{
				$product = $productFamily->getProduct( $productName );
				if ( $product )
				{
					$item = new ProductItem( $productFamilyName, $productName );
					$item->setSku( $product->getSku() );

					foreach ( $productFamily->getRequiredAttrs() as $attrName => $attrUID )
					{
						$attr = $this->ps->retrieveAttribute( $attrUID );
						if ( !$attr )
						{
							throw new ProductAttrNotFoundException( "Couldn't find the required attribute: $attrName" );
						}
						$attrValue = $product->getWithAttrValue( $attrName );
						if ( !$attrValue )
						{
							$attrValue = $this->attrComputer->getDefaultValue( $item, $attrName );
						}

						if ( is_array( $attrValue ) && !$attr->isMultiValue() )
						{
							$attrValue = array_shift( $attrValue );
						}

						$item->setAttribute( $attrName, $attrValue );
					}

					foreach ( $product->getWithAttrValueMap() as $key => $value )
					{
						$attrUID = $productFamily->findAttrUIDByAlias( $key );
						$attr    = $this->ps->retrieveAttribute( $attrUID );

						if ( is_array( $value ) && !$attr->isMultiValue() )
						{
							$value = array_shift( $value );
						}

						if ( !$item->getAttribute( $key ) )
						{
							if ( $attr->canBe( $value ) )
							{
								$item->setAttribute( $key, $value );
							}
						}
					}

					$item->setAttributes(array_merge($item->getAttributes(), $withAttributes));

					$item->setUnits( $productFamily->getMinimumUnits( $item ) );

					return $item;
				}
			}

			return NULL;
		}
	}
