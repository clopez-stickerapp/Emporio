<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Helper;

use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Product\Attribute\ChangedAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\FigureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\PriceMarginPercentageAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\ReorderAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\CutDirectionAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliveryAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetHeightAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetInsidePaddingAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetOutsidePaddingAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetWidthAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\EpoxyTemplateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ImageFiltersAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InnercutAsKisscutAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialColorAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\OutlineAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionInstructionAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\WhiteLayerAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollSizeTypeAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollSizeMMAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollTopEdgeMarginAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollItemMarginAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\EffectLayerFileAppIdAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\EffectLayerFileNameDataAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\ProductReferenceIDAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\TextAttribute;

class SheetMetaValueConverter
{
    public array $metaToAttributeDirectMapping = array(
        "PRODUCTION_LINE"                => ProductionLineAttribute::ALIAS,
        "SPECIAL_PRODUCTION"             => ProductionInstructionAttribute::ALIAS,
        "DELIVERY"                       => DeliveryAttribute::ALIAS,
        "DELIVERY_SHEET_WIDTH"           => DeliverySheetWidthAttribute::ALIAS,
        "DELIVERY_SHEET_HEIGHT"          => DeliverySheetHeightAttribute::ALIAS,
        "DELIVERY_SHEET_PADDING"         => DeliverySheetInsidePaddingAttribute::ALIAS,
        "DELIVERY_SHEET_OUTSIDE_PADDING" => DeliverySheetOutsidePaddingAttribute::ALIAS,
        "INNERCUT_AS_KISSCUT"            => InnercutAsKisscutAttribute::ALIAS,
        "WEB_DIRECTION"                  => CutDirectionAttribute::ALIAS,
        "WHITE_LAYER"                    => WhiteLayerAttribute::ALIAS,
        "LAST_OUTLINE"                   => OutlineAttribute::ALIAS,
        "EPOXY_TEMPLATE_ID"              => EpoxyTemplateAttribute::ALIAS,
        "PRICE_MARGIN_PERCENTAGE"        => PriceMarginPercentageAttribute::ALIAS,
        "REORDER"                        => ReorderAttribute::ALIAS,
        "IS_CHANGED"                     => ChangedAttribute::ALIAS,
        "FIGURE_ID"                      => FigureAttribute::ALIAS,
        "MATERIAL_COLOR"                 => MaterialColorAttribute::ALIAS,
        "DELIVERY_ROLL_SIZE_TYPE"        => DeliveryRollSizeTypeAttribute::ALIAS,
        "DELIVERY_ROLL_SIZE_MM"          => DeliveryRollSizeMMAttribute::ALIAS,
        "DELIVERY_ROLL_TOP_EDGE_MARGIN"  => DeliveryRollTopEdgeMarginAttribute::ALIAS,
        "DELIVERY_ROLL_ITEM_MARGIN"      => DeliveryRollItemMarginAttribute::ALIAS,
        "EFFECT_LAYER_UPLOAD_FILE_NAME"  => EffectLayerFileNameDataAttribute::ALIAS,
        "EFFECT_LAYER_UPLOAD_FILEAPP_ID" => EffectLayerFileAppIdAttribute::ALIAS,
        "MATERIAL_COLOR"                 => MaterialColorAttribute::ALIAS,
    );

    /* This array is only to be used when setting productattribute from sheet meta */
    public array $sheetMetaToProductAttributeMapping = [
        "TEXT"                           => TextAttribute::ALIAS,
        "REFERENCE_ID"                   => ProductReferenceIDAttribute::ALIAS
    ];

    public function setAttributesFromSheetMeta(array $sheetMeta, ProductItem &$item): void
    {
        $features          = $item->getAttribute(FeatureAttribute::ALIAS);
        if (!is_array($features))
        {
            $features = [];
        }

        $backPrintModified = array_key_exists("BACKPRINT_MODIFIED", $sheetMeta) && filter_var($sheetMeta['BACKPRINT_MODIFIED'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if ($backPrintModified)
        {
            $features[] = FeatureAttribute::BACKPAPER_PRINT;
        }

        $hasEffectlayer = array_key_exists("EFFECT_LAYER_UPLOAD_FILE_NAME", $sheetMeta) && !empty($sheetMeta["EFFECT_LAYER_UPLOAD_FILE_NAME"]);
        if ($hasEffectlayer)
        {
            $features[] = FeatureAttribute::EFFECT_LAYER;
        }

        foreach ($this->metaToAttributeDirectMapping as $metaKey => $productAttrName)
        {
            $metaValue = array_key_exists($metaKey, $sheetMeta) ? $sheetMeta[$metaKey] : NULL;
            if (array_key_exists($metaKey, $sheetMeta) && is_null($metaValue))
            {
                $item->removeAttribute($productAttrName);
            }
            else if (!is_null($metaValue))
            {
                $item->setAttribute($productAttrName, $metaValue);
            }
        }

        foreach ($this->sheetMetaToProductAttributeMapping as $metaKey => $productAttrName)
        {
            $metaValue = array_key_exists($metaKey, $sheetMeta) ? $sheetMeta[$metaKey] : NULL;
            if (array_key_exists($metaKey, $sheetMeta) && is_null($metaValue))
            {
                $item->removeAttribute($productAttrName);
            }
            else if (!is_null($metaValue))
            {
                $item->setAttribute($productAttrName, $metaValue);
            }
        }

        $imageFilters = array_key_exists('PITSTOP_JOBS', $sheetMeta) ? $sheetMeta['PITSTOP_JOBS'] : NULL;
        if ($imageFilters && is_string($imageFilters) && strlen($imageFilters))
        {
            $imageFilters = explode(",", $imageFilters);
            $item->setAttribute(ImageFiltersAttribute::ALIAS, $imageFilters);
        }

        if (!empty($features))
        {
            $item->setAttribute(FeatureAttribute::ALIAS, $features);
        }
    }

    public function extractSheetMetaFromProductItem(ProductItem $productItem): array
    {
        /*
		const META_KEY_EFFECT_LAYER_UPLOAD_FILE_URL = "EFFECT_LAYER_UPLOAD_FILE_URL";
		const META_KEY_EFFECT_LAYER_UPLOAD_FILE_ATTACHMENT_ID = "EFFECT_LAYER_UPLOAD_FILE_ATTACHMENT_ID";
        const META_KEY_EFFECT_LAYER_UPLOAD_FILE_NAME = 'EFFECT_LAYER_UPLOAD_FILE_NAME';
        const META_KEY_EFFECT_LAYER_UPLOAD_FILEAPP_ID = 'EFFECT_LAYER_UPLOAD_FILEAPP_ID';
        */

        //Add effectlayer here
        $sheetMeta = array(
            "PRODUCT_FAMILY_NAME" => $productItem->getProductFamilyName(),
            "PRODUCT_NAME"        => $productItem->getProductName()
        );
        $features  = $productItem->getAttribute(FeatureAttribute::ALIAS);
        if ($features && is_array($features))
        {
            $sheetMeta['BACKPRINT_MODIFIED'] = in_array(FeatureAttribute::BACKPAPER_PRINT, $features) ? 1 : 0;
        }

        foreach ($this->metaToAttributeDirectMapping as $metaKey => $productAttrName)
        {
            $sheetMeta[$metaKey] = $productItem->getAttribute($productAttrName);
        }

        $imageFilters = $productItem->getAttribute(ImageFiltersAttribute::ALIAS);
        if ($imageFilters && is_array($imageFilters))
        {
            $imageFilters                = implode(",", $imageFilters);
            $sheetMeta['PITSTOP_JOBS'] = $imageFilters;
        }

        return $sheetMeta;
    }
}
