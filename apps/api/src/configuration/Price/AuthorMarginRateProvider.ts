import { ConditionOperators } from "$/conditions/ConditionOperators";
import { Rate, RateType } from "$/prices/Rate";
import { RateProvider, RateProviderType } from "$/prices/RateProvider";
import { ProductItem } from "$/product/ProductItem";
import { PriceMarginPercentageAttribute } from "../Attribute/PriceMarginPercentageAttribute";
import { CustomStickerFamily } from "../Family/CustomStickerFamily";

export class AuthorMarginRateProvider extends RateProvider{
	static readonly NAME = "rate_author_margin";
	static readonly PRICE_MARGIN_LIMIT = 100.0; // Percent

	public constructor(){
		super(AuthorMarginRateProvider.NAME);
		this.setType(RateProviderType.ADDON);
		this.conditions.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_LIBRARY_DESIGN);
	}

	public async getRate(productItem: ProductItem, units: number): Promise<Rate> {
		let priceMarginPercentage = productItem.getAttribute<number>( PriceMarginPercentageAttribute.ALIAS );

		if ( priceMarginPercentage === undefined ) {
			throw new Error( "Can't find price margin" );
		} else if ( priceMarginPercentage > AuthorMarginRateProvider.PRICE_MARGIN_LIMIT ) {
			priceMarginPercentage = AuthorMarginRateProvider.PRICE_MARGIN_LIMIT;
		}

		let rate = new Rate(priceMarginPercentage, true);
		rate.setType(RateType.MULTIPLICATIVE);
		return rate;
	}
}