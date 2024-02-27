import { fetchPriceMarginPercentage } from "../../../Atlas";
import { ConditionOperators } from "../../../Helper/Condition/ConditionOperators";
import { Rate, RateType } from "../../Core/Price/Rate";
import { RateProvider, RateProviderType } from "../../Core/Price/RateProvider";
import { ProductItem } from "../../Core/Product/Item/ProductItem";
import { FigureAttribute } from "../Attribute/FigureAttribute";
import { CustomStickerFamily } from "../Family/CustomStickerFamily";

export class AuthorMarginRateProvider extends RateProvider{
	static readonly NAME = "rate_author_margin";
	static readonly PRICE_MARGIN_LIMIT = 100.0; // Percent

	public constructor(){
		super(AuthorMarginRateProvider.NAME);
		this.setType(RateProviderType.ADDON);
		this.conditions.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_LIBRARY_DESIGN);
	}

	public getRate(productItem: ProductItem, units: number): Rate {
		let figureId = productItem.getAttribute(FigureAttribute.ALIAS) as number;

		let priceMarginPercentage = fetchPriceMarginPercentage(figureId);
		
		if(priceMarginPercentage > AuthorMarginRateProvider.PRICE_MARGIN_LIMIT){
			priceMarginPercentage = AuthorMarginRateProvider.PRICE_MARGIN_LIMIT;
		}

		let rate = new Rate(priceMarginPercentage, true);
		rate.setType(RateType.MULTIPLICATIVE);
		return rate;
	}
}