import { ProductAttrConstraint } from "../../../src/Commerce/Core/Product/Attribute/Constraint/ProductAttrConstraint";
import { ConditionOperators } from "../../../src/Helper/Condition/ConditionOperators";
import { CrustAttribute } from "../Attributes/CrustAttribute";
import { PizzeriaFamily } from "../PizzeriaFamily";

export class CrustConstraint extends ProductAttrConstraint {
	public constructor() {
		super( CrustAttribute.NAME );
		
		this.createConditionsFor( CrustAttribute.THICK )
			.addCondition( "item.attributes.productName", ConditionOperators.EQUAL, PizzeriaFamily.HAWAII );
	}
}