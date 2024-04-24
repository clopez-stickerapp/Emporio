<?php

namespace StickerApp\Babylon\Commerce\Core\Price;

use StickerApp\Babylon\Commerce\Core\Product\Condition\ProductConditionBuilder;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;

abstract class RateProvider
{
    const TYPE_BASE = "base";
    const TYPE_ADDON = "addon";

    abstract public function getRate( ?ProductItem $productItem ) : Rate;

    protected string $name;
    protected string $type = self::TYPE_BASE;
    public ProductConditionBuilder $conditions;

    public function __construct(string $name)
    {
        $this->name = $name;
        $this->conditions = new ProductConditionBuilder();
    }

    public function getName() : string
    {
        return $this->name;
    }

    public function getType() : string
    {
        return $this->type;
    }

    public function setType( string $rateProviderType ) : RateProvider
    {
        $this->type = $rateProviderType;
        return $this;
    }

    public function test( ProductItem $productItem ) : bool
    {
        $applicable = false;
        try {
            $applicable = $this->conditions->testOnItem( $productItem );
        } catch (ConditionTestDataKeyNotFoundException $error) {
            $applicable = false;
        }
        return $applicable;
    }

    /**
     * Sorts the rate array by type of rate. Flat rates first, 
     * then all the percentage rates. For percentage rates the
     * additives first, then the multiplicative ones.
     *
     * @param Rate[] &$rates This is a reference to an array containing rates.
     * @return void
     */
    public static function sortByType(array &$rates)
    {
        uasort($rates, function ($a, $b) {
            /** @var Rate $a
             *  @var Rate $b */

            // Sort non-percentage rates before additive rates
            if (!$a->isPercentage() && $b->isPercentage()) {
                return -1;
            } elseif ($a->isPercentage() && !$b->isPercentage()) {
                return 1;
            }

            // Sort additive rates before multiplicative rates
            if ($a->isPercentage() && $b->isPercentage()) {
                if ($a->getType() == Rate::TYPE_ADDITIVE && $b->getType() == Rate::TYPE_MULTIPLICATIVE) {
                    return -1;
                } elseif ($a->getType() == Rate::TYPE_MULTIPLICATIVE && $b->getType() == Rate::TYPE_ADDITIVE) {
                    return 1;
                }
            }

            return 0; // Elements are equal
        });
    }
}
