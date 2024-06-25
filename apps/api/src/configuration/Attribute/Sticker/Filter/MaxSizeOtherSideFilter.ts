import { ConditionOperators } from "$/conditions/ConditionOperators";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { MaxSizeOtherSideAttribute, MaxSizeOtherSideValues } from "../../../attributes/MaxSizeOtherSideAttribute";

export class MaxSizeOtherSideFilter extends ProductAttrFilter {
	public constructor() {
		super( MaxSizeOtherSideAttribute.getName() );

		this.createFilter( [ 
			MaxSizeOtherSideValues.ROLL 
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL,
			] );

		this.createFilter( [ 
			MaxSizeOtherSideValues.WALL
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WALL,
			] );
	}
}
