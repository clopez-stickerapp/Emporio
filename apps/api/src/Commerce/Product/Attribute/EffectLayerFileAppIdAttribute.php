<?php
namespace StickerApp\Babylon\Commerce\Product\Attribute;
use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

class EffectLayerFileAppIdAttribute Extends ProductAttr
{
    const ALIAS = "effect_layer_upload_fileapp_id";

    public function __construct()
    {
        parent::__construct( ProductAttrValueTypes::STRING, TRUE, TRUE );
    }
}
