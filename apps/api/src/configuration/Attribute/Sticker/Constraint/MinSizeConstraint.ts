import { ConditionOperators } from "$/conditions/ConditionOperators";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { MinSizeAttribute, MinSizes } from "../../../attributes/MinSizeAttribute";

export class MinSizeConstraint extends ProductAttrConstraint {
	public constructor() {
		super( MinSizeAttribute.getName() );

		this.createConditionsFor( MinSizes.BIGGER )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WALL,
				CustomStickerFamily.PRODUCT_FLOOR
			] );
	}
}
