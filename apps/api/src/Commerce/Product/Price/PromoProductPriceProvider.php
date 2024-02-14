<?php

namespace StickerApp\Babylon\Commerce\Product\Price;

use Figure_Model;
use StickerApp\Babylon\Commerce\Core\Exception\ProductServiceException;
use StickerApp\Babylon\Commerce\Core\Price\ProductPriceProvider;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Commerce\Product\Attribute\FigureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SheetTypeAttribute;
use StickerApp\Babylon\Commerce\Product\Family\PromoProductFamily;
use VAT_Model;

class PromoProductPriceProvider extends ProductPriceProvider
{
    const NAME = "promo_price_provider";

    private Figure_Model $figureModel;

    private array $stickerPackPrices = array(
        'se' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 139,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 210,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 210,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 210,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 19,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 210,
            PromoProductFamily::PRODUCT_SLAP_PACK => 150
        ],
        'uk' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 13,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 17,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 17,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 17,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 17,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'fi' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 13,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 21,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 21,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 21,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 21,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'no' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 139,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 210,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 210,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 210,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 19,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 210,
            PromoProductFamily::PRODUCT_SLAP_PACK => 150
        ],
        'dk' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 99,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 150,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 150,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 150,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 19,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 150,
            PromoProductFamily::PRODUCT_SLAP_PACK => 150
        ],
        'nl' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 13,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 21,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 21,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 21,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 21,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'de' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 13,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 21,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 21,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 21,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 21,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'us' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 15,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 19,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 19,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 19,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 19,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'it' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 13,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 21,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 21,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 21,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 21,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'fr' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 13,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 21,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 21,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 21,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 21,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'jp' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 1700,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 2600,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 2600,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 2600,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 250,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 2600,
            PromoProductFamily::PRODUCT_SLAP_PACK => 1500
        ],
        'es' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 13,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 21,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 21,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 21,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 21,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'pt' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 13,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 21,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 21,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 21,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 2,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 21,
            PromoProductFamily::PRODUCT_SLAP_PACK => 15
        ],
        'pl' => [
            PromoProductFamily::PRODUCT_MONSTER_PACK => 60,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2021 => 95,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2022 => 95,
            PromoProductFamily::PRODUCT_CREEPY_HEAD_PACK => 95,
            PromoProductFamily::PRODUCT_SAMPLE_STICKER_PACK => 8,
            PromoProductFamily::PRODUCT_MOST_LIKED_PACK_2023 => 95,
            PromoProductFamily::PRODUCT_SLAP_PACK => 64
        ]
    );

    public function __construct(ProductService $service, Figure_Model $figureModel, VAT_Model $vatModel)
    {
        parent::__construct(self::NAME, $service, $vatModel);
        $this->figureModel = $figureModel;
    }

    protected function getUnitPrice(ProductItem $productItem, string $lang): array
    {
        $price = null;

        if ( $productItem->getAttribute( SheetTypeAttribute::ALIAS ) == SheetTypeAttribute::STICKER_PACK )
        {
            $price = $this->stickerPackPrices[$lang][ $productItem->getProductName() ] ?? null;
        }
        else
        {
            switch ($productItem->getProductName()) {
    
                case PromoProductFamily::PRODUCT_UV_LAMP:
                    $price = 0;
                    break;
    
                case PromoProductFamily::PRODUCT_GIFTCARD:
                    $giftcardId = $productItem->getAttribute(FigureAttribute::ALIAS);
    
                    $giftcardSetPrice = floatval($this->figureModel->figure_meta_sql_table->getValue($giftcardId, "giftcard_meta[giftcard_value]"));
                    $giftcardHasDiscount = boolval($this->figureModel->figure_meta_sql_table->getValue($giftcardId, "giftcard_meta[giftcard_is_discounted]"));
                    $giftcardDiscount = floatval($this->figureModel->figure_meta_sql_table->getValue($giftcardId, "giftcard_meta[giftcard_discount]"));
            
                    $giftcardPrice = $giftcardSetPrice;
    
                    if ($giftcardHasDiscount) {
                        $giftcardPrice = $giftcardSetPrice - $giftcardDiscount;
                    }
    
                    $price = $giftcardPrice;
    
                    break;
    
                default:
                    break;
            }
        }


        if (is_null($price)) {
            throw new ProductServiceException("No price set for " . json_encode($productItem));
        }

        return array($price);
    }
}
