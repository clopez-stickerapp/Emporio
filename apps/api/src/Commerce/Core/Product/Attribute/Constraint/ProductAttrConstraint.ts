import { AttributeValueSingle } from "../../../../../Helper/Condition/AttributeValue";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductConditionBuilder } from "../../Condition/ProductConditionBuilder";

export class ProductAttrConstraint {
	public constraints: Record<string, ProductConditionBuilder> = {};

	public constructor( private attributeName: string ) {}

	public createConditionsFor( attributeValue: AttributeValueSingle, relationMode: string = ConditionRelations.AND ): ProductConditionBuilder {
		attributeValue = attributeValue.toString();

		if ( attributeValue in this.constraints ) {
			// TODO: Custom exception
			throw new Error( `Constraints already created for ${ attributeValue }` );
		}

		return this.constraints[ attributeValue ] = new ProductConditionBuilder( relationMode );
	}

	public getConditionsFor( attributeValue: AttributeValueSingle ): ProductConditionBuilder | null {
		attributeValue = attributeValue.toString();
		return attributeValue in this.constraints ? this.constraints[ attributeValue ] : null;
	}

	public getAttributeName(): string {
		return this.attributeName;
	}
}
