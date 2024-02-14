<?php

namespace StickerApp\Babylon\Commerce\Core\Price;

use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;
use VAT_Model;

abstract class ProductPriceProvider
{
    protected string $name;
    /** @var ProductPriceProcessor[] */
    protected array $processors = array();
    protected ProductPriceFormatter $formatter;
    protected ProductService $service;
    protected VAT_Model $vatModel;

    public function __construct( string $name, ProductService $service, VAT_Model $vatModel )
    {
        $this->name = $name;
        $this->service = $service;
        $this->vatModel = $vatModel;
        $this->formatter = new ProductPriceFormatter($service);
    }

    abstract protected function getUnitPrice( ProductItem $productItem, string $lang ) : array;

    public function getPriceFor( ProductItem $productItem, string $lang, ?float $quantityOverride = null, bool $inclTax = true ) : PriceDTO
    {
        $family = $this->service->retrieveProductFamily($productItem->getProductFamilyName());

        if(!is_null($quantityOverride))
        {
            $productItem = clone $productItem;
            $productItem->setAttribute(QuantityAttribute::ALIAS, $quantityOverride);
            $family->validateUnits($productItem);
        }

        $priceArray = $this->getUnitPrice($productItem, $lang);

        foreach ($priceArray as &$price)
        {
            $price = $price * $productItem->getUnits();
        }

        if(!$inclTax)
        {
            $vatPercentage = $this->vatModel->getVatPercentage($lang);

            foreach ($priceArray as &$price)
            {
                $price = $this->vatModel->excludeVAT($price, $vatPercentage);
            }
        }

        // Run any added processors on the price
        $this->process($priceArray);

        // Here we would convert to major units, if all prices are set in minor units.
        // Currently this is only the new sticker prices, so you can find the conversion
        // Code in RateBasedProductPriceProvider.php

        return $this->formatter->format( $productItem, $priceArray, $lang );
    }

    public function getPriceListFor( ProductItem $productItem, array $quantities, string $lang, bool $inclTax = true ) : array
    {
        $resultArray = array();

        $originalUnitRate = 0;

        foreach ($quantities as $quantity) {
            $priceDTO = $this->getPriceFor($productItem, $lang, $quantity, $inclTax);

            $step = array();
            $step[ "quantity" ] = $quantity;
                $step[ "quantityFormatted" ] = $quantity . " " . lang("pcs");
            $step[ "price" ] = $priceDTO->totalFormatted;

            if( count($resultArray) == 0 )
            {
                $originalUnitRate = $priceDTO->unitPrice;
            }
            else if( $originalUnitRate !== 0 )
            {
                $step[ "save" ] = round( 100 * (1 - ($priceDTO->unitPrice / $originalUnitRate)));
            }

            if( !isset($step[ "save" ]) || $step[ "save" ] < 5 || is_nan($step[ "save" ]) )
            {
                $step[ "save" ] = 0;
            }

            $resultArray[] = $step;
        }

        return $resultArray;
    }

    public function addProcessor( ProductPriceProcessor $processor )
    {
        $this->processors[] = $processor;
    }

    protected function process( array &$prices )
    {
        foreach ($this->processors as $processor)
        {
            $processor->process( $prices );
        }
    }

    public function getName(): string
    {
        return $this->name;
    }
}