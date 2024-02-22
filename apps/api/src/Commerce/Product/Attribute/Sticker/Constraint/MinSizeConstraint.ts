import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ProductAttrConstraint } from "../../../../Core/Product/Attribute/Constraint/ProductAttrConstraint";
import { CustomStickerFamily } from "../../../Family/CustomStickerFamily";
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
