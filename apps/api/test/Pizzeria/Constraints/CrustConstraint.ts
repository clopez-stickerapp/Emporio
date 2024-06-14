import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { CrustAttribute } from "../Attributes/CrustAttribute";
import { PizzeriaFamily } from "../PizzeriaFamily";

export class CrustConstraint extends ProductAttrConstraint {
	public constructor() {
		super( CrustAttribute.NAME );
		
		this.createConditionsFor( CrustAttribute.THICK )
			.addCondition( "item.attributes.productName", ConditionOperators.EQUAL, PizzeriaFamily.HAWAII );
	}
}