import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { CustomStickerFamily } from "../../../Family/CustomStickerFamily";
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
	}
}
