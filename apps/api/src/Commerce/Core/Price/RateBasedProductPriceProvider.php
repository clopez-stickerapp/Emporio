<?php

namespace StickerApp\Babylon\Commerce\Core\Price;

use StickerApp\Babylon\Commerce\Core\Currency\Currency;
use StickerApp\Babylon\Commerce\Core\Exception\ProductServiceException;
use StickerApp\Babylon\Commerce\Core\Localization\Locale;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;

class RateBasedProductPriceProvider extends ProductPriceProvider
{
    /**
     * @var RateProvider[]
     */
    protected array $rateProviders = array();

    protected function getUnitPrice( ProductItem $productItem, string $lang ) : array
    {
        $rate = $this->getUnitRateFor($productItem);

        $currency = Locale::getCurrency($lang);

        foreach ($rate as &$value)
        {
            $value = Currency::rateToCurrency($value , $currency);
        }

        // Convert to major units
        foreach ($rate as &$value) {
            $value = Currency::toMajorUnits($value, Locale::getCurrency($lang));
        }

        return $rate;
    }

    /**
     * @param RateProvider $rateProvider
     *
     * @return void
     * @throws ProductServiceException
     */
    public function addRateProvider(RateProvider $rateProvider): void
    {
        if (array_key_exists($rateProvider->getName(), $this->rateProviders))
        {
            throw new ProductServiceException("Cannot add rate provider. Rate provider '" . $rateProvider->getName() . "' already exists.");
        }

        $this->rateProviders[$rateProvider->getName()] = $rateProvider;
    }

    /**
     * Returns an array of all applicable
     * RateProviders that apply to a ProductItem.
     * 
     * @param ProductItem $productItem
     * @return RateProvider[]
     */
    public function getRateProvidersFor(ProductItem $productItem)
    {
        $rateProviders = array();

        foreach ($this->rateProviders as $rateProvider)
        {
            if ($rateProvider->test($productItem))
            {
                $rateProviders[] = $rateProvider;
            }
        }

        if (count($rateProviders) == 0) 
        {
            throw new ProductServiceException("No applicable rate providers found for: " . json_encode($productItem) . ".");
        } 
        else 
        {
            return $rateProviders;
        }
    }

    public function getUnitRateFor(ProductItem $productItem )
    {
        $units = $productItem->getUnits();

        /** @var Rate[] */
        $rates = array();

        foreach ($this->getRateProvidersFor($productItem) as $rateProvider) 
        {
            if( $rate = $rateProvider->getRate( $productItem ))
            {
                $rates[$rateProvider->getName()] = $rate;
            }
        }

        /** The rates are sorted so the flat amounts are listed first. The order of the 
          * rates is crucial - it is the order in which they need to be calculated -
          * since the percentage amounts are based off of the total flat amount.
          */ 
        RateProvider::sortByType( $rates );

        $flatTotal = 0;
        $compound = array();

        foreach ($rates as $key => $rate)
        {
            if( $rate->isPercentage() )
            {
                if( $rate->getType() == Rate::TYPE_ADDITIVE )
                {
                    $resultRate = $rate->getValue() * $flatTotal;
                }
                elseif( $rate->getType() == Rate::TYPE_MULTIPLICATIVE )
                {
                    $resultRate = $rate->getValue() * array_sum($compound);
                }
                else
                {
                    throw new ProductServiceException("Rate type " . $rate->getType() . " not supported.");
                }

                // The minimum value is based on the total amount, the unit rate * amount of units,
                // so that's the value we have to compare to the minimum rate to decide if it's over
                // the threshold.
                $resultTotalRate = $resultRate * $units;

                if( $resultTotalRate > 0 && $resultTotalRate < $rate->getMinValue())
                {
                    // Since this function calculates the rate per unit, we can't simply add the total
                    // specified in the rate. We have to divide it by the total amount of units.
                    $compound[$key] = $rate->getMinValue() / ( $units );
                }
                else
                {
                    $compound[$key] = $resultRate;
                }
            }
            else
            {
                $flatTotal += $rate->getValue();
                $compound[$key] = $rate->getValue();
            }
        }

        return $compound;
    }

    public function getRateProviders(): array
    {
        return $this->rateProviders;
    }
}