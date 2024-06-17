import { ConditionOperators } from "$/conditions/ConditionOperators";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { DeliveryAttribute } from "../DeliveryAttribute";

export class DeliveryFilter extends ProductAttrFilter {
	public constructor() {
		super( DeliveryAttribute.ALIAS );

		this.createFilter( [ 
			DeliveryAttribute.DELIVERY_SHEET 
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_TRANSFER_DECAL,
				CustomStickerFamily.PRODUCT_3D_DOME
			] );

		this.createFilter( [ 
			DeliveryAttribute.DELIVERY_SINGLE 
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET,
				CustomStickerFamily.PRODUCT_SHEET_KISS_CUT,
			] );
	}
}