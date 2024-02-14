<?php

namespace StickerApp\Babylon\Commerce\Product\Price;

use StickerApp\Babylon\Commerce\Core\Price\ProductPriceProcessor;

class StickerPriceBundler extends ProductPriceProcessor
{
    const PRICE_BASE = "price_base";
    const PRICE_BACKPRINT = "price_backprint";

    /**
     * @param float[] $prices
     * @return void
     */
    public function process( array &$prices )
    {
        $basePrice = 0;
        $backprintPrice = 0;
        foreach ($prices as $name => $price) {
            switch($name)
            {
                case StickerPriceProvider::RATELIST_BACKPRINT:
                    $backprintPrice += $price;
                    break;

                default:
                    $basePrice += $price;
                    break;
            }
        }

        $prices = array(
            self::PRICE_BASE => $basePrice,
        );

        if($backprintPrice != 0)
        {
            $prices[self::PRICE_BACKPRINT] = $backprintPrice;
        }
    }
}
