<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Helper;

use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InkAttribute;

class CustomizationValueConverter
{
    public function setAttributesFromCustomizations(array $customizations, ProductItem &$productItem): ProductItem
    {
        $features          = $productItem->getAttribute(FeatureAttribute::ALIAS);
        if (!is_array($features))
        {
            $features = [];
        }

        if (in_array(1, $customizations))
        {
            $features[] = FeatureAttribute::VARIABLE_DATA;
        }
        if (in_array(2, $customizations))
        {
            $features[] = FeatureAttribute::HANGTAGGING;
        }
        if (in_array(12, $customizations))
        {
            $features[] = FeatureAttribute::MANUAL_BACKSCORE;
        }
        if (in_array(8, $customizations))
        {
            $productItem->setAttribute(InkAttribute::ALIAS, InkAttribute::PINK_INK);
        }
        if (in_array(9, $customizations))
        {
            $productItem->setAttribute(InkAttribute::ALIAS, InkAttribute::INVISIBLE_INK);
        }
        if (in_array(17, $customizations))
        {
            $features[] = FeatureAttribute::TRANSFER_TAPE;
        }
        if (in_array(15, $customizations))
        {
            $features[] = FeatureAttribute::PACK_SET_AMOUNT;
        }
        if (in_array(16, $customizations))
        {
            $features[] = FeatureAttribute::PERFORATION;
        }
        if (!empty($features))
        {
            $productItem->setAttribute(FeatureAttribute::ALIAS, $features);
        }

        return $productItem;
    }

    public function extractCustomizationsFromProductItem(ProductItem $productItem): array
    {
        $customizations = array();

        $features = $productItem->getAttribute(FeatureAttribute::ALIAS);
        if ($features && is_array($features))
        {
            if (in_array(FeatureAttribute::VARIABLE_DATA, $features))
            {
                $customizations[] = 1;
            }
            if (in_array(FeatureAttribute::HANGTAGGING, $features))
            {
                $customizations[] = 2;
            }
            if (in_array(FeatureAttribute::MANUAL_BACKSCORE, $features))
            {
                $customizations[] = 12;
            }
            if (in_array(FeatureAttribute::TRANSFER_TAPE, $features))
            {
                $customizations[] = 17;
            }
            if (in_array(FeatureAttribute::PERFORATION, $features))
            {
                $customizations[] = 16;
            }
            if (in_array(FeatureAttribute::PACK_SET_AMOUNT, $features))
            {
                $customizations[] = 15;
            }
        }

        $uvInk = $productItem->getAttribute(InkAttribute::ALIAS);
        if ($uvInk)
        {
            switch ($uvInk)
            {
                case InkAttribute::PINK_INK:

                    $customizations[] = 8;

                    break;
                case InkAttribute::INVISIBLE_INK:

                    $customizations[] = 9;

                    break;
            }
        }

        return $customizations;
    }
}
