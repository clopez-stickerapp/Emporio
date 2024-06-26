import { ConditionRelations } from "$/conditions/ConditionRelations";
import { RuleConfig } from "$/configuration/interface/RuleConfig";
import { ProductConditionBuilder } from "../../condition/ProductConditionBuilder";
import { AttributeValueSingle } from "../AttributeValue";

export class ProductAttrConstraint {
	protected attributeName: string;
	public constraints: Record<string, ProductConditionBuilder> = {};

	public constructor( config: RuleConfig ) {
		this.attributeName = config.name;

		for ( const rule of config.rules ) {
			for ( const key of rule.keys ) {

				console.debug( `Creating constraints for ${ this.attributeName } - ${ key }` );
				this.constraints[ key ] = new ProductConditionBuilder( rule.conditions );
			}
		}
	}

	public createConditionsFor( attributeValue: AttributeValueSingle, relationMode: string = ConditionRelations.AND ): ProductConditionBuilder {
		throw new Error( "Creating conditions like this is no longer supported." );
		// attributeValue = attributeValue.toString();

		// if ( attributeValue in this.constraints ) {
		// 	// TODO: Custom exception
		// 	throw new Error( `Constraints already created for ${ attributeValue }` );
		// }

		// return this.constraints[ attributeValue ] = new ProductConditionBuilder( relationMode );
	}

	public getConditionsFor( attributeValue: AttributeValueSingle ): ProductConditionBuilder | null {
		attributeValue = attributeValue.toString();
		return attributeValue in this.constraints ? this.constraints[ attributeValue ] : null;
	}

	public getAttributeName(): string {
		return this.attributeName;
	}
}
