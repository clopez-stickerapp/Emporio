import { ProductConditionBuilder } from "../../condition/ProductConditionBuilder";
import { ProductItem } from "../../ProductItem";
import { AttributeValueSingle } from "../AttributeValue";
import { ProductAttrConstraint } from "./ProductAttrConstraint";

export class ProductAttrConstraintCollection {
	protected constraints: Record<string, ProductAttrConstraint> = {};

	public constructor( protected collectionName: string ) {}

	public test( attributeName: string, attributeValue: AttributeValueSingle, againstItem: ProductItem ): boolean | null {
		// TODO: Maybe throw exception instead of returning NULL?
		return this.findConditionsFor( attributeName, attributeValue )?.testOnItem( againstItem ) ?? null;
	}

	public findConditionsFor( attributeName: string, attributeValue: AttributeValueSingle ): ProductConditionBuilder | null {
		return this.constraints[ attributeName ]?.getConditionsFor( attributeValue ) ?? null;
	}

	public addConstraint( constraint: ProductAttrConstraint ): ProductAttrConstraint {
		if ( constraint.getAttributeName() in this.constraints ) {
			throw new Error( `Constraints for ${ constraint.getAttributeName() } already exists.` );
		}

		return this.constraints[ constraint.getAttributeName() ] = constraint;
	}

	public getConstraints(): Record<string, ProductAttrConstraint> {
		return this.constraints;
	}

	public getCollectionName(): string {
		return this.collectionName;
	}
}
