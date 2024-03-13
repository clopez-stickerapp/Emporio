import { ConditionOperators } from "$/Helper/Condition/ConditionOperators";
import { ConditionRelations } from "$/Helper/Condition/ConditionRelations";
import { Currencies } from "../../Core/Currency/Currency";
import { Price } from "../../Core/Price/Price";
import { Rate } from "../../Core/Price/Rate";
import { RateBasedProductPriceProvider } from "../../Core/Price/RateBasedProductPriceProvider";
import { RateList } from "../../Core/Price/RateList";
import { ProductItem } from "../../Core/Product/Item/ProductItem";

export class SkinPriceProvider extends RateBasedProductPriceProvider {
	public static readonly NAME = "skin_rates";
	public static readonly RATELIST_LAPTOPS = "laptops";
	public static readonly RATELIST_PHONES = "phones";
	public static readonly RATELIST_PADS = "pads";

	public constructor() {
		super( SkinPriceProvider.NAME );

		const laptops = new RateList( SkinPriceProvider.RATELIST_LAPTOPS, new Rate( 2900 ) );
		laptops.conditions.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "laptop" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "macbook" );
		this.addRateProvider( laptops );

		const phones = new RateList( SkinPriceProvider.RATELIST_PHONES, new Rate( 1500 ) );
		phones.conditions.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "iphone" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "samsung" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "galaxy" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "nexus" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "oneplus" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "pixel" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "ipod" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "one-x" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "desire" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "sensation" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "nokia" )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "phoneholder" );
		this.addRateProvider( phones );

		const pads = new RateList( SkinPriceProvider.RATELIST_PADS, new Rate( 1900 ) );
		pads.conditions.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.sheet_name", ConditionOperators.IN, "ipad" );
		this.addRateProvider( pads );
	}

	public calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Price {
		let price = super.calculatePrice(productItem, units, currency);

		price.total = Math.round(price.total);

		for (let key in price.breakdown) {
			price.breakdown[key] = Math.round(price.breakdown[key]);
		}

		return price;
	}
}