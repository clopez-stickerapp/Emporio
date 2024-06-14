import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { ColorSupportedAttribute } from "../../ColorSupportedAttribute";
import { MaterialAttribute } from "../MaterialAttribute";

export class ColorSupportedConstraint extends ProductAttrConstraint {
	public constructor() {
		super( ColorSupportedAttribute.ALIAS );

		this.createConditionsFor( true )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.COLORED_VINYL,
			] );
	}
}