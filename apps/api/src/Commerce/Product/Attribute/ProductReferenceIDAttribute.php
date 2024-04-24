<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

class ProductReferenceIDAttribute extends ProductAttr
{
    const ALIAS = "reference_id";
    public function __construct()
    {
        parent::__construct(ProductAttrValueTypes::STRING);
    }
}
