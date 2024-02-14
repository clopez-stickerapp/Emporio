<?php

namespace StickerApp\Babylon\Commerce\Product\Price;

use Figure_Model;
use StickerApp\Babylon\Commerce\Core\Price\Rate;
use StickerApp\Babylon\Commerce\Core\Price\RateBasedProductPriceProvider;
use StickerApp\Babylon\Commerce\Core\Price\RateList;
use StickerApp\Babylon\Commerce\Core\Price\RateProvider;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Helper\Condition\ConditionOperators;
use StickerApp\Babylon\Helper\Condition\ConditionRelations;
use VAT_Model;

class StickerPriceProvider extends RateBasedProductPriceProvider
{
    const NAME = "sticker_rate_lists";

    const RATELIST_WHITE             = "rl_white";
    const RATELIST_SHINY             = "rl_shiny"; // Holographic Glitter Prism Alu"
    const RATELIST_THICK             = "rl_thick"; // GITD Heavy duty
    const RATELIST_CLEAR             = "rl_clear";
    const RATELIST_MIRROR            = "rl_mirror";
    const RATELIST_KRAFT             = "rl_kraft"; // Kraft paper, removable
    const RATELIST_WALL              = "rl_wall";
    const RATELIST_EPOXY             = "rl_epoxy";

    const RATELIST_BACKPRINT         = "rl_backprint";
    const RATELIST_LABELS_ON_SHEET   = "rl_labels_on_sheet";
    const RATELIST_MARKET_DE         = "rl_market_de";

    const RATELIST_WHITE_THIN        = "rl_white_thin";
    const RATELIST_REFLECTIVE        = "rl_reflective";
    const RATELIST_COVERALL          = "rl_coverall";
    const RATELIST_STS_HI_TACK       = "rl_sts_hi_tack";
    const RATELIST_BUBBLE_FREE       = "rl_bubble_free";
    const RATELIST_ARLON_TRANSFER    = "rl_arlon_transfer";


    public function __construct(ProductService $service, Figure_Model $figureModel, VAT_Model $vatModel)
    {
        parent::__construct(self::NAME, $service, $vatModel);

        $this->addProcessor(new StickerPriceBundler());
        $rl_white = new RateList(self::RATELIST_WHITE, new Rate(132000));
        $rl_white->addFromArray([
            "96250" => 0.0025,
            "88000" => 0.004,
            "82500" => 0.005,
            "78650" => 0.006,
            "75900" => 0.007,
            "73700" => 0.008,
            "71500" => 0.009,
            "51700" => 0.01,
            "41250" => 0.015,
            "35200" => 0.02,
            "30800" => 0.025,
            "28600" => 0.03,
            "26400" => 0.035,
            "24200" => 0.04,
            "23100" => 0.045,
            "20900" => 0.05,
            "18205" => 0.12,
            "12312" => 0.5,
            "8736" => 1,
            "7488" => 2,
            "6448" => 3,
            "5202" => 5,
            "4300" => 10,
            "3705" => 20,
            "3325" => 30,
            "3040" => 50,
            "2720" => 100
        ])
            ->conditions
            ->addSubGroup(ConditionRelations::AND)
            ->addCondition("item.productName", "!=", CustomStickerFamily::PRODUCT_TRANSFER_DECAL)
            ->addSubGroup(ConditionRelations::OR)
            ->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::WHITE, MaterialAttribute::WHITE_BACKSCORE, MaterialAttribute::BUBBLE_FREE, MaterialAttribute::SATIN_MATTE))
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_LABELS_ON_ROLL)
            ->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_FLOOR);
        $this->addRateProvider($rl_white);

        $rl_shiny = new RateList(self::RATELIST_SHINY, new Rate(26000));
        $rl_shiny->addFromArray([
            "23870" => 0.13,
            "16740" => 0.5,
            "12090" => 1,
            "9641" => 2,
            "7931" => 3,
            "7695" => 5,
            "7400" => 10,
            "5700" => 20,
            "5320" => 30,
            "5035" => 50,
            "4505" => 100
        ])
            ->conditions->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::HOLOGRAPHIC, MaterialAttribute::GLITTER, MaterialAttribute::PRISMATIC, 
                                                                   MaterialAttribute::BRUSHED_ALLOY, MaterialAttribute::WARRANTY, MaterialAttribute::FROSTED, MaterialAttribute::PIXIE_DUST))
            ->addCondition("item.attributes.laminate", "!=", LaminateAttribute::EPOXY);
        $this->addRateProvider($rl_shiny);

        $rl_thick = new RateList(self::RATELIST_THICK, new Rate(32450));
        $rl_thick->addFromArray([
            "29810" => 0.12,
            "23652" => 0.5,
            "17888" => 1,
            "16640" => 2,
            "15600" => 3,
            "12342" => 5,
            "11300" => 10,
            "10355" => 20,
            "8360" => 30,
            "8075" => 50,
            "7225" => 100
        ])
            ->conditions
            ->addSubGroup(ConditionRelations::OR)
            ->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::GITD, MaterialAttribute::METALLIC_GOLD, MaterialAttribute::METALLIC_SILVER, MaterialAttribute::COLORED_VINYL))
            ->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_TRANSFER_DECAL)
            ->addSubGroup(ConditionRelations::AND)
            ->addCondition("item.attributes.laminate", "==", LaminateAttribute::GLOSSY_UV_12_MIL_HEAVY_DUTY)
            ->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::WHITE_HI_TACK));
        $this->addRateProvider($rl_thick);

        $rl_clear = new RateList(self::RATELIST_CLEAR, new Rate(25080));
        $rl_clear->addFromArray([
            "21890" => 0.12,
            "14796" => 0.5,
            "10504" => 1,
            "7488" => 2,
            "6448" => 3,
            "5202" => 5,
            "4300" => 10,
            "3705" => 20,
            "3325" => 30,
            "3040" => 50,
            "2720" => 100
        ])
            ->conditions->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::CLEAR, MaterialAttribute::CLEAR_BACKSCORE));
        $this->addRateProvider($rl_clear);

        $rl_mirror = new RateList(self::RATELIST_MIRROR, new Rate(26000));
        $rl_mirror->addFromArray([
            "22220" => 0.13,
            "15444" => 0.5,
            "10929" => 1,
            "8798" => 2,
            "7164" => 3,
            "6850" => 5,
            "6500" => 10,
            "5130" => 20,
            "4750" => 30,
            "4465" => 50,
            "3995" => 100
        ])
            ->conditions->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::MIRROR))
            ->addCondition("item.attributes.laminate", "!=", LaminateAttribute::EPOXY);
        $this->addRateProvider($rl_mirror);

        $rl_kraft = new RateList(self::RATELIST_KRAFT, new Rate(20900));
        $rl_kraft->addFromArray([
            "18150" => 0.12,
            "12312" => 0.5,
            "8736" => 1,
            "7488" => 2,
            "6448" => 3,
            "5202" => 5,
            "4300" => 10,
            "3705" => 20,
            "3325" => 30,
            "3040" => 50,
            "2720" => 100
        ])
            ->conditions->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::KRAFT_PAPER, MaterialAttribute::WHITE_REMOVABLE))
            ->addCondition("item.productName", "!=", CustomStickerFamily::PRODUCT_FLOOR);
        $this->addRateProvider($rl_kraft);

        $rl_wall = new RateList(self::RATELIST_WALL, new Rate(19580));
        $rl_wall->addFromArray([
            "16200" => 0.5,
            "10400" => 1,
            "9152" => 2,
            "8424" => 3,
            "7650" => 5,
            "7038" => 7
        ])
            ->conditions->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::WHITE_WALL));
        $this->addRateProvider($rl_wall);

        $rl_epoxy = new RateList(self::RATELIST_EPOXY, new Rate(54120));
        $rl_epoxy->addFromArray([
            "48180" => 0.12,
            "43848" => 0.5,
            "40352" => 1,
            "39000" => 2,
            "37752" => 3,
            "36400" => 4,
            "34476" => 5,
            "33150" => 6,
            "31926" => 7,
            "30600" => 8,
            "29376" => 9
        ])
            ->conditions->addCondition("item.attributes.laminate", ConditionOperators::IN, array(LaminateAttribute::EPOXY));
        $this->addRateProvider($rl_epoxy);

        $rl_labels_on_sheets = new RateList(self::RATELIST_LABELS_ON_SHEET);
        $rl_labels_on_sheets->addRate(new Rate(-20, true), 1)
            ->addRate(new Rate(-30, true), 20)
            ->addRate(new Rate(-31.25, true), 100)
            ->conditions->addCondition("item.productName", ConditionOperators::IN, [CustomStickerFamily::PRODUCT_LABELS_ON_SHEET, CustomStickerFamily::PRODUCT_LABELS_ON_ROLL]);
        $this->addRateProvider($rl_labels_on_sheets);

        $rl_backprint = new RateList(self::RATELIST_BACKPRINT, new Rate(25, true, 1100));
        $rl_backprint->setType(RateProvider::TYPE_ADDON)
            ->conditions->addCondition("item.attributes.feature", ConditionOperators::IN, "backpaper_print");
        $this->addRateProvider($rl_backprint);

        $this->addRateProvider( new AuthorMarginRateProvider($figureModel) );

        /** 
         * STS ONLY 
        */
        $rl_thin = new RateList(self::RATELIST_WHITE_THIN, new Rate(20000));
        $rl_thin->addFromArray([
            "10000"=> 5,
            "5310" => 8,
            "4250" => 12,
            "2500" => 20,
            "2000" => 30,
            "1900" => 50,
            "1800" => 100,
            "1600" => 250,
            "1500" => 500,
        ])
            ->conditions
            ->addCondition("item.attributes.material", ConditionOperators::IN, array(
				MaterialAttribute::WHITE_PAPER,	// Don't know what this is, looks unused
			));
        $this->addRateProvider($rl_thin);

        $rl_reflective = new RateList(self::RATELIST_REFLECTIVE, new Rate(16900));
        $rl_reflective->addFromArray([
            "16000" => 2,
            "15500" => 3,
            "14500" => 5,
            "13500" => 8,
            "12500" => 10,
            "11500" => 15,
            "10500" => 20,
            "9500" => 30,
            "8500" => 40,
        ])
            ->conditions
            ->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::REFLECTIVE, MaterialAttribute::FLUORESCENT, MaterialAttribute::MAGNETIC, MaterialAttribute::HEAT_TRANSFER));
        $this->addRateProvider($rl_reflective);

        // Doublesided
        $rl_coverall = new RateList(self::RATELIST_COVERALL, new Rate(35000));
        $rl_coverall->addFromArray([
            "32500" => 0.5,
            "30000" => 1,
            "28000" => 2,
            "26000" => 3,
            "25000" => 4,
            "23000" => 5,
            "20000" => 10,
            "17000" => 20,
            "16000" => 30,
            "15000" => 50,
            "10000" => 100,
        ])
            ->conditions
            ->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::WHITE_COVERALL));
        $this->addRateProvider($rl_coverall);

        // Glossy + sandy hi-tack
        $rl_sts_hi_tack = new RateList(self::RATELIST_STS_HI_TACK, new Rate(16200));
        $rl_sts_hi_tack->addFromArray([
            "13100" => 1,
            "9900" => 2,
            "8400" => 5,
            "7400" => 6,
            "7200" => 10,
            "6700" => 13,
            "6500" => 15,
            "5300" => 20,
            "4900" => 50,
            "4500" => 75,
            "3600" => 100,
            "3000" => 250,
        ])
            ->conditions
            ->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::WHITE_HI_TACK))
            ->addCondition("item.attributes.laminate", "!=", LaminateAttribute::GLOSSY_UV_12_MIL_HEAVY_DUTY);
        $this->addRateProvider($rl_sts_hi_tack);

        $rl_bubble_free = new RateList(self::RATELIST_BUBBLE_FREE, new Rate(15, true, 0));
        $rl_bubble_free->setType(RateProvider::TYPE_ADDON)
            ->conditions->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::BUBBLE_FREE));
        $this->addRateProvider($rl_bubble_free);

        $rl_arlon_transfer = new RateList(self::RATELIST_ARLON_TRANSFER, new Rate(20, true, 0));
        $rl_arlon_transfer->setType(RateProvider::TYPE_ADDON)
            ->conditions
            ->addCondition("item.attributes.material", ConditionOperators::IN, array(MaterialAttribute::WHITE))
            ->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_TRANSFER_DECAL);
        $this->addRateProvider($rl_arlon_transfer);


    }
}
