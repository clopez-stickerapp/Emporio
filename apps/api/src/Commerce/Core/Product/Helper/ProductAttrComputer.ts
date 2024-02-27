import { AttributeValueMulti, AttributeValueSingle } from "../../../../Helper/Condition/AttributeValue";
import { ProductService } from "../../ProductService";
import { ProductAttrFilterMode } from "../Attribute/Filter/ProductAttrFilterMode";
import { ProductAttrFilteredValues } from "../Attribute/Filter/ProductAttrFilteredValues";
import { ProductItem } from "../Item/ProductItem";
import { Product } from "../Product";

export class ProductAttrComputer {
	/**
	 * TODO: IT IS IMPORTANT THAT THIS HELPER REPLICATES EXACT SAME BEHAVIOUR AS ProductAttrComputer.ts
	 *
	 * Until we move the whole ProductService to a Node server where backend and frontend can share same logic.
	 */
	public constructor( private ps: ProductService, public useFilters: boolean = true ) {}

	public getProduct( productItem: ProductItem ): Product {
		return this.ps.findProduct( productItem.getProductFamilyName(), productItem.getProductName() );
	}

	public canHaveAttribute( productItem: ProductItem, attributeName: string ): boolean {
		return this.getProduct( productItem ).canHaveAttr( attributeName );
	}

	/**
	 * Checks if an attribute alias has a recommended value by the product.
	 * Will also return true if the attribute itself is required by the family.
	 */
	public hasProductRecommendedValuesFor( productItem: ProductItem, attributeName: string ): boolean {
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		
		if ( productFamily.isRequired( attributeName ) ) {
			return true;
		} else if ( productFamily.isSupported( attributeName ) ) {
			return this.getProduct( productItem ).isAttrRecommendedFor( attributeName );
		}

		return false;
	}

	/**
	 * Checks if an attribute alias has a required value by the product.
	 * Will also return true if the attribute is required by the family.
	 */
	public isAttrRequired( productItem: ProductItem, attributeName: string ): boolean {
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		
		if ( productFamily.isRequired( attributeName ) ) {
			return true;
		} else if ( productFamily.isSupported( attributeName ) ) {
			return this.getProduct( productItem ).isAttrStrictlyRequiredFor( attributeName );
		}

		return false;
	}

	public getAllValues( attrUID: string ): AttributeValueSingle[] {
		return this.ps.retrieveAttribute( attrUID ).getValues().map( attrValue => attrValue.getValue() );
	}

	public getDefaultAttrValueOptionsForProduct( product: Product, attrAlias: string ): Record<string, AttributeValueSingle> {
		const attrValues: Record<string, AttributeValueSingle> = {};
		const attrUID = product.getProductFamily().findAttrUIDByAlias( attrAlias );
		const attr = product.getProductService().retrieveAttribute( attrUID );
		let withAttrValues = product.getAttrValue( attrAlias ) ? product.getAttrValue( attrAlias ) : [];

		if ( !Array.isArray( withAttrValues ) ) {
			withAttrValues = [ withAttrValues ]
		}

		for ( const attrRawValue of withAttrValues ) {
			if ( attr.isDynamicValue() ) {
				attrValues[ attrRawValue.toString() ] = attrRawValue;
			} else {
				const attrValue = this.ps.findAttributeValue( attrUID, attrRawValue );
				if ( attrValue ) {
					attrValues[ attrValue.getValue().toString() ] = attrValue.getValue();
				}
			}
		}

		return attrValues;
	}

	public getAllAttrValueOptionsForProduct( product: Product, attrAlias: string ): AttributeValueMulti {
		const attrUID = product.getProductFamily().findAttrUIDByAlias( attrAlias );
		const attrValues = this.getDefaultAttrValueOptionsForProduct( product, attrAlias );

		if ( !product.isAttrStrictlyRequiredFor( attrAlias ) ) {
			for ( const attrValue of this.ps.retrieveAttribute( attrUID ).getValues() ) {
				let valueAsIndexable = attrValue.getValue().toString();
				if ( !( valueAsIndexable in attrValues ) ) {
					attrValues[ valueAsIndexable ] = attrValue.getValue();
				}
			}
		}

		return Object.values( attrValues );
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 */
	public getDefaultValue( productItem: ProductItem, attributeName: string ): AttributeValueSingle | null {
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		const attrUID = productFamily.findAttrUIDByAlias( attributeName );
		const attr = this.ps.retrieveAttribute( attrUID );

		if ( attr && productFamily ) {
			let values = this.getSuggestedValues( productItem,  attributeName );
			values = this.removeConstrainedValues( productItem, attributeName, values );
			return values.shift() ?? null;
		}

		return null;
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 */
	public getLowestAvailableValue( productItem: ProductItem, attributeName: string ): number | null {
		// TODO: return number only?
		let values = this.getSuggestedValues( productItem, attributeName );
		values = this.removeConstrainedValues( productItem, attributeName, values );
		return values.length ? Math.min( ...values.map( value => parseInt( String( value ) ) ) ) : null;
		
		// let lowestValue: number | null = null;

		// if ( values.length ) {
		// 	for ( const value of values ) {
		// 		let valueAsInt = parseInt( String( value ) );
		// 		if ( lowestValue === null || valueAsInt < lowestValue ) {
		// 			lowestValue = valueAsInt;
		// 		}
		// 	}
		// }

		// return lowestValue;
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 */
	public getHighestAvailableValue( productItem: ProductItem, attributeName: string ): number | null {
		// TODO: return number only?
		let values = this.getSuggestedValues( productItem, attributeName );
		values = this.removeConstrainedValues( productItem, attributeName, values );
		return values.length ? Math.max( ...values.map( value => parseInt( String( value ) ) ) ) : null;

		// let highestValue: number | null = null;
		
		// if ( values.length ) {
		// 	for ( const value of values ) {
		// 		let valueAsInt = parseInt( String( value ) );
		// 		if ( highestValue === null || valueAsInt > highestValue ) {
		// 			highestValue = valueAsInt;
		// 		}
		// 	}
		// }

		// return highestValue;
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 * 
	 * Suggested values are filtered values, but if filtered values are empty
	 * it will fallback to all non constrained values.
	 */
	public getSuggestedValues( productItem: ProductItem, attributeName: string ): AttributeValueMulti {
		// Will throw errors
		const values = this.getFilteredValues( productItem, attributeName );

		// Fallback to all values if filter didn't result in any
		return values.length ? values : this.getAllAttrValueOptionsForProduct( this.getProduct( productItem ), attributeName );
	}

	/**
	 * WARNING! This needs to be on pair with ProductAttrComputer.ts
	 */
	public getFilteredValues( productItem: ProductItem, attributeAlias: string ): AttributeValueMulti {
		if ( !this.useFilters ) {
			return [];
		}

		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		const filter = productFamily.getFilterCollection()?.getFilterFor( attributeAlias );
		
		if ( filter ) {
			let successfulFilters: Record<string, ProductAttrFilteredValues> = {};

			for ( const productAttrFilteredValues of filter.getAllFilters() ) {
				try {
					if ( productAttrFilteredValues.conditionBuilder.testOnItem( productItem ) ) {
						let complexityScore = productAttrFilteredValues.conditionBuilder.calculateComplexityScore();
					
						while ( complexityScore in successfulFilters ) {
							complexityScore++;
						}

						successfulFilters[ complexityScore ] = productAttrFilteredValues;
					}
				} catch ( error ) {
					// Do nothing about this
				}
			}

			if ( Object.values( successfulFilters ).length ) {
				switch ( filter.mode ) {
					case ProductAttrFilterMode.MODE_MERGE_ALL_WINNERS:
						const result: AttributeValueMulti = Object.values( successfulFilters ).flatMap( filter => filter.getValues() );

						return this.removeInvalidValues( productItem, attributeAlias, [ ...new Set( result ) ] );
					
					case ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS:
					default:

						// krsort($successfulFilters, SORT_NUMERIC);
						// /** @var ProductAttrFilteredValues $winner */
						// winner = array_shift(successfulFilters);

						const winner = Object.entries( successfulFilters ).sort( ( [ cs1 ], [ cs2 ] ) => Number( cs2 ) - Number( cs1 ) )[ 0 ][ 1 ];

						return this.removeInvalidValues( productItem, attributeAlias, winner.getValues() );
				}
			}
		}

		return [];
	}

	public getConstrainedValues( productItem: ProductItem, attributeName: string ): AttributeValueMulti {
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		const attrUID = productFamily.findAttrUIDByAlias( attributeName );

		let values: AttributeValueMulti = [];
		const constraintCollection = productFamily.getConstraintsCollection();
		
		if ( constraintCollection ) {
			for ( const value of this.ps.retrieveAttribute( attrUID ).getValues() ) {
				try {
					let result = constraintCollection.test( attributeName, value.getValue(), productItem );
					if ( result === false ) {
						values.push( value.getValue() );
					}
				}
				catch ( error ) {
					// Do nothing about this error
				}
			}
		}

		return values;
	}

	public getOutOfStockValues( productItem: ProductItem, attributeName: string ): string[] {
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		const outOfStockCollection = productFamily.getStockCollection();
		return outOfStockCollection?.getOutOfStockFor( attributeName )?.getOutOfStock() ?? [];
	}

	/**
	 * Removes values that aren't registered in that attribute (or aren't matching product description)
	 * unless the attribute is marked as "dynamic value" which can have
	 * basically what ever value as long as value type is matching.
	 */
	public removeInvalidValues( productItem: ProductItem, attributeAlias: string, values: AttributeValueMulti ): AttributeValueMulti {
		// TODO: Check for type as well?
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		const attrUID = productFamily.findAttrUIDByAlias( attributeAlias );
		const attr = this.ps.retrieveAttribute( attrUID );
		
		if ( !attr.isDynamicValue() ) {
			const allValueOptions = this.getAllAttrValueOptionsForProduct( this.getProduct( productItem ), attributeAlias );
			return values.filter( ( attrValue ) => allValueOptions.includes( attrValue ) ); // return array_filter($values, fn ($v, $k) => in_array($v, $allValueOptions), ARRAY_FILTER_USE_BOTH);
		}

		return values;
	}

	public removeConstrainedValues( productItem: ProductItem, attributeName: string, values: AttributeValueMulti ): AttributeValueMulti {
		const constrainedValues = this.getConstrainedValues( productItem, attributeName );

		return values.filter( attrValue => !constrainedValues.includes( attrValue ) ); // return array_diff( $values, this.getConstrainedValues( productItem, attributeName ) );
	}

	public isConstrained( productItem: ProductItem, attributeName: string, value: AttributeValueSingle ): boolean {
		return this.getConstrainedValues( productItem, attributeName ).includes( value );
	}

	public isOutOfStock( productItem: ProductItem, attributeName: string, value: string ): boolean {
		return this.getOutOfStockValues( productItem, attributeName ).includes( value );
	}

	public isAvailable( productItem: ProductItem, attributeName: string, value: AttributeValueSingle ): boolean {
		return !this.isConstrained( productItem, attributeName, value ) && ( this.isDynamicValue( productItem, attributeName ) || this.isInSuggestedValues( productItem, attributeName, value ) );
	}

	public isUnavailable( productItem: ProductItem, attributeName: string, value: AttributeValueSingle ): boolean {
		return !this.isAvailable( productItem, attributeName, value );
	}

	public isDynamicValue( productItem: ProductItem, attributeName: string ): boolean {
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		const attrUID = productFamily.findAttrUIDByAlias( attributeName );

		return this.ps.retrieveAttribute( attrUID ).isDynamicValue();
	}

	public isMultiValue( productItem: ProductItem, attributeName: string ): boolean {
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		const attrUID = productFamily.findAttrUIDByAlias( attributeName );

		return this.ps.retrieveAttribute( attrUID ).isMultiValue();
	}

	public isInSuggestedValues( productItem: ProductItem, attributeName: string, value: AttributeValueSingle ): boolean {
		return this.getSuggestedValues( productItem, attributeName ).includes( value );
	}

	public isInFilteredValues( productItem: ProductItem, attributeName: string, value: AttributeValueSingle ): boolean {
		return this.getFilteredValues( productItem, attributeName ).includes( value );
	}
}
