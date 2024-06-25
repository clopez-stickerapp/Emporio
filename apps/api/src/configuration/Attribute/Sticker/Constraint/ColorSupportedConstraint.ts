import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { ColorSupportedAttribute } from "../../../attributes/ColorSupportedAttribute";
import { MaterialValues } from "../../../attributes/MaterialAttribute";

export class ColorSupportedConstraint extends ProductAttrConstraint {
	public constructor() {
		super( ColorSupportedAttribute.getName() );

		this.createConditionsFor( true )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.COLORED_VINYL,
			] );
	}
}