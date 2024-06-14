import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
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