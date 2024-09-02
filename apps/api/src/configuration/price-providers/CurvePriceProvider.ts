import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { Currencies } from "$/currency/Currency";
import { Price, bundlePrice } from "$/prices/Price";
import { Rate } from "$/prices/Rate";
import { RateBasedProductPriceProvider } from "$/prices/RateBasedProductPriceProvider";
import { RateFunction } from "$/prices/RateFunction";
import { RateList } from "$/prices/RateList";
import { RateProviderType } from "$/prices/RateProvider";
import { ProductItem } from "$/product/ProductItem";
import { ProductNames } from "$data/ConditionValueResolver";
import { LaminateValues } from "../attributes/LaminateAttribute";
import { MaterialValues } from "../attributes/MaterialAttribute";
import { AuthorMarginRateProvider } from "./AuthorMarginRateProvider";

export class CurvePriceProvider extends RateBasedProductPriceProvider {
	static readonly NAME = "curve_price_provider";

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
		super(CurvePriceProvider.NAME);

		let modifier: number = 0.94;

		const rl_white = new RateFunction(CurvePriceProvider.RATELIST_WHITE, 8500 * modifier, 0.5, 1800 * modifier);
		rl_white.conditions
			.addSubGroup({ relationMode: ConditionRelations.AND })
			.addCondition({ attribute: "item.productName", operator: ConditionOperators.NOT_EQUAL, value: ProductNames.PRODUCT_TRANSFER_DECAL})
			.addSubGroup({ relationMode: ConditionRelations.OR })
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.WHITE, MaterialValues.WHITE_BACKSCORE, MaterialValues.BUBBLE_FREE, MaterialValues.SATIN_MATTE]})
			.addCondition({ attribute: "item.productName", operator: ConditionOperators.EQUAL, value: ProductNames.PRODUCT_LABELS_ON_ROLL})
			.addCondition({ attribute: "item.productName", operator: ConditionOperators.EQUAL, value: ProductNames.PRODUCT_FLOOR})
		this.addRateProvider(rl_white);

		let rl_shiny = new RateFunction(CurvePriceProvider.RATELIST_SHINY, 10500 * modifier, 0.37, 2300 * modifier);
		rl_shiny.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.HOLOGRAPHIC, MaterialValues.GLITTER, MaterialValues.PRISMATIC, MaterialValues.BRUSHED_ALLOY, MaterialValues.WARRANTY, MaterialValues.FROSTED, MaterialValues.PIXIE_DUST]})
			.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.NOT_EQUAL, value: LaminateValues.EPOXY})
		this.addRateProvider(rl_shiny);

		let rl_thick = new RateFunction(CurvePriceProvider.RATELIST_THICK, 11500 * modifier, 0.45, 6500 * modifier);
		rl_thick.conditions
			.addSubGroup({ relationMode: ConditionRelations.OR })
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.GITD, MaterialValues.METALLIC_GOLD, MaterialValues.METALLIC_SILVER, MaterialValues.COLORED_VINYL] })
			.addCondition({ attribute: "item.productName", operator: ConditionOperators.EQUAL, value: ProductNames.PRODUCT_TRANSFER_DECAL })
			.addSubGroup({ relationMode: ConditionRelations.AND })
			.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.EQUAL, value: LaminateValues.GLOSSY_UV_12_MIL_HEAVY_DUTY })
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.WHITE_HI_TACK]});
		this.addRateProvider(rl_thick);

		let rl_clear = new RateFunction(CurvePriceProvider.RATELIST_CLEAR, 8500 * modifier, 0.5, 2100 * modifier);
		rl_clear.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.CLEAR, MaterialValues.CLEAR_BACKSCORE]});
		this.addRateProvider(rl_clear);

		let rl_mirror = new RateFunction(CurvePriceProvider.RATELIST_MIRROR, 10000 * modifier, 0.4, 2200 * modifier);
		rl_mirror.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.MIRROR]})
			.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.NOT_EQUAL, value: LaminateValues.EPOXY});
		this.addRateProvider(rl_mirror);

		let rl_kraft = new RateFunction(CurvePriceProvider.RATELIST_KRAFT, 8500 * modifier, 0.5, 1800 * modifier);
		rl_kraft.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.KRAFT_PAPER, MaterialValues.WHITE_REMOVABLE]})
			.addCondition({ attribute: "item.productName", operator: ConditionOperators.NOT_EQUAL, value: ProductNames.PRODUCT_FLOOR});
		this.addRateProvider(rl_kraft);

		let rl_wall = new RateFunction(CurvePriceProvider.RATELIST_WALL, 3000 * modifier, 0.7, 6500 * modifier);
		rl_wall.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.WHITE_WALL]});
		this.addRateProvider(rl_wall);

		let rl_epoxy = new RateFunction(CurvePriceProvider.RATELIST_EPOXY, 21900 * modifier, 0.3, 16000 * modifier);
		rl_epoxy.conditions
			.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.IN, value: [LaminateValues.EPOXY]});
		this.addRateProvider(rl_epoxy);

		let rl_labels_on_sheets = new RateFunction(CurvePriceProvider.RATELIST_LABELS_ON_SHEET, 8000 * modifier, 0.6, 1400 * modifier);
		rl_labels_on_sheets.conditions
			.addCondition({ attribute: "item.productName", operator: ConditionOperators.IN, value: [ProductNames.PRODUCT_LABELS_ON_SHEET, ProductNames.PRODUCT_LABELS_ON_ROLL]});
		this.addRateProvider(rl_labels_on_sheets);

		let rl_backprint = new RateList(CurvePriceProvider.RATELIST_BACKPRINT, new Rate(25, true, 1100));
		rl_backprint.setType(RateProviderType.ADDON)
			.conditions.addCondition({ attribute: "item.attributes.feature", operator: ConditionOperators.IN, value: "backpaper_print"});
		this.addRateProvider(rl_backprint);

		this.addRateProvider( new AuthorMarginRateProvider() );

		/** 
		 * STS ONLY 
		*/
		let rl_thin = new RateFunction(CurvePriceProvider.RATELIST_WHITE_THIN, 7000 * modifier, 0.6, 1300 * modifier);
		rl_thin.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.WHITE_PAPER]});
		this.addRateProvider(rl_thin);

		let rl_reflective = new RateFunction(CurvePriceProvider.RATELIST_REFLECTIVE, 7000 * modifier, 0.45, 10000 * modifier);
		rl_reflective.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.REFLECTIVE, MaterialValues.FLUORESCENT, MaterialValues.MAGNETIC, MaterialValues.HEAT_TRANSFER]});
		this.addRateProvider(rl_reflective);

		let rl_coverall = new RateFunction(CurvePriceProvider.RATELIST_COVERALL, 18000 * modifier, 0.25, 9000 * modifier);
		rl_coverall.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.WHITE_COVERALL]});
		this.addRateProvider(rl_coverall);

		// Glossy + sandy hi-tack
		let rl_sts_hi_tack = new RateFunction(CurvePriceProvider.RATELIST_STS_HI_TACK, 8000 * modifier, 0.6, 4500 * modifier);
		rl_sts_hi_tack.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.WHITE_HI_TACK]})
			.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.NOT_EQUAL, value: LaminateValues.GLOSSY_UV_12_MIL_HEAVY_DUTY });
		this.addRateProvider(rl_sts_hi_tack);

		let rl_bubble_free = new RateList(CurvePriceProvider.RATELIST_BUBBLE_FREE, new Rate(15, true, 0));
		rl_bubble_free.setType(RateProviderType.ADDON)
			.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.BUBBLE_FREE]});
		this.addRateProvider(rl_bubble_free);

		let rl_arlon_transfer = new RateList(CurvePriceProvider.RATELIST_ARLON_TRANSFER, new Rate(20, true, 0));
		rl_arlon_transfer.setType(RateProviderType.ADDON)
			.conditions
			.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.IN, value: [MaterialValues.WHITE]})
			.addCondition({ attribute: "item.productName", operator: ConditionOperators.EQUAL, value: ProductNames.PRODUCT_TRANSFER_DECAL});
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