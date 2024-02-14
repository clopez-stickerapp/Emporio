<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Helper;

	use ArrayObject;
	use StickerApp\Babylon\Commerce\Core\Product\Condition\ProductItemConditionableParam;
	use StickerApp\Babylon\Commerce\Core\Product\ProductFamily;
	use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Util\ArrayUtil;

	use function array_merge;

	class ProductItemConditionablesMap extends ArrayObject
	{
		public array           $map = array();
		private ProductService $ps;
		private ProductFamily  $productFamily;

		public function __construct( ProductService $ps, ProductFamily $productFamily )
		{
			$this->ps                 = $ps;
			$this->productFamily      = $productFamily;
			$productNameConditionable = new ProductItemConditionableParam( "item.productName", "Product name", FALSE, FALSE, "string" );
			foreach ( $productFamily->getProducts() as $product )
			{
				$productNameConditionable->values[] = $product->getName();
			}
			$this->map[ 'item.productName' ] = $productNameConditionable;
			$unitConditionable               = new ProductItemConditionableParam( "item.units", "Units", TRUE, FALSE, "float" );
			$this->map[ 'item.units' ]       = $unitConditionable;

			$attrs = array_merge( $productFamily->getRequiredAttrs(), $productFamily->getSupportedAttrs() );

			foreach ( $attrs as $alias => $productAttrClassRef )
			{
				$productAttr = $this->ps->retrieveAttribute( $productAttrClassRef );
				$values      = array();
				foreach ( $productAttr->getValues() as $attrValue )
				{
					$values[] = ArrayUtil::toIndexableKey($attrValue->getValue());
				}
				$productAttrConditionable                = new ProductItemConditionableParam( "item.attributes.{$alias}", $alias, $productAttr->isDynamicValue(),$productAttr->isMultiValue(), $productAttr->getValueType(), $values );
				$this->map[ "item.attributes.{$alias}" ] = $productAttrConditionable;
			}

			parent::__construct( $this->map );

		}
	}
