import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductConditionBuilder } from "../../condition/ProductConditionBuilder";
import { AttributeValueMulti } from "../AttributeValue";

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
