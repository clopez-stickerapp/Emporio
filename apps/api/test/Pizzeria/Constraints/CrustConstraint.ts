import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { CrustAttribute, CrustValues } from "../Attributes/CrustAttribute";
import { PizzeriaProducts } from "../PizzeriaProducts";

export const CrustConstraint = new ProductAttrConstraint( {
	name: CrustAttribute.getName(),
	rules: [
		{
			keys: [ 
				CrustValues.THICK 
			],
			conditions: {
				relationMode: ConditionRelations.AND,
				conditions: [
					{
						attribute: 'productName',
						operator: ConditionOperators.EQUAL,
						value: PizzeriaProducts.HAWAII
					}
				]
			}
		}
	]
} );