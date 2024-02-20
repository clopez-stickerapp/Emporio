import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductConditionBuilder } from "../../Condition/ProductConditionBuilder";

export class ProductAttrFilteredValues {
	public conditionBuilder: ProductConditionBuilder;

	public constructor( public values: string[] | number[] | boolean[], conditionRelationMode: string = ConditionRelations.AND ) {
		this.conditionBuilder = new ProductConditionBuilder( conditionRelationMode );
	}
}
