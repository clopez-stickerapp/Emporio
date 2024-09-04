import { Condition } from "$/conditions/Condition";
import { ConditionOperators } from "$/conditions/ConditionOperators";
import { Rate, RateType } from "$/prices/Rate";
import { RateProvider, RateProviderType } from "$/prices/RateProvider";
import { ProductConditionBuilder } from "$/product/condition/ProductConditionBuilder";
import { ProductItem } from "$/product/ProductItem";
import { ProductNames } from "$data/ConditionValueResolver";
import { PriceMarginPercentageAttribute } from "../attributes/PriceMarginPercentageAttribute";

export class AuthorMarginRateProvider extends RateProvider{
	static readonly NAME = "rate_author_margin";
	static readonly PRICE_MARGIN_LIMIT = 100.0; // Percent

	public constructor(){
		super(AuthorMarginRateProvider.NAME);
		this.setType(RateProviderType.ADDON);
		this.conditions = new ProductConditionBuilder({
			conditions: [
				{
					attribute: "item.productName",
					operator: ConditionOperators.EQUAL,
					value: ProductNames.PRODUCT_LIBRARY_DESIGN
				}
			]
		})
	}

	public async getRate(productItem: ProductItem, units: number): Promise<Rate> {
		let priceMarginPercentage = productItem.getAttribute<number>( PriceMarginPercentageAttribute.getName() );

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