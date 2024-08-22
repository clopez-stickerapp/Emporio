import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { Currencies } from "$/currency/Currency";
import { Price, bundlePrice } from "$/prices/Price";
import { Rate } from "$/prices/Rate";
import { RateBasedProductPriceProvider } from "$/prices/RateBasedProductPriceProvider";
import { RateList } from "$/prices/RateList";
import { RateProviderType } from "$/prices/RateProvider";
import { ProductItem } from "$/product/ProductItem";
import { LaminateAttribute } from "../Attribute/Sticker/LaminateAttribute";
import { MaterialAttribute } from "../Attribute/Sticker/MaterialAttribute";
import { CustomStickerFamily } from "../Family/CustomStickerFamily";
import { AuthorMarginRateProvider } from "./AuthorMarginRateProvider";

export class StickerPriceProvider extends RateBasedProductPriceProvider {
	static readonly NAME = "sticker_rate_lists";

	static readonly RATELIST_WHITE = "rl_white";
	static readonly RATELIST_SHINY = "rl_shiny"; // Holographic Glitter Prism Alu"
	static readonly RATELIST_THICK = "rl_thick"; // GITD Heavy duty
	static readonly RATELIST_CLEAR = "rl_clear";
	static readonly RATELIST_MIRROR = "rl_mirror";
	static readonly RATELIST_KRAFT = "rl_kraft"; // Kraft paper, removable
	static readonly RATELIST_WALL = "rl_wall";
	static readonly RATELIST_EPOXY = "rl_epoxy";

	static readonly RATELIST_BACKPRINT = "rl_backprint";
	static readonly RATELIST_LABELS_ON_SHEET = "rl_labels_on_sheet";
	static readonly RATELIST_MARKET_DE = "rl_market_de";

	static readonly RATELIST_WHITE_THIN = "rl_white_thin";
	static readonly RATELIST_REFLECTIVE = "rl_reflective";
	static readonly RATELIST_COVERALL = "rl_coverall";

	static readonly RATELIST_STS_HI_TACK = "rl_sts_hi_tack";
	static readonly RATELIST_BUBBLE_FREE = "rl_bubble_free";
	static readonly RATELIST_ARLON_TRANSFER = "rl_arlon_transfer";

	public constructor() {
		super(StickerPriceProvider.NAME);

		let rl_white = new RateList(StickerPriceProvider.RATELIST_WHITE, new Rate(132000));
		rl_white.addRate(new Rate(96250), 0.0025)
			.addRate(new Rate(88000), 0.004)
			.addRate(new Rate(82500), 0.005)
			.addRate(new Rate(78650), 0.006)
			.addRate(new Rate(75900), 0.007)
			.addRate(new Rate(73700), 0.008)
			.addRate(new Rate(71500), 0.009)
			.addRate(new Rate(51700), 0.01)
			.addRate(new Rate(41250), 0.015)
			.addRate(new Rate(35200), 0.02)
			.addRate(new Rate(30800), 0.025)
			.addRate(new Rate(28600), 0.03)
			.addRate(new Rate(26400), 0.035)
			.addRate(new Rate(24200), 0.04)
			.addRate(new Rate(23100), 0.045)
			.addRate(new Rate(20900), 0.05)
			.addRate(new Rate(18205), 0.12)
			.addRate(new Rate(12312), 0.49)
			.addRate(new Rate(8736), 1)
			.addRate(new Rate(7488), 2)
			.addRate(new Rate(6448), 3)
			.addRate(new Rate(5202), 5)
			.addRate(new Rate(4300), 10)
			.addRate(new Rate(3705), 20)
			.addRate(new Rate(3325), 30)
			.addRate(new Rate(3040), 50)
			.addRate(new Rate(2720), 100)
			.conditions
			.addSubGroup(ConditionRelations.AND)
			.addCondition("item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_TRANSFER_DECAL)
			.addSubGroup(ConditionRelations.OR)
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.WHITE, MaterialAttribute.WHITE_BACKSCORE, MaterialAttribute.BUBBLE_FREE, MaterialAttribute.SATIN_MATTE])
			.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_LABELS_ON_ROLL)
			.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_FLOOR);
		this.addRateProvider(rl_white);

		let rl_shiny = new RateList(StickerPriceProvider.RATELIST_SHINY, new Rate(26000));
		rl_shiny.addRate(new Rate(23870), 0.13)
			.addRate(new Rate(16740), 0.5)
			.addRate(new Rate(12090), 1)
			.addRate(new Rate(9641), 2)
			.addRate(new Rate(7931), 3)
			.addRate(new Rate(7695), 5)
			.addRate(new Rate(7400), 10)
			.addRate(new Rate(5700), 20)
			.addRate(new Rate(5320), 30)
			.addRate(new Rate(5035), 50)
			.addRate(new Rate(4505), 100)
			.conditions.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.HOLOGRAPHIC, MaterialAttribute.GLITTER, MaterialAttribute.PRISMATIC,
			MaterialAttribute.BRUSHED_ALLOY, MaterialAttribute.WARRANTY, MaterialAttribute.FROSTED, MaterialAttribute.PIXIE_DUST])
			.addCondition("item.attributes.laminate", ConditionOperators.NOT_EQUAL, LaminateAttribute.EPOXY);
		this.addRateProvider(rl_shiny);

		let rl_thick = new RateList(StickerPriceProvider.RATELIST_THICK, new Rate(32450));
		rl_thick.addRate(new Rate(29810), 0.12)
			.addRate(new Rate(23652), 0.5)
			.addRate(new Rate(17888), 1)
			.addRate(new Rate(16640), 2)
			.addRate(new Rate(15600), 3)
			.addRate(new Rate(12342), 5)
			.addRate(new Rate(11300), 10)
			.addRate(new Rate(10355), 20)
			.addRate(new Rate(8360), 30)
			.addRate(new Rate(8075), 50)
			.addRate(new Rate(7225), 100)
			.conditions
			.addSubGroup(ConditionRelations.OR)
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.GITD, MaterialAttribute.METALLIC_GOLD, MaterialAttribute.METALLIC_SILVER, MaterialAttribute.COLORED_VINYL])
			.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_TRANSFER_DECAL)
			.addSubGroup(ConditionRelations.AND)
			.addCondition("item.attributes.laminate", ConditionOperators.EQUAL, LaminateAttribute.GLOSSY_UV_12_MIL_HEAVY_DUTY)
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.WHITE_HI_TACK]);
		this.addRateProvider(rl_thick);

		let rl_clear = new RateList(StickerPriceProvider.RATELIST_CLEAR, new Rate(25080));
		rl_clear.addRate(new Rate(21890), 0.12)
			.addRate(new Rate(14796), 0.5)
			.addRate(new Rate(10504), 1)
			.addRate(new Rate(7488), 2)
			.addRate(new Rate(6448), 3)
			.addRate(new Rate(5202), 5)
			.addRate(new Rate(4300), 10)
			.addRate(new Rate(3705), 20)
			.addRate(new Rate(3325), 30)
			.addRate(new Rate(3040), 50)
			.addRate(new Rate(2720), 100)
			.conditions.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.CLEAR, MaterialAttribute.CLEAR_BACKSCORE]);
		this.addRateProvider(rl_clear);

		let rl_mirror = new RateList(StickerPriceProvider.RATELIST_MIRROR, new Rate(26000));
		rl_mirror.addRate(new Rate(22220), 0.13)
			.addRate(new Rate(15444), 0.5)
			.addRate(new Rate(10929), 1)
			.addRate(new Rate(8798), 2)
			.addRate(new Rate(7164), 3)
			.addRate(new Rate(6850), 5)
			.addRate(new Rate(6500), 10)
			.addRate(new Rate(5130), 20)
			.addRate(new Rate(4750), 30)
			.addRate(new Rate(4465), 50)
			.addRate(new Rate(3995), 100)
			.conditions.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.MIRROR])
			.addCondition("item.attributes.laminate", ConditionOperators.NOT_EQUAL, LaminateAttribute.EPOXY);
		this.addRateProvider(rl_mirror);

		let rl_kraft = new RateList(StickerPriceProvider.RATELIST_KRAFT, new Rate(20900));
		rl_kraft.addRate(new Rate(18150), 0.12)
			.addRate(new Rate(12312), 0.5)
			.addRate(new Rate(8736), 1)
			.addRate(new Rate(7488), 2)
			.addRate(new Rate(6448), 3)
			.addRate(new Rate(5202), 5)
			.addRate(new Rate(4300), 10)
			.addRate(new Rate(3705), 20)
			.addRate(new Rate(3325), 30)
			.addRate(new Rate(3040), 50)
			.addRate(new Rate(2720), 100)
			.conditions.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.KRAFT_PAPER, MaterialAttribute.WHITE_REMOVABLE])
			.addCondition("item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_FLOOR);
		this.addRateProvider(rl_kraft);

		let rl_wall = new RateList(StickerPriceProvider.RATELIST_WALL, new Rate(19580));
		rl_wall.addRate(new Rate(16200), 0.5)
			.addRate(new Rate(10400), 1)
			.addRate(new Rate(9152), 2)
			.addRate(new Rate(8424), 3)
			.addRate(new Rate(7650), 5)
			.addRate(new Rate(7038), 7)
			.conditions.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.WHITE_WALL]);
		this.addRateProvider(rl_wall);

		let rl_epoxy = new RateList(StickerPriceProvider.RATELIST_EPOXY, new Rate(54120));
		rl_epoxy.addRate(new Rate(48180), 0.12)
			.addRate(new Rate(43848), 0.5)
			.addRate(new Rate(40352), 1)
			.addRate(new Rate(39000), 2)
			.addRate(new Rate(37752), 3)
			.addRate(new Rate(36400), 4)
			.addRate(new Rate(34476), 5)
			.addRate(new Rate(33150), 6)
			.addRate(new Rate(31926), 7)
			.addRate(new Rate(30600), 8)
			.addRate(new Rate(29376), 9)
			.conditions.addCondition("item.attributes.laminate", ConditionOperators.IN, [LaminateAttribute.EPOXY]);
		this.addRateProvider(rl_epoxy);

		let rl_labels_on_sheets = new RateList(StickerPriceProvider.RATELIST_LABELS_ON_SHEET);
		rl_labels_on_sheets.addRate(new Rate(-20, true), 1)
			.addRate(new Rate(-30, true), 20)
			.addRate(new Rate(-31.25, true), 100)
			.conditions.addCondition("item.productName", ConditionOperators.IN, [CustomStickerFamily.PRODUCT_LABELS_ON_SHEET, CustomStickerFamily.PRODUCT_LABELS_ON_ROLL]);
		this.addRateProvider(rl_labels_on_sheets);

		let rl_backprint = new RateList(StickerPriceProvider.RATELIST_BACKPRINT, new Rate(25, true, 1100));
		rl_backprint.setType(RateProviderType.ADDON)
			.conditions.addCondition("item.attributes.feature", ConditionOperators.IN, "backpaper_print");
		this.addRateProvider(rl_backprint);

		this.addRateProvider( new AuthorMarginRateProvider() );

		/** 
		 * STS ONLY 
		*/
		let rl_thin = new RateList(StickerPriceProvider.RATELIST_WHITE_THIN, new Rate(20000));
		rl_thin.addRate(new Rate(10000), 5)
			.addRate(new Rate(5310), 8)
			.addRate(new Rate(4250), 12)
			.addRate(new Rate(2500), 20)
			.addRate(new Rate(2000), 30)
			.addRate(new Rate(1900), 50)
			.addRate(new Rate(1800), 100)
			.addRate(new Rate(1600), 250)
			.addRate(new Rate(1500), 500)
			.conditions
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.WHITE_PAPER]);
		this.addRateProvider(rl_thin);

		let rl_reflective = new RateList(StickerPriceProvider.RATELIST_REFLECTIVE, new Rate(16900));
		rl_reflective.addRate(new Rate(16000), 2)
			.addRate(new Rate(15500), 3)
			.addRate(new Rate(14500), 5)
			.addRate(new Rate(13500), 8)
			.addRate(new Rate(12500), 10)
			.addRate(new Rate(11500), 15)
			.addRate(new Rate(10500), 20)
			.addRate(new Rate(9500), 30)
			.addRate(new Rate(8500), 40)
			.conditions
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.REFLECTIVE, MaterialAttribute.FLUORESCENT, MaterialAttribute.MAGNETIC, MaterialAttribute.HEAT_TRANSFER]);
		this.addRateProvider(rl_reflective);

		let rl_coverall = new RateList(StickerPriceProvider.RATELIST_COVERALL, new Rate(35000));
		rl_coverall.addRate(new Rate(32500), 0.5)
			.addRate(new Rate(30000), 1)
			.addRate(new Rate(28000), 2)
			.addRate(new Rate(26000), 3)
			.addRate(new Rate(25000), 4)
			.addRate(new Rate(23000), 5)
			.addRate(new Rate(20000), 10)
			.addRate(new Rate(17000), 20)
			.addRate(new Rate(16000), 30)
			.addRate(new Rate(15000), 50)
			.addRate(new Rate(10000), 100)
			.conditions
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.WHITE_COVERALL]);
		this.addRateProvider(rl_coverall);

		// Glossy + sandy hi-tack
		let rl_sts_hi_tack = new RateList(StickerPriceProvider.RATELIST_STS_HI_TACK, new Rate(16200));
		rl_sts_hi_tack.addRate(new Rate(13100), 1)
			.addRate(new Rate(9900), 2)
			.addRate(new Rate(8400), 5)
			.addRate(new Rate(7400), 6)
			.addRate(new Rate(7200), 10)
			.addRate(new Rate(6700), 13)
			.addRate(new Rate(6500), 15)
			.addRate(new Rate(5300), 20)
			.addRate(new Rate(4900), 50)
			.addRate(new Rate(4500), 75)
			.addRate(new Rate(3600), 100)
			.addRate(new Rate(3000), 250)
			.conditions
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.WHITE_HI_TACK])
			.addCondition("item.attributes.laminate", ConditionOperators.NOT_EQUAL, LaminateAttribute.GLOSSY_UV_12_MIL_HEAVY_DUTY);
		this.addRateProvider(rl_sts_hi_tack);

		let rl_bubble_free = new RateList(StickerPriceProvider.RATELIST_BUBBLE_FREE, new Rate(15, true, 0));
		rl_bubble_free.setType(RateProviderType.ADDON)
			.conditions.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.BUBBLE_FREE]);
		this.addRateProvider(rl_bubble_free);

		let rl_arlon_transfer = new RateList(StickerPriceProvider.RATELIST_ARLON_TRANSFER, new Rate(20, true, 0));
		rl_arlon_transfer.setType(RateProviderType.ADDON)
			.conditions
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialAttribute.WHITE])
			.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_TRANSFER_DECAL);
		this.addRateProvider(rl_arlon_transfer);
	}

	public async calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Promise<Price> {
		let price = await super.calculatePrice(productItem, units, currency);

		return bundlePrice(price, {
			baseName: "price_base",
			separate: {
				// Setting this to the static readonly property seems to break it
				"rl_backprint": "price_backprint",
			}
		});
	}
}