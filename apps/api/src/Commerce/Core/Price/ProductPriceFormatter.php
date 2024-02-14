<?php

namespace StickerApp\Babylon\Commerce\Core\Price;

use StickerApp\Babylon\Commerce\Core\Currency\Currency;
use StickerApp\Babylon\Commerce\Core\Localization\Locale;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;

class ProductPriceFormatter
{
    protected ProductService $service;

    protected static array $showDecimalsUnderMinimum = array(
        "us" => true,
        "se" => false,
        "dk" => false,
        "uk" => true,
        "de" => true,
        "no" => false,
        "nl" => true,
        "fi" => true,
        "it" => true,
        "fr" => true,
        "jp" => false,
        "es" => true,
        "pt" => true,
        "pl" => true
    );

    public function __construct(ProductService $service)
    {
        $this->service = $service;
    }

    public function format( ProductItem $productItem, array $compoundPrice, string $lang ) : PriceDTO
    {
        $currency = Locale::getCurrency($lang);
        $locale = Locale::getLocale($lang);

        $units = $productItem->getUnits();
        $minUnits = $this->service->retrieveProductFamily($productItem->getProductFamilyName())->getMinimumUnits($productItem);

        $decimals = 0;

        // If units is lower than the minimum, show decimals
        if( $units < $minUnits && self::showDecimalsUnderMinimum($lang))
        {
            $decimals = Currency::getDecimals($currency);
        }

        foreach ($compoundPrice as &$value) {
            $value = round($value, $decimals);
        }

        $priceDTO = new PriceDTO();
        $priceDTO->total = array_sum($compoundPrice);

        if( $productItem->getAttribute(QuantityAttribute::ALIAS) && $priceDTO->total )
        {
            $priceDTO->unitPrice      = round($priceDTO->total / $productItem->getAttribute(QuantityAttribute::ALIAS), 6);
        }
        $priceDTO->compoundValues = $compoundPrice;

        $priceDTO->totalFormatted           = Currency::format( $priceDTO->total, $currency, $locale);
        $priceDTO->unitPriceFormatted       = Currency::format( $priceDTO->unitPrice, $currency, $locale );
        $priceDTO->compoundValuesFormatted  = Currency::format_array( $compoundPrice, $currency, $locale );

        return $priceDTO;
    }

    public static function showDecimalsUnderMinimum(string $lang)
    {
        return isset(self::$showDecimalsUnderMinimum[$lang]) && self::$showDecimalsUnderMinimum[$lang];
    }
}
