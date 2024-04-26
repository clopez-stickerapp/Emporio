import { ProductAttrConstraint } from "../../../src/Commerce/Core/Product/Attribute/Constraint/ProductAttrConstraint";
import { ConditionOperators } from "../../../src/Helper/Condition/ConditionOperators";
import { CuisineAttribute } from "../Attributes/CuisineAttribute";
import { PortionAttribute } from "../Attributes/PortionAttribute";

export class PortionConstraint extends ProductAttrConstraint {
	public constructor() {
		super( PortionAttribute.NAME );
		
		this.createConditionsFor( PortionAttribute.FAMILY )
			.addCondition( "item.attributes.cuisine", ConditionOperators.NOT_EQUAL, CuisineAttribute.NEOPOLITAN );

		this.createConditionsFor( PortionAttribute.MINI )
			.addCondition( "item.attributes.cuisine", ConditionOperators.NOT_EQUAL, CuisineAttribute.SWEDISH );
	}
}