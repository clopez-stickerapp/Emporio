<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliveryAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;

class DeliveryFilter extends ProductAttrFilter
{
    function __construct()
    {
        parent::__construct("delivery");

        // $this->createFilter(array(DeliveryAttribute::DELIVERY_SINGLE, DeliveryAttribute::DELIVERY_SHEET, DeliveryAttribute::DELIVERY_ROLL));

        $this->createFilter(array(DeliveryAttribute::DELIVERY_SHEET))
            ->conditionBuilder
            ->addCondition("item.productName", "IN", array(
                CustomStickerFamily::PRODUCT_TRANSFER_DECAL,
                CustomStickerFamily::PRODUCT_3D_DOME
            ));

            $this->createFilter(array(DeliveryAttribute::DELIVERY_SINGLE))
            ->conditionBuilder
            ->addCondition("item.productName", "IN", array(
                CustomStickerFamily::PRODUCT_SHEET,
                CustomStickerFamily::PRODUCT_SHEET_KISS_CUT,
            ));
    }
}
