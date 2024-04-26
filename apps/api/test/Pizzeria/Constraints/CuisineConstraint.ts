import { ProductAttrConstraint } from "../../../src/Commerce/Core/Product/Attribute/Constraint/ProductAttrConstraint";
import { ConditionOperators } from "../../../src/Helper/Condition/ConditionOperators";
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