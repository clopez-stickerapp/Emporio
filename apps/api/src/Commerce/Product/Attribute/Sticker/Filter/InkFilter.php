<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InkAttribute;

class InkFilter extends ProductAttrFilter
{
    function __construct()
    {
        parent::__construct("ink");

        $this->createFilter(array());

        $this->createFilter(array(
            InkAttribute::INVISIBLE_INK,
            InkAttribute::PINK_INK
        ))->conditionBuilder->addCondition("item.attributes.laminate", "IN", array(
            LaminateAttribute::GLOSSY_NO_UV,
            LaminateAttribute::UNCOATED
        ));
    }
}
