<?php

namespace StickerApp\Babylon\Commerce\Product\Price;

use StickerApp\Babylon\Commerce\Core\Price\ProductQuantityListCollection;
use StickerApp\Babylon\Commerce\Core\Price\QuantityList;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Helper\Condition\ConditionOperators;

class StickerQuantityListCollection extends ProductQuantityListCollection
{
    const NAME = "sticker_quantity_lists";

    public function __construct(ProductService $productService)
    {
        parent::__construct(self::NAME, $productService);

        $this->addQuantityList( QuantityList::create("smallQuantities", array(
            1, 3, 5, 7, 10, 12, 15, 17, 20, 22, 25
        ))->setMinQuantity(0));

        $this->addQuantityList( QuantityList::create("mediumQuantities", array(
            1, 5, 10, 15, 25, 35, 45, 50, 65, 75, 100
        ))->setMinQuantity(6));

        $this->addQuantityList( QuantityList::create("bigQuantities", array(
            25, 50, 100, 200, 300, 500, 600, 900, 1200, 1500, 2000, 5000, 10000, 20000, 30000, 40000, 60000, 100000, 200000
        ))->setMinQuantity(11));


        $this->addConditionedQuantityList( QuantityList::create("sheets", array(
            3, 5, 10, 20, 40, 50, 60, 70, 80, 90, 100, 400, 1000
        ))->addCondition("item.attributes.reseller", ConditionOperators::NOT_IN, array(ResellerAttribute::VALUE_STICKIT))
          ->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_SHEET_LEGACY));

        $this->addConditionedQuantityList( QuantityList::create("individual_stickers", array(
            1, 5, 10, 15, 25, 35, 45, 50, 65, 75, 100
        ))->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_LIBRARY_DESIGN));

        $this->addConditionedQuantityList( QuantityList::create("epoxy 25x25", array(
            80, 200, 300, 500, 1100, 2200, 3500, 4000, 5500
        ))->addCondition("item.attributes.laminate", "==", LaminateAttribute::EPOXY)
          ->addCondition("item.attributes.reseller", ConditionOperators::NOT_IN, array(ResellerAttribute::VALUE_STICKERSTHATSTICK, ResellerAttribute::VALUE_STICKIT))
          ->addCondition("item.attributes.width_mm", "==", 25)
          ->addCondition("item.attributes.height_mm", "==", 25));

        $this->addConditionedQuantityList( QuantityList::create("epoxy 38x38", array(
            40, 90, 140, 200, 500, 1000, 1500, 1700, 2400
        ))->addCondition("item.attributes.laminate", "==", LaminateAttribute::EPOXY)
          ->addCondition("item.attributes.reseller", ConditionOperators::NOT_IN, array(ResellerAttribute::VALUE_STICKERSTHATSTICK, ResellerAttribute::VALUE_STICKIT))
          ->addCondition("item.attributes.width_mm", "==", 38)
          ->addCondition("item.attributes.height_mm", "==", 38));

        $this->addConditionedQuantityList( QuantityList::create("epoxy 51x25", array(
            40, 100, 160, 240, 600, 1100, 1700, 2000, 2800
        ))->addCondition("item.attributes.laminate", "==", LaminateAttribute::EPOXY)
          ->addCondition("item.attributes.reseller", ConditionOperators::NOT_IN, array(ResellerAttribute::VALUE_STICKERSTHATSTICK, ResellerAttribute::VALUE_STICKIT))
          ->addCondition("item.attributes.width_mm", "==", 51)
          ->addCondition("item.attributes.height_mm", "==", 25));

        $this->addConditionedQuantityList( QuantityList::create("epoxy 77x38", array(
            20, 40, 70, 100, 250, 500, 750, 900, 1200
        ))->addCondition("item.attributes.laminate", "==", LaminateAttribute::EPOXY)
          ->addCondition("item.attributes.reseller", ConditionOperators::NOT_IN, array(ResellerAttribute::VALUE_STICKERSTHATSTICK, ResellerAttribute::VALUE_STICKIT))
          ->addCondition("item.attributes.width_mm", ">=", 76)
          ->addCondition("item.attributes.height_mm", "==", 38));
    }
}