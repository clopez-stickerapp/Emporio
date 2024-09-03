import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { CuisineAttribute, CuisineValues } from "../Attributes/CuisineAttribute";
import { PortionAttribute, PortionValues } from "../Attributes/PortionAttribute";

export const PortionConstraint = new ProductAttrConstraint( {
	name: PortionAttribute.getName(),
	rules: [
		{
			keys: [ 
				PortionValues.FAMILY
			],
			conditions: {
				relationMode: ConditionRelations.AND,
				conditions: [
					{
						attribute: 'item.attributes.' + CuisineAttribute.getName(),
						operator: ConditionOperators.NOT_EQUAL,
						value: CuisineValues.NEOPOLITAN
					}
				],
			}
		},
		{
			keys: [ 
				PortionValues.MINI
			],
			conditions: {
				relationMode: ConditionRelations.AND,
				conditions: [
					{
						attribute: 'item.attributes.' + CuisineAttribute.getName(),
						operator: ConditionOperators.NOT_EQUAL,
						value: CuisineValues.SWEDISH
					}
				]
			}
		}
	]
} as any );