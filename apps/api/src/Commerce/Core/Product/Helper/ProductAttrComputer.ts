import { AttributeValue, AttributeValueMulti, AttributeValueSingle } from "../../../../Helper/Condition/AttributeValue";
import { Attributes } from "../../../../Helper/Condition/Attributes";
import { ProductAttrValueType } from "../Attribute/ProductAttrValueType";
import { ProductItem } from "../Item/ProductItem";
import { ProductAttrConditionEvaluator } from "./ProductAttrConditionEvaluator";
import { TProductAttrMap } from "./ProductAttrMap";

export class ProductAttrComputer
{
	protected attributes:               TProductAttrMap                 = {};
	protected attributesOutOfStock:     Attributes<string[]>            = {};
	protected attributesFiltersMatched: Attributes<number>              = {};
	protected attributesPreferred:      Attributes                      = {};
	protected attributesConstrained:    Attributes<AttributeValueMulti> = {};
	protected attributesSuggested:      Attributes<AttributeValueMulti> = {};
	protected attributesFiltered:       Attributes<AttributeValueMulti> = {};
	public useFilters:                  boolean                         = true;

	constructor( public attrEvaluator: ProductAttrConditionEvaluator ) {}

	/**
	 * Resets old and feeds new attributes to the computer.
	 * 
	 * @param attributes The new attributes to be set.
	 */
	public reset( attributes: TProductAttrMap ): void 
	{
		this.attributes = attributes;
	}

	/**
	 * Evaluates filtered, constrained, suggested and out-of-stock values. 
	 * 
	 * @param productItem 
	 */
	public evaluate( productItem: ProductItem ): void 
	{
		this.evaluateFilteredValues( productItem );
		this.evaluateConstrainedValues( productItem );
		this.evaluateSuggestedValues();
		this.evaluateOutOfStockValues();
	}

	protected evaluateFilteredValues( productItem: ProductItem ): void 
	{
		this.attributesFiltered = {};
		this.attributesFiltersMatched = {};

		for ( const attributeName in this.attributes )
		{
			const [ attrValues, filters ] = this.attrEvaluator.filter( productItem.toTestableOneDimensionalArray(), attributeName );
			
			this.attributesFiltered[ attributeName ] = attrValues;
			
			this.attributesFiltersMatched[ attributeName ] = filters.length;
		}
	}

	protected evaluateConstrainedValues( productItem: ProductItem ): void
	{
		this.attrEvaluator.clearDebug();

		this.attributesConstrained = {};

		for ( const attributeName in this.attributes )
		{
			this.attributesConstrained[ attributeName ] = [];

			for ( const attributeValue of this.getAllValues( attributeName ) )
			{
				const result = this.attrEvaluator.canIChangeAttribute( productItem.toTestableOneDimensionalArray(), attributeName, String( attributeValue ) );
				
				if ( !result )
				{
					this.attributesConstrained[ attributeName ].push( attributeValue );
				}
			}
		}
	}

	protected evaluateSuggestedValues(): void
	{
		this.attributesSuggested = {};

		for ( const attributeName in this.attributes ) 
		{
			let values = this.getFilteredValues( attributeName );

			if ( !this.useFilters || !values.length )
			{
				values = this.getAllValues( attributeName );
			}

			let preferredValue = this.getPreferredValue( attributeName );

			if ( preferredValue !== null ) 
			{
				if ( !Array.isArray( preferredValue ) )
				{
					preferredValue = [ preferredValue ];
				}

				preferredValue = preferredValue.filter( value => !this.isConstrained( attributeName, value ) && this.canValueBe( attributeName, value ) && values.indexOf( value ) < 0 );
				
				values = values.concat( preferredValue );
			}

			this.attributesSuggested[ attributeName ] = values;
		}
	}

	protected evaluateOutOfStockValues(): void
	{
		this.attributesOutOfStock = {};

		for ( const attributeName in this.attributes )
		{
			const values = this.attributes[ attributeName ].outOfStockValues;

			if ( values.length )
			{
				this.attributesOutOfStock[ attributeName ] = values;
			}
		}
	}

	/**
	 * Determines whether the value is suggested and not constrained.
	 * 
	 * @param attributeName The name of the attribute.
	 * @param attributeValue The value of the attribute.
	 */
	public isAvailable( attributeName: string, attributeValue: AttributeValueSingle ): boolean 
	{
		return !this.isConstrained( attributeName, attributeValue ) && ( this.isInSuggestedValues( attributeName, attributeValue ) || this.isDynamicValue( attributeName ) );
	}

	/**
	 * Gets the first suggested value that isn't constrained.
	 * 
	 * @param attributeName The name of the attribute.
	 */
	public getDefaultValue<T extends AttributeValueSingle | []>( attributeName: string ): T | null
	{
		if ( this.isMultiValue( attributeName ) ) 
		{
			return [] as T;
		}

		return ( this.getSuggestedValues( attributeName ).find( value => !this.isConstrained( attributeName, value ) ) ?? null ) as T;
	}

	/**
	 * Retrieves all values related to the attribute.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns An array of all values related to the attribute.
	 */
	public getAllValues<T extends AttributeValueSingle>( attributeName: string ): T[] 
	{
		if ( this.isSupported( attributeName ) ) 
		{
			const attrValuesRaw = Object.keys( this.attributes[ attributeName ].valuesAndConstraints );

			return attrValuesRaw.map( attrValueRaw => this.parseAttributeValue( attributeName, attrValueRaw ) ?? attrValueRaw as T );
		}

		return [];
	}

	/**
	 * Iterates through suggested values and returns the highest non-constrained number.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns A non-constrained number if found, null otherwise.
	 */
	public getHighestAvailableValue( attributeName: string ): number | null
	{
		const values = this.getSuggestedValues( attributeName ).filter( value => !this.isConstrained( attributeName, value ) );

		const highestValue = Math.max( ...values.map( value => parseFloat( String( value ) ) ) );

		return isNaN( highestValue ) ? null : highestValue;
	}

	/**
	 * Iterates through suggested values and returns the lowest non-constrained number.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns A non-constrained number if found, null otherwise.
	 */
	public getLowestAvailableValue( attributeName: string ): number | null
	{
		const values = this.getSuggestedValues( attributeName ).filter( value => !this.isConstrained( attributeName, value ) );

		const lowestValue = Math.min( ...values.map( value => parseFloat( String( value ) ) ) );

		return isNaN( lowestValue ) ? null : lowestValue;
	}

	/**
	 * Suggested values are filtered values, but if filtered values are empty or useFilters is set to false, it will fallback to all values.
	 * 
	 * OBS! Can contain constrained values.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns An array of suggested values.
	 */
	public getSuggestedValues<T extends AttributeValueSingle>( attributeName: string ): T[]
	{
		if ( this.attributesSuggested.hasOwnProperty( attributeName ) )
		{
			return this.attributesSuggested[ attributeName ] as T[];
		}

		return [];
	}

	/**
	 * Retrieves filtered values.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns An array of filtered values.
	 */
	public getFilteredValues<T extends AttributeValueSingle>( attributeName: string ): T[]
	{
		if ( this.attributesFiltered.hasOwnProperty( attributeName ) )
		{
			return this.attributesFiltered[ attributeName ] as T[];
		}

		return [];
	}

	/**
	 * Determines whether the attribute has been filtered.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute has been filtered, false otherwise.
	 */
	public hasBeenFiltered( attributeName: string ): boolean
	{
		if ( this.attributesFiltersMatched.hasOwnProperty( attributeName ) )
		{
			return this.attributesFiltersMatched[ attributeName ] > 0;
		}

		return false;
	}

	public hasPreferredValue( attributeName: string ): boolean
	{
		return this.attributesPreferred.hasOwnProperty( attributeName );
	}

	public removePreferredValue( attributeName: string, attributeValue: AttributeValueSingle ): void
	{
		const preferredValue = this.getPreferredValue( attributeName );

		if ( this.isMultiValue( attributeName ) && Array.isArray( preferredValue ) )
		{
			this.setPreferredValue( attributeName, preferredValue.filter( value => value != attributeValue ) );
		}
		else
		{
			delete this.attributesPreferred[ attributeName ];
		}
	}

	public getPreferredValue<T extends AttributeValue>( attributeName: string ): T | null
	{
		if ( this.hasPreferredValue( attributeName ) )
		{
			return this.attributesPreferred[ attributeName ] as T;
		}

		return null;
	}

	/**
	 * Sets a preferred value. Will be available as a suggested value if not constrained. 
	 * 
	 * @param attributeName The name of the attribute.
	 * @param attributeValue The value of the attribute.
	 * @returns void
	 */
	public setPreferredValue( attributeName: string, attributeValue: AttributeValue ): void
	{
		this.attributesPreferred[ attributeName ] = attributeValue;
	}

	/**
	 * Retrieves constrained values related to an attribute.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns An array of constrained values.
	 */
	public getConstrainedValues<T extends AttributeValueSingle>( attributeName: string ): T[]
	{
		if ( this.attributesConstrained.hasOwnProperty( attributeName ) )
		{
			return this.attributesConstrained[ attributeName ] as T[];
		}

		return [];
	}

	public getOutOfStockValues( attributeName: string ): string[]
	{
		if ( this.attributesOutOfStock.hasOwnProperty( attributeName ) )
		{
			return this.attributesOutOfStock[ attributeName ];
		}

		return [];
	}

	public getIcons( attributeName: string ): Record<string, string>
	{
		return this.attributes[ attributeName ]?.icons ?? {};
	}

	/**
	 * Determines whether the attribute is supported.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute is supported, false otherwise.
	 */
	public isSupported( attributeName: string ): boolean
	{
		return this.attributes.hasOwnProperty( attributeName );
	}

	/**
	 * Determines whether the attribute is required.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute is required, false otherwise.
	 */
	public isRequired( attributeName: string ): boolean
	{
		return this.isSupported( attributeName ) && this.attributes[ attributeName ]?.isRequired;
	}

	/**
	 * Determines whether the attribute supports multiple values.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute supports multiple values, false otherwise.
	 */
	public isMultiValue( attributeName: string ): boolean
	{
		return this.isSupported( attributeName ) && this.attributes[ attributeName ]?.isMultiValue;
	}

	/**
	 * Determines whether the attribute is a dynamic value.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute is a dynamic value, false otherwise.
	 */
	public isDynamicValue( attributeName: string ): boolean
	{
		return this.isSupported( attributeName ) && this.attributes[ attributeName ]?.isDynamicValue;
	}

	/**
	 * Determines whether the attribute is of type boolean.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute is of type boolean, false otherwise.
	 */
	public isBooleanType( attributeName: string ): boolean
	{
		return this.attributes[ attributeName ]?.valueType == ProductAttrValueType.BOOL;
	}

	/**
	 * Determines whether the attribute is of type integer.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute is of type integer, false otherwise.
	 */
	public isIntType( attributeName: string ): boolean
	{
		return this.attributes[ attributeName ]?.valueType == ProductAttrValueType.INT;
	}

	/**
	 * Determines whether the attribute is of type float.
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute is of type float, false otherwise.
	 */
	public isFloatType( attributeName: string ): boolean
	{
		return this.attributes[ attributeName ]?.valueType == ProductAttrValueType.FLOAT;
	}

	public isStringType( attributeName: string ): boolean
	{
		return this.attributes[ attributeName ]?.valueType == ProductAttrValueType.STRING;
	}

	/**
	 * Determines whether the attribute is of type number (float or integer).
	 * 
	 * @param attributeName The name of the attribute.
	 * @returns True if the attribute is of type number, false otherwise.
	 */
	public isNumberType( attributeName: string ): boolean
	{
		return this.isIntType( attributeName ) || this.isFloatType( attributeName );
	}

	/**
	 * Checks if a given attribute value is present in the list of filtered values for a specified attribute.
	 * 
	 * @param attributeName The name of the attribute.
	 * @param attributeValue The value of the attribute.
	 * @returns True if the attribute value is in the list of filtered values for the specified attribute, false otherwise.
	 */
	public isInFilteredValues( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		return this.getFilteredValues( attributeName ).includes( attributeValue );
	}

	/**
	 * Checks if a given attribute value is present in the list of suggested values for a specified attribute.
	 * 
	 * @param attributeName The name of the attribute.
	 * @param attributeValue The value of the attribute.
	 * @returns True if the attribute value is in the list of suggested values for the specified attribute, false otherwise.
	 */
	public isInSuggestedValues( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		return this.getSuggestedValues( attributeName ).includes( attributeValue );
	}

	/**
	 * Checks if a given attribute value is present in the list of constrained values for a specified attribute.
	 * 
	 * @param attributeName The name of the attribute.
	 * @param attributeValue The value of the attribute.
	 * @returns True if the attribute value is in the list of constrained values for the specified attribute, false otherwise.
	 */
	public isConstrained( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		return this.getConstrainedValues( attributeName ).includes( attributeValue );
	}

	public isInOutOfStockValues( attributeName: string, attributeValue: string ): boolean
	{
		return this.getOutOfStockValues( attributeName ).includes( attributeValue );
	}

	public canValueBe( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		if ( !this.isDynamicValue( attributeName ) ) 
		{
			return this.attributes[ attributeName ]?.valuesAndConstraints.hasOwnProperty( attributeValue.toString() );
		}

		return true;
	}

	/**
	 * Parses a raw attribute value to its correct type.
	 * 
	 * @param attributeName The name of the attribute.
	 * @param attributeValueRaw The raw attribute value.
	 * @returns The parsed attribute value on succes, null on failure.
	 */
	public parseAttributeValue<T extends AttributeValueSingle>( attributeName: string, attributeValueRaw: any ): T | null
	{
		if ( this.isStringType( attributeName ) )
		{
			return String( attributeValueRaw ) as T;
		}
		else if ( this.isBooleanType( attributeName ) ) 
		{
			try
			{
				const value = JSON.parse( attributeValueRaw );

				if ( typeof value === 'boolean' )
				{
					return value as T;
				}
			}
			catch ( e ) {}
		}
		else if ( this.isIntType( attributeName ) )
		{
			return parseInt( attributeValueRaw ) as T;
		}
		else if ( this.isFloatType( attributeName ) )
		{
			return parseFloat( attributeValueRaw ) as T;
		}

		return null;
	}

	/* SET AND GET */
	public get debugList(): string[]
	{
		return this.attrEvaluator.debugList;
	}

	public set debugEnabled( value: boolean )
	{
		this.attrEvaluator.debugEnabled = value;
	}

	public get debugEnabled(): boolean
	{
		return this.attrEvaluator.debugEnabled;
	}
}
