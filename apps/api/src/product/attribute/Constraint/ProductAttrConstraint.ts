import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { RuleConfig } from "$/configuration/interface/RuleConfig";
import { ProductConditionBuilder } from "../../condition/ProductConditionBuilder";
import { AttributeValueSingle } from "@stickerapp-org/nomisma";

export class ProductAttrConstraint {
	protected attributeName: string;
	public constraints: Record<string, ProductConditionBuilder> = {};

	public constructor( config: RuleConfig ) {
		this.attributeName = config.name;

		for ( const rule of config.rules ) {
			for ( const key of rule.keys ) {
				this.addConstraint( key, rule.conditions );
			}
		}
	}

	public addConstraint( attributeValue: AttributeValueSingle, config: ConditionBuilderConfig ): ProductConditionBuilder {
		const key = attributeValue.toString();

		if ( key in this.constraints ) {
			throw new Error( `Constraints already created for ${ attributeValue }` );
		}

		return this.constraints[ key ] = new ProductConditionBuilder( config );
	}

	public getConstraint( attributeValue: AttributeValueSingle ): ProductConditionBuilder | null {
		attributeValue = attributeValue.toString();
		return attributeValue in this.constraints ? this.constraints[ attributeValue ] : null;
	}

	public getAttributeName(): string {
		return this.attributeName;
	}
}
