<?php

namespace StickerApp\Babylon\Commerce\Core\Price;

abstract class ProductPriceProcessor
{
    /**
     * @param float[] $price
     * @return void
     */
    abstract public function process( array &$prices );
}
