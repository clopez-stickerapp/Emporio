import { ConditionOperators } from "$/conditions/ConditionOperators";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { MaxSizeOtherSideAttribute } from "../MaxSizeOtherSideAttribute";

export class MaxSizeOtherSideFilter extends ProductAttrFilter {
	public constructor() {
		super( MaxSizeOtherSideAttribute.ALIAS );

		this.createFilter( [ 
			MaxSizeOtherSideAttribute.MAX_SIZE_OTHER_SIDE_ROLL 
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL,
			] );

		this.createFilter( [ 
			MaxSizeOtherSideAttribute.MAX_SIZE_OTHER_SIDE_WALL
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WALL,
			] );
	}
}
