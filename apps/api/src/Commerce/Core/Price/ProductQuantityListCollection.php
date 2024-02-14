<?php

namespace StickerApp\Babylon\Commerce\Core\Price;

use StickerApp\Babylon\Commerce\Core\Exception\ProductServiceException;
use StickerApp\Babylon\Commerce\Core\Price\QuantityList;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\ProductService;

class ProductQuantityListCollection
{
    protected string $collectionName;
    protected ProductService $productService;

    /**
     * @var QuantityList[]
     */
    protected array $quantityLists = array();

    /**
     * OBS!! These lists are iterated over, and it returns the
     * first list that tests positive. So add them in order of
     * importance: most important first.
     * @var QuantityList[]
     */
    protected array $conditionedQuantityLists = array();

    public function __construct(string $name, ProductService $productService)
    {
        $this->collectionName = $name;
        $this->productService = $productService;
    }

    public function addQuantityList(QuantityList $quantityList): void
    {
        if (array_key_exists($quantityList->getName(), $this->quantityLists)) {
            throw new ProductServiceException("Cannot add quantity list. Quantity list '" . $quantityList->getName() . "' already exists.");
        }

        $this->quantityLists[$quantityList->getName()] = $quantityList;
        QuantityList::sortByMinQuantity($this->quantityLists);
    }

    public function addConditionedQuantityList(QuantityList $quantityList): void
    {
        if (array_key_exists($quantityList->getName(), $this->conditionedQuantityLists)) {
            throw new ProductServiceException("Cannot add conditioned quantity list. Quantity list '" . $quantityList->getName() . "' already exists.");
        }

        $this->conditionedQuantityLists[$quantityList->getName()] = $quantityList;
    }

    /**
     * @param ProductItem $productItem
     * @param int $minQuantity
     * @return array
     */
    public function getQuantityStepsFor(ProductItem $productItem): array
    {
        $steps = null;
        // Check if a conditioned list matches
        foreach ($this->conditionedQuantityLists as $list) {
            if ($list->testOnItem($productItem)) {
                $steps = $list->getQuantities();
                return array_slice($steps, 0, 9);
            }
        }

        $minQuantity = $this->productService->retrieveProductFamily($productItem->getProductFamilyName())->getMinimumQuantity($productItem);

        // If no conditioned list matched, use default ones
        foreach ($this->quantityLists as $list) {
            if ($list->test($minQuantity)) {
                $steps = $list->getQuantities();

                // Add the minimum quantity as step if it's not present
                if (!in_array($minQuantity, $steps)) 
                {
                    $steps[] = $minQuantity;
                }
                break;
            }
        }

        // If no default one matched, set to last list
        if (is_null($steps)) {
            $steps = end($this->quantityLists)->getQuantities();
        }

        sort($steps);

        $i = 0;
        foreach ($steps as $step) {
            if ($step >= $minQuantity) {
                return array_slice($steps, $i, 9);
            }
            $i++;
        }

        return array($minQuantity);
    }

    /**
     * @return QuantityList[]
     */
    public function getQuantityLists(): array
    {
        return $this->quantityLists;
    }

    public function getCollectionName(): string
    {
        return $this->collectionName;
    }
}
