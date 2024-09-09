import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { ProductConditionBuilder } from "../../condition/ProductConditionBuilder";
import { AttributeValueMulti } from "@stickerapp-org/nomisma";

export class ProductAttrFilteredValues {
	public conditionBuilder: ProductConditionBuilder;
	protected values: AttributeValueMulti;

	public constructor( values: AttributeValueMulti, config: ConditionBuilderConfig ) {
		this.values = values;
		this.conditionBuilder = new ProductConditionBuilder( config );
	}

	public getValues(): AttributeValueMulti {
		return this.values;
	}
}
