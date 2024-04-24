<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Helper;

use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Commerce\Product\Family\FeeFamily;
use StickerApp\Babylon\Commerce\Product\Family\PhoneCaseProductFamily;
use StickerApp\Babylon\Commerce\Product\Family\PromoProductFamily;
use StickerApp\Babylon\Commerce\Product\Family\SkinProductFamily;

class LegacyProductNameConverter
{
    const CUSTOMIZATION_HANGTAG = 2; // from Customization_sql_table

    /**
     * Will identify product based on legacy data, and create an empty ProductItem with the correct productFamilyName and productName.
     * 
     * THIS FUNCTION WILL NOT SET ANY DEFAULT ATTRIBUTES.
     */
    public function identifyProduct(string $sheetType, ?string $sheetName, ?string $legacyMaterialName, ?string $legacyLaminateName, ?array $meta, ?array $customizations): ProductItem
    {
        $item = new ProductItem("", "");
        $productFamilyName = "";
        $productName = "";

        switch ($sheetType)
        {
            case "sheet":

                $productFamilyName = CustomStickerFamily::NAME;

                if (in_array($sheetName, [
                    "sheet",
                    "template",
                    "sticker",
                ]))
                {
                    $productName = CustomStickerFamily::PRODUCT_SHEET_LEGACY;
                }
                else
                {
                    $productName = strpos($sheetName, "kiss_cut") !== FALSE ? CustomStickerFamily::PRODUCT_SHEET_KISS_CUT : CustomStickerFamily::PRODUCT_SHEET;
                }

                break;
            case "single":

                $productFamilyName = CustomStickerFamily::NAME;

                if($meta && array_key_exists("DELIVERY", $meta) && $meta['DELIVERY'] == "sheet")
                {
                    $productName = CustomStickerFamily::SINGLE_ON_SHEET;
                }
                elseif($customizations && in_array(self::CUSTOMIZATION_HANGTAG, $customizations))
                {
                    $productName = CustomStickerFamily::PRODUCT_HANG_TAG;
                }
                else
                {
                    $productName = CustomStickerFamily::PRODUCT_DIE_CUT;
                }

                break;
            case "individual":

                $productFamilyName = CustomStickerFamily::NAME;
                $productName       = CustomStickerFamily::PRODUCT_LIBRARY_DESIGN;

                break;
            case "skin":

                $productFamilyName = SkinProductFamily::NAME;
                $productName       = SkinProductFamily::PRODUCT_CUSTOM_SKIN;

                break;
            case "case":
                $productFamilyName = PhoneCaseProductFamily::NAME;
                $productName       = PhoneCaseProductFamily::PRODUCT_CUSTOM_CASE;
                break;
            case "giftcard":

                $productFamilyName = PromoProductFamily::NAME;
                $productName       = PromoProductFamily::PRODUCT_GIFTCARD;

                break;
            case "sticker_sample":

                $productFamilyName = PromoProductFamily::NAME;
                $productName       = PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK;

                break;
            case "sticker_pack":

                $productFamilyName = PromoProductFamily::NAME;
                $productName       = $sheetName;

                break;
            case "text":

                $productFamilyName = FeeFamily::NAME;
                $productName       = FeeFamily::PRODUCT_CUSTOM_FEE;

                break;
            
            case "sticker_freebie":
                $productFamilyName = PromoProductFamily::NAME;
                $productName       = PromoProductFamily::PRODUCT_STICKER_FREEBIE;
                
                break;
        }
        switch ($sheetName)
        {
            case "uv_lamp":
                $productFamilyName = PromoProductFamily::NAME;
                $productName       = PromoProductFamily::PRODUCT_UV_LAMP;

                break;
            case "sticker_individual":

                $productFamilyName = CustomStickerFamily::NAME;
                $productName       = CustomStickerFamily::PRODUCT_LIBRARY_DESIGN;

                break;
        }
        switch ($legacyMaterialName)
        {
            case "epoxy":

                $productName = CustomStickerFamily::PRODUCT_3D_DOME;

                break;
            case "wall_sticker_geckotex":

                $productName = CustomStickerFamily::PRODUCT_WALL;

                break;
            case "floor_sticker":

                $productName = CustomStickerFamily::PRODUCT_FLOOR;

                break;
            case "white_label":
            case "clear_label":

                $productName = CustomStickerFamily::PRODUCT_LABELS_ON_SHEET;

                break;
            case "white_pp_thin_liner":

                $productName = CustomStickerFamily::PRODUCT_LABELS_ON_ROLL;

                break;
            case "double_sided":
            case "double_sided_coverall":
            case "double_sided_transparent":

                $productFamilyName = CustomStickerFamily::NAME;
                $productName = CustomStickerFamily::PRODUCT_DOUBLE_SIDED;

                break;
            case "window":

                $productFamilyName = CustomStickerFamily::NAME;
                $productName = CustomStickerFamily::PRODUCT_WINDOW;

                break;
        }
        switch ($legacyLaminateName)
        {
            case "12_mil_heavy_duty":

                $productFamilyName = CustomStickerFamily::NAME;
                $productName = CustomStickerFamily::PRODUCT_HEAVY_DUTY;

                break;
            case "appliceringsfilm":

                $productFamilyName = CustomStickerFamily::NAME;
                $productName = CustomStickerFamily::PRODUCT_TRANSFER_DECAL;

                break;
        }

        switch ($productName)
        {
            case CustomStickerFamily::PRODUCT_LABELS_ON_ROLL:
            case CustomStickerFamily::PRODUCT_LABELS_ON_SHEET:
            case CustomStickerFamily::PRODUCT_DIE_CUT:

                if ($meta && array_key_exists("DELIVERY", $meta))
                {
                    $delivery = $meta['DELIVERY'];
                    if($delivery == "roll")
                    {
                        $productName = CustomStickerFamily::PRODUCT_LABELS_ON_ROLL;
                    }
                    else if($delivery == "sheet")
                    {
                        $productName = CustomStickerFamily::PRODUCT_LABELS_ON_SHEET;
                    }
                    else if($delivery == "single")
                    {
                        $productName = CustomStickerFamily::PRODUCT_DIE_CUT;
                    }
                }

                break;
        }


        $item->productFamilyName = $productFamilyName;
        $item->productName = $productName;

        return $item;
    }
}
