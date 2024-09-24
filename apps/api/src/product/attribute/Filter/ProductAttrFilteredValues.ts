import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { ProductConditionBuilder } from "../../condition/ProductConditionBuilder";
import { AttributeValueMulti } from "@stickerapp-org/nomisma";

export class ProductAttrFilteredValues {
	public conditionBuilder: ProductConditionBuilder;
	protected name: string;
	protected values: AttributeValueMulti;

	public constructor( name: string, values: AttributeValueMulti, config: ConditionBuilderConfig ) {
		this.name = name;
		this.values = values;
		this.conditionBuilder = new ProductConditionBuilder( config );
	}

	public getValues(): AttributeValueMulti {
		return this.values;
	}

	public getName(): string {
		return this.name;
	}
}
