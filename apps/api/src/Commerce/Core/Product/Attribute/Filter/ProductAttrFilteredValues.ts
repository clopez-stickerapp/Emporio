import { AttributeValueMulti } from "../../../../../Helper/Condition/AttributeValue";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductConditionBuilder } from "../../Condition/ProductConditionBuilder";

export class ProductAttrFilteredValues {
	public conditionBuilder: ProductConditionBuilder;

	public constructor( public values: AttributeValueMulti, conditionRelationMode: string = ConditionRelations.AND ) {
		this.conditionBuilder = new ProductConditionBuilder( conditionRelationMode );
	}
}
