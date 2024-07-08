import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { CuisineAttribute, CuisineValues } from "../Attributes/CuisineAttribute";
import { IngredientAttribute, IngredientValues } from "../Attributes/IngredientAttribute";

export const CuisineConstraint = new ProductAttrConstraint( {
	name: CuisineAttribute.getName(),
	rules: [
		{
			keys: [ 
				CuisineValues.NEOPOLITAN 
			],
			conditions: {
				relationMode: ConditionRelations.AND,
				conditions: [
					{
						attribute: IngredientAttribute.getName(),
						operator: ConditionOperators.NOT_IN,
						value: [
							IngredientValues.PINEAPPLE
						]
					}
				]
			}
		}
	]
} );