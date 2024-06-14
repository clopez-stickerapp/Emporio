import { ConditionOperators } from "$/conditions/ConditionOperators";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { MaterialAttribute } from "../MaterialAttribute";

export class MaterialConstraint extends ProductAttrConstraint {
	public constructor() {
		super( MaterialAttribute.ALIAS );

		// Labels on roll materials should only be available for labels on roll
		for ( const material of MaterialAttribute.MATERIALS_LABELS_ON_ROLL ) {
			this.createConditionsFor( material )
				.addCondition( "item.productName", ConditionOperators.IN, [
					CustomStickerFamily.PRODUCT_LABELS_ON_ROLL,
				] );
		}
	}
}
