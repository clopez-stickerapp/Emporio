<?php
namespace StickerApp\Babylon\Commerce\Product\Attribute;
use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

class EffectLayerFileNameDataAttribute Extends ProductAttr
{
    const ALIAS = "effect_layer_file_name";

    public function __construct()
    {
        parent::__construct( ProductAttrValueTypes::STRING, TRUE, TRUE );
    }
}
