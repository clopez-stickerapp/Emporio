<?php

namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Icon;

class ProductAttrIcon
{
    public string $attributeName;
    public string $attributeValue;
    public string $iconLink;

    public function __construct(string $attributeName, string $attributeValue, string $link)
    {
        $this->attributeName = $attributeName;
        $this->attributeValue = $attributeValue;
        $this->iconLink = $link;
    }
}
