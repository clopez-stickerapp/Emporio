import { Attributes } from "./Attributes";
import { AttributeValueMulti, AttributeValue } from "./AttributeValue";
import { ProductAttrFilterMode } from "./ProductAttrFilterMode";
import { ProductAttributeFilter, TProductAttrMap, TProductAttrMapValue } from "./ProductAttrMap";

type Constraints = Record<string, string[]>;

export class ProductAttrConditionEvaluator
{
	public debugEnabled: boolean  = false;
	public debugList:    string[] = [];

	protected attributes:         TProductAttrMap             = {};
	protected ignoredConstraints: Constraints                 = {};
	protected debugConstraints:   Record<string, Constraints> = {};
	protected regex:              RegExp                      = /[$][{].*?[}]/g;
	protected logEnabled:         boolean                     = false;

	public reset( attributes: TProductAttrMap ): void
	{
		this.attributes = attributes;
	}

	public clearDebug(): void
	{
		this.debugList        = [];
		this.debugConstraints = {};
	}

	protected debug( result: string ): void
	{
		this.debugList.push( result );
	}

	protected debugConstraint( attributeName: string, attributeOption: string, reasonOfConstraint: string ): void
	{
		if ( this.debugEnabled )
		{
			if ( !this.debugConstraints.hasOwnProperty( attributeName ) )
			{
				this.debugConstraints[ attributeName ] = {};
			}
			if ( !this.debugConstraints[ attributeName ].hasOwnProperty( attributeOption ) )
			{
				this.debugConstraints[ attributeName ][ attributeOption ] = [];
			}
	
			this.debugConstraints[ attributeName ][ attributeOption ].push( reasonOfConstraint );
		}
	}

	public getDebugConstraints( attributeName: string, attributeOption: string ): string[] | null
	{
		if ( this.debugConstraints.hasOwnProperty( attributeName ) )
		{
			if ( this.debugConstraints[ attributeName ].hasOwnProperty( attributeOption ) )
			{
				return this.debugConstraints[ attributeName ][ attributeOption ];
			}
		}

		return null;
	}

	protected log( ...args: any[] ): void
	{
		if ( this.logEnabled )
		{
			console.log( ...args );
		}
	}

	public ignoreConstraintsFromTo( fromAttribute: string, toAttribute: string ): void
	{
		if ( !this.ignoredConstraints.hasOwnProperty( fromAttribute ) )
		{
			this.ignoredConstraints[ fromAttribute ] = [];
		}

		this.ignoredConstraints[ fromAttribute ].push( toAttribute );
	}

	public shouldIgnoreConstraints( fromAttribute: string, toAttribute: string ): boolean
	{
		if ( this.ignoredConstraints.hasOwnProperty( fromAttribute ) || this.ignoredConstraints.hasOwnProperty( "*" ) )
		{
			return this.ignoredConstraints[ fromAttribute ].indexOf( toAttribute ) >= 0 || this.ignoredConstraints[ fromAttribute ].indexOf( "*" ) >= 0;
		}

		return false;
	}

	public filter( productItemAsOneDimensionalObject: Attributes, attrName: string ): [ AttributeValueMulti, ProductAttributeFilter[] ]
	{
		const attr = this.getAttribute( attrName );

		let values:  AttributeValueMulti      = [];
		let filters: ProductAttributeFilter[] = [];
		
		if ( attr?.filters )
		{
			// 1. All filters that passes conditions
			filters = attr.filters.filter( attrFilter => this.evalCondition( attrFilter.conditions, productItemAsOneDimensionalObject ) );

			// 2. Sort them by complexity score, highest complexity score wins
			filters.sort( ( a, b ) => b.conditionsComplexityScore - a.conditionsComplexityScore );

			if ( filters.length )
			{
				switch ( attr.filterMode )
				{
					case ProductAttrFilterMode.MODE_MERGE_ALL_WINNERS:
						filters.forEach( filter => values = values.concat( filter.values ) );
						values = [ ...new Set( values ) ];
						break;

					default:
						let filter = filters[ 0 ];
						// console.log( "Winning filter for ", attrName, filter );
						values = filter.values;
						break;
				}

				if ( !attr.isDynamicValue )
				{
					// Removing invalid values
					values = values.filter( value => attr.valuesAndConstraints.hasOwnProperty( value.toString() ) );
				}
			}
		}

		return [ values, filters ];
	}

	/**
	 * Will test against constraints to see if a change is possible.
	 *
	 * @param productItemAsOneDimensionalObject
	 * @param attrNameToBeChanged
	 * @param attrValueToBeChanged
	 */
	public canIChangeAttribute( productItemAsOneDimensionalObject: Attributes, attrNameToBeChanged: string, attrValueToBeChanged: string ): boolean
	{
		// First we test if any of the current item values has any objections on changing this attr value
		if ( !this.doesCurrentItemAllowToChange( productItemAsOneDimensionalObject, attrNameToBeChanged, attrValueToBeChanged ) )
		{
			return false;
		}

		// If not we test the other way around: if the new value has any objections on the current attribute values
		return this.doesAttrValueAllowToBeCombinedWith( productItemAsOneDimensionalObject, attrNameToBeChanged, attrValueToBeChanged );
	}

	public doesAttrValueAllowToBeCombinedWith( productItemAsOneDimensionalObject: Attributes, attrNameToBeChanged: string, attrValueToBeChanged: string ): boolean
	{
		const condition = this.getConstraintsFor( attrNameToBeChanged, attrValueToBeChanged );

		if ( condition )
		{
			let result: boolean = true;
			
			const conditionedColumnNames = condition.match( this.regex );
			
			if ( conditionedColumnNames )
			{
				conditionedColumnNames.forEach( conditionColumnNameAsCode => {
				
					const conditionedColumnName = this.extractConditionedColumnName( conditionColumnNameAsCode );

					if ( conditionedColumnName && result )
					{
						result = this.evalConditionAgainstChangeRequest( condition, productItemAsOneDimensionalObject, conditionedColumnName, productItemAsOneDimensionalObject[ conditionedColumnName ] );
					}

				} );

				if ( !result && this.debugEnabled )
				{
					let debugMsg: string = "Blocked by ";
					let debugValues: string[] = [];

					conditionedColumnNames.forEach( conditionColumnNameAsCode => {

						const conditionedColumnName = this.extractConditionedColumnName( conditionColumnNameAsCode );

						if ( conditionedColumnName ) 
						{
							const conditionedColumnNiceName = conditionedColumnName.replace( "item.attributes.", "" );
							debugValues.push( `'${ conditionedColumnNiceName }' (${ productItemAsOneDimensionalObject[ conditionedColumnName ] })` );
						}

					} );

					debugValues = [ ...new Set( debugValues ) ];

					if ( debugValues.length > 1 )
					{
						debugMsg += "any of these: ";
					}
					
					debugMsg += debugValues.join( ", " );
					this.debugConstraint( attrNameToBeChanged, attrValueToBeChanged, debugMsg );
					this.debug( debugMsg );
				}
			}

			return result;
		}

		return true;
	}

	public doesCurrentItemAllowToChange( productItemAsOneDimensionalObject: Attributes, attrNameToBeChanged: string, attrValueToBeChanged: string ): boolean
	{
		for ( const columnName in productItemAsOneDimensionalObject )
		{
			const attrName = columnName.indexOf( "item.attributes." ) >= 0 ? columnName.replace( "item.attributes.", "" ) : false;

			if ( attrName && attrName != attrNameToBeChanged )
			{
				if( !this.shouldIgnoreConstraints( attrName, attrNameToBeChanged ) )
				{
					const attr = this.getAttribute( attrName );

					if ( attr )
					{
						let allValues = productItemAsOneDimensionalObject[ columnName ];
						
						if( !Array.isArray( allValues ) )
						{
							allValues = [ allValues ];
						}

						for ( const attrValueIndex in allValues )
						{
							const attrValue = allValues[ attrValueIndex ];
							const condition = this.getConstraintsFor( attrName, `${ attrValue }` );

							if ( condition )
							{
								const result = this.evalConditionAgainstChangeRequest( condition, productItemAsOneDimensionalObject, "item.attributes." + attrNameToBeChanged, attrValueToBeChanged );
								
								if ( !result )
								{
									const debug = `'${ attrValue } ${ attrName }' doesn't allow '${ attrNameToBeChanged }' to be changed to '${ attrValueToBeChanged }'.`;
									this.debugConstraint( attrNameToBeChanged, attrValueToBeChanged, `Blocked by '${ attrName }' (${ attrValue })` );
									this.log( debug, attr, condition );
									this.debug( debug );
									return result;
								}
								else
								{
									this.log( `'${ attr }:${ attrValue }'`, true );
								}
							}
						}
					}
				}
			}
		}

		return true;
	}

	protected evalConditionAgainstChangeRequest( condition: string, productItemAsOneDimensionalObject: Attributes, columnNameToBeChanged: string, columnValueToBeChanged: AttributeValue ): boolean
	{
		let result: boolean = true;
		
		// Does this condition care about the attr that we're testing?
		if ( condition.indexOf( "${" + columnNameToBeChanged + "}" ) >= 0 )
		{
			let replacedValues: Attributes = {};

			const conditionedColumnNames = condition.match( this.regex )
			
			if ( conditionedColumnNames )
			{
				conditionedColumnNames.forEach( conditionColumnNameAsCode => {

					const columnName = this.extractConditionedColumnName( conditionColumnNameAsCode );
					
					if ( columnName == columnNameToBeChanged )
					{
						condition                                  = condition.replace( conditionColumnNameAsCode, "columnValueToBeChanged" );
						replacedValues[ 'columnValueToBeChanged' ] = columnValueToBeChanged;
					}
					else
					{
						condition                                                                 = condition.replace( conditionColumnNameAsCode, "productItemAsOneDimensionalObject['" + columnName + "']" );
						replacedValues[ 'productItemAsOneDimensionalObject[' + columnName + ']' ] = productItemAsOneDimensionalObject[ columnName as string ];
					}

				} );
			}

			try
			{
				this.log( "testConditionAgainstChangeRequest:", condition, replacedValues );
				result = eval( condition );
			}
			catch ( e ) {}
		}

		return result;
	}

	protected evalCondition( condition: string, productItemAsOneDimensionalObject: Attributes ): boolean
	{
		let result: boolean = true;

		if ( condition && condition.length )
		{
			// Does this condition care about the attr that we're testing?
			const replacedValues: Attributes = {};
			const conditionedColumnNames = condition.match( this.regex );
			
			if ( conditionedColumnNames )
			{
				conditionedColumnNames.forEach( conditionColumnNameAsCode => {

					const columnName = this.extractConditionedColumnName( conditionColumnNameAsCode );

					condition                                                                 = condition.replace( conditionColumnNameAsCode, "productItemAsOneDimensionalObject['" + columnName + "']" );
					replacedValues[ 'productItemAsOneDimensionalObject[' + columnName + ']' ] = productItemAsOneDimensionalObject[ columnName as string ];

				} );
			}

			try
			{
				this.log( "simpleConditionTest:", condition, replacedValues );
				result = eval( condition );
			}
			catch ( e ) {}
		}

		return result;
	}

	protected isNotIn( columnValue: string[] | string, conditionValue: string[] | string ): boolean
	{
		if( !columnValue )
		{
			return true;
		}

		if( Array.isArray( columnValue ) && !Array.isArray( conditionValue ) )
		{
			return columnValue.indexOf( conditionValue ) < 0;
		}
		else if( !Array.isArray( columnValue ) && Array.isArray( conditionValue ) )
		{
			return conditionValue.indexOf( columnValue ) < 0;
		}
		else if( Array.isArray( columnValue ) && Array.isArray( conditionValue ) )
		{
			return conditionValue.filter( value => columnValue.indexOf( value ) >= 0 ).length == 0;
		}
		else if( !Array.isArray( columnValue ) && !Array.isArray( conditionValue ) )
		{
			return columnValue != conditionValue;
		}

		return false;
	}

	protected isIn( columnValue: string[] | string, conditionValue: string[] | string ): boolean
	{
		if( !columnValue )
		{
			return false;
		}

		if( Array.isArray( columnValue ) && !Array.isArray( conditionValue ) )
		{
			return columnValue.indexOf( conditionValue ) >= 0;
		}
		else if( !Array.isArray( columnValue ) && Array.isArray( conditionValue ) )
		{
			return conditionValue.indexOf( columnValue ) >= 0;
		}
		else if( Array.isArray( columnValue ) && Array.isArray( conditionValue ) )
		{
			return conditionValue.filter( value => columnValue.indexOf( value ) >= 0 ).length > 0;
		}
		else if( !Array.isArray( columnValue ) && !Array.isArray( conditionValue ) )
		{
			return columnValue == conditionValue;
		}

		return false;
	}

	protected extractConditionedColumnName( condition: string ): string | null
	{
		let conditionedKey = condition.match( this.regex )?.pop();

		if ( conditionedKey )
		{
			return conditionedKey.replace( "$", "" ).replace( "{", "" ).replace( "}", "" );
		}

		return null;
	}

	/* SET AND GET */
	public getConstraintsFor( attributeName: string, attributeValue: string ): string | null
	{
		const attr = this.getAttribute( attributeName );
		
		if ( attr )
		{
			if( attr.valuesAndConstraints.hasOwnProperty( attributeValue ) )
			{
				return attr.valuesAndConstraints[ attributeValue ];
			}
		}
		
		return null;
	}

	public getAttribute( attributeName: string ): TProductAttrMapValue | null
	{
		if( this.attributes.hasOwnProperty( attributeName ) )
		{
			return this.attributes[ attributeName ];
		}

		return null;
	}
}
