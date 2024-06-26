import { ConditionOperators } from "$/conditions/ConditionOperators";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { MaterialAttribute, MaterialsLabelsOnRollValues } from "../attributes/MaterialAttribute";

export class MaterialConstraint extends ProductAttrConstraint {
	public constructor() {
		super( MaterialAttribute.getName() );

		// Labels on roll materials should only be available for labels on roll
		for ( const material of MaterialsLabelsOnRollValues ) {
			this.createConditionsFor( material )
				.addCondition( "item.productName", ConditionOperators.IN, [
					CustomStickerFamily.PRODUCT_LABELS_ON_ROLL,
				] );
		}
	}
}
