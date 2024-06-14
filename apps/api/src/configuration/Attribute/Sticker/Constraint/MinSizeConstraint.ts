import { ConditionOperators } from "$/conditions/ConditionOperators";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { MinSizeAttribute } from "../MinSizeAttribute";

export class MinSizeConstraint extends ProductAttrConstraint {
	public constructor() {
		super( MinSizeAttribute.ALIAS );

		this.createConditionsFor( MinSizeAttribute.MIN_SIZE_BIGGER )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WALL,
				CustomStickerFamily.PRODUCT_FLOOR
			] );
	}
}
