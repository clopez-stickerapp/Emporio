<?php

namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Icon;

use ErrorException;
use function array_key_exists;

class ProductAttrIconCollection
{
    protected string $collectionName;
    const NAME = "icons";
    /**
     * @var array<string, array<string, ProductAttrIcon>>
     */
    protected array $icons = array();

    public function __construct()
    {
        $this->collectionName = self::NAME;
    }

    /**
     * @param string $attributeName
     * @param string $attributeValue
     *
     * @return string
     */
    public function findIconFor(string $attributeName, string $attributeValue): ?string
    {
        if (array_key_exists($attributeName, $this->icons) && array_key_exists($attributeValue, $this->icons[$attributeName])) {
            $icon = $this->icons[$attributeName][$attributeValue]->iconLink;

            if ($icon) {
                return $icon;
            }
        }

        if(array_key_exists($attributeName, $this->icons)) {
            return static_url() . "images/web/wizard/ic_wiz-placeholder.png";
        }

        return null;
    }

    public function addIcon(ProductAttrIcon $icon): ProductAttrIcon
    {
        if (isset($this->icons[$icon->attributeName]) && array_key_exists($icon->attributeValue, $this->icons[$icon->attributeName])) {
            throw new ErrorException("Icon for $icon->attributeName already exists.");
        }

        return $this->icons[$icon->attributeName][$icon->attributeValue] = $icon;
    }

    public function getIcons(): array
    {
        return $this->icons;
    }

    public function getCollectionName(): string
    {
        return $this->collectionName;
    }
}
