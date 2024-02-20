import { ProductConditionBuilder } from "../../Condition/ProductConditionBuilder";
import { ProductItem } from "../../Item/ProductItem";
import { ProductAttrConstraint } from "./ProductAttrConstraint";

export class ProductAttrContraintCollection {
	protected constraints: Record<string, ProductAttrConstraint> = {};

	public constructor( protected collectionName: string ) {}

	public test( attributeName: string, attributeValue: string | number | boolean, againstItem: ProductItem ): boolean | null {
		// TODO: Maybe throw exception instead of returning NULL?
		return this.findConditionsFor( attributeName, attributeValue )?.testOnItem( againstItem ) ?? null;
	}

	public findConditionsFor( attributeName: string, attributeValue: string | number | boolean ): ProductConditionBuilder | null {
		return this.constraints[ attributeName ]?.getConditionsFor( attributeValue ) ?? null;
	}

	public addConstraint( constraint: ProductAttrConstraint ): ProductAttrConstraint {
		if ( constraint.attributeName in this.constraints ) {
			throw new Error( `Constraints for ${ constraint.attributeName } already exists.` );
		}

		return this.constraints[ constraint.attributeName ] = constraint;
	}

	public getConstraints(): Record<string, ProductAttrConstraint> {
		return this.constraints;
	}

	public getCollectionName(): string {
		return this.collectionName;
	}
}
