import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { CuisineAttribute } from "../Attributes/CuisineAttribute";
import { IngredientAttribute } from "../Attributes/IngredientAttribute";

export class CuisineConstraint extends ProductAttrConstraint {
	public constructor() {
		super( CuisineAttribute.NAME );

		this.createConditionsFor( CuisineAttribute.NEOPOLITAN )
			.addCondition( "item.attributes.ingredient", ConditionOperators.NOT_IN, [
				IngredientAttribute.PINEAPPLE
			] );
	}
}