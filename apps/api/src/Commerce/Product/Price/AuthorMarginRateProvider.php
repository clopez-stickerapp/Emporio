<?php

namespace StickerApp\Babylon\Commerce\Product\Price;

use Figure_Model;
use StickerApp\Babylon\Commerce\Core\Price\Rate;
use StickerApp\Babylon\Commerce\Core\Price\RateProvider;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Product\Attribute\FigureAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;

class AuthorMarginRateProvider extends RateProvider
{
    const NAME = "rate_author_margin";
    CONST PRICE_MARGIN_LIMIT = 100.0; // Percent

    private Figure_Model $figureModel;

    public function __construct( Figure_Model $figureModel )
    {
        parent::__construct(self::NAME);
        $this->figureModel = $figureModel;
        $this->setType(RateProvider::TYPE_ADDON);
        $this->conditions->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_LIBRARY_DESIGN);
    }

    public function getRate( ?ProductItem $productItem ) : Rate
    {
        $priceMarginPercentage = floatval($this->figureModel->getStickerProfile()->getPriceMarginPercentage( $productItem->getAttribute(FigureAttribute::ALIAS)));
        
        if($priceMarginPercentage > self::PRICE_MARGIN_LIMIT)
        {
            $priceMarginPercentage = self::PRICE_MARGIN_LIMIT;
        }

        $rate = new Rate($priceMarginPercentage ?? 0, true);
        $rate->setType(Rate::TYPE_MULTIPLICATIVE);
        return $rate;
    }
}