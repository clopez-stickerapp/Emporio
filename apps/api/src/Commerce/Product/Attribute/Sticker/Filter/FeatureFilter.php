<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Helper\Condition\ConditionRelations;

class FeatureFilter extends ProductAttrFilter
{
    function __construct()
    {
        parent::__construct("feature");

        // Merge all matches
        $this->mode = ProductAttrFilter::MODE_MERGE_ALL_WINNERS;

        // Default filter contains all features that doesn't have any conditions binding, or else they wont show up.
        $this->createFilter(array(
            FeatureAttribute::EFFECT_LAYER,
            FeatureAttribute::HANGTAGGING,
            FeatureAttribute::MANUAL_BACKSCORE,
            FeatureAttribute::PACK_SET_AMOUNT,
            FeatureAttribute::PERFORATION,
            FeatureAttribute::VARIABLE_DATA,
        ));

        $backpaperPrinting = $this->createFilter(array(FeatureAttribute::BACKPAPER_PRINT), ConditionRelations::AND);
        $backpaperPrinting->conditionBuilder->addSubGroup()
            ->addCondition("item.attributes.material", "IN", array(
                MaterialAttribute::WHITE,
                MaterialAttribute::HOLOGRAPHIC,
                MaterialAttribute::MIRROR,
                MaterialAttribute::CLEAR,
				MaterialAttribute::PIXIE_DUST,
            ))
            ->addCondition("item.attributes.laminate", "IN", array(
                LaminateAttribute::GLOSSY_UV,
                LaminateAttribute::SOFT_TOUCH,
                LaminateAttribute::SATIN_MATTE,
                //				                         LaminateAttribute::SATIN_MATTE
            ))
            ->addCondition("item.productName", "NOT IN", array(
              CustomStickerFamily::PRODUCT_LIBRARY_DESIGN)
            );

        $backpaperPrinting->conditionBuilder->addSubGroup()
            ->addCondition("item.attributes.width_mm", "<=", 270)
            ->addCondition("item.attributes.height_mm", "<=", 270);

        // This is a fix for ProductAttrMap to include the option in the "valuesAndConstraints" array.
        $backpaperPrinting = $this->createFilter(array(FeatureAttribute::BACKPAPER_PRINT), ConditionRelations::AND);
        $backpaperPrinting->conditionBuilder->addSubGroup()
            ->addCondition("item.attributes.material", "IS EMPTY")
            ->addCondition("item.attributes.laminate", "IS EMPTY");

        $this->createFilter( array( FeatureAttribute::TRANSFER_TAPE ) )->conditionBuilder
			->addCondition("item.attributes.delivery_sheet_width", "<=", MaxSizeAttribute::MAX_SIZE_TRANSFER_TAPE )
			->addCondition("item.attributes.delivery_sheet_height", "<=", MaxSizeAttribute::MAX_SIZE_TRANSFER_TAPE );
    }
}
