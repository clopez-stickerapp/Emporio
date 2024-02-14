<?php

namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Stock;

/**
 * This should show which of the chosen attribute's values is "in stock",
 * if it is orderable because we have it in the warehouse, 
 * if the related machine works etc.
 */
class ProductAttrStock
{
	public string $attributeName;
	public array $out_of_stock = array();

	public function __construct( string $attrAlias, array $stock = array() )
	{
		$this->attributeName = $attrAlias;
		$this->out_of_stock = $stock;
	}

	public function isOutOfStock( string $attrValue ): bool
	{ 
		return in_array( $attrValue, $this->out_of_stock );
	}

	public function getOutOfStock(): array
	{
		return $this->out_of_stock;
	}
}
