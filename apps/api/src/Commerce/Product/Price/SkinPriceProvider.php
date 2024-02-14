<?php

namespace StickerApp\Babylon\Commerce\Product\Price;

use StickerApp\Babylon\Commerce\Core\Price\Rate;
use StickerApp\Babylon\Commerce\Core\Price\RateBasedProductPriceProvider;
use StickerApp\Babylon\Commerce\Core\Price\RateList;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Helper\Condition\ConditionRelations;
use VAT_Model;

class SkinPriceProvider extends RateBasedProductPriceProvider
{
    const NAME = "skin_rates";
    const RATELIST_LAPTOPS = "laptops";
    const RATELIST_PHONES = "phones";
    const RATELIST_PADS = "pads";

    public function __construct(ProductService $service, VAT_Model $vatModel)
    {
        parent::__construct(self::NAME, $service, $vatModel);

        $phones = new RateList(self::RATELIST_LAPTOPS, new Rate(2900));
        $phones->conditions->addSubGroup(ConditionRelations::OR)
            ->addCondition("item.attributes.sheet_name", "IN", "laptop")
            ->addCondition("item.attributes.sheet_name", "IN", "macbook");
        $this->addRateProvider($phones);

        $phones = new RateList(self::RATELIST_PHONES, new Rate(1500));
        $phones->conditions->addSubGroup(ConditionRelations::OR)
            ->addCondition("item.attributes.sheet_name", "IN", "iphone")
            ->addCondition("item.attributes.sheet_name", "IN", "samsung")
            ->addCondition("item.attributes.sheet_name", "IN", "galaxy")
            ->addCondition("item.attributes.sheet_name", "IN", "nexus")
            ->addCondition("item.attributes.sheet_name", "IN", "oneplus")
            ->addCondition("item.attributes.sheet_name", "IN", "pixel")
            ->addCondition("item.attributes.sheet_name", "IN", "ipod")
            ->addCondition("item.attributes.sheet_name", "IN", "one-x")
            ->addCondition("item.attributes.sheet_name", "IN", "desire")
            ->addCondition("item.attributes.sheet_name", "IN", "sensation")
            ->addCondition("item.attributes.sheet_name", "IN", "nokia")
            ->addCondition("item.attributes.sheet_name", "IN", "phoneholder");
        $this->addRateProvider($phones);

        $pads = new RateList(self::RATELIST_PADS, new Rate(1900));
        $pads->conditions->addSubGroup(ConditionRelations::OR)
            ->addCondition("item.attributes.sheet_name", "IN", "ipad");
        $this->addRateProvider($pads);
    }

    protected function getUnitPrice( ProductItem $productItem, string $lang ) : array
    {
        $priceArray = parent::getUnitPrice($productItem, $lang);

        foreach ($priceArray as &$price) {
            $price = round($price, 0);
        }

        return $priceArray;
    }
}
