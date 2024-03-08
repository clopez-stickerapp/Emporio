import { AttributeValueMulti } from "../../../../../Helper/Condition/AttributeValue";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductConditionBuilder } from "../../Condition/ProductConditionBuilder";

export class ProductAttrFilteredValues {
	public conditionBuilder: ProductConditionBuilder;
	protected values: AttributeValueMulti;

	public constructor( values: AttributeValueMulti, conditionRelationMode: ConditionRelations = ConditionRelations.AND ) {
		this.values = values;
		this.conditionBuilder = new ProductConditionBuilder( conditionRelationMode );
	}

	public getValues(): AttributeValueMulti {
		return this.values;
	}
}
