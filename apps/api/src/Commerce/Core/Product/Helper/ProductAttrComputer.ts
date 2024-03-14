import { AttributeValue, AttributeValueMulti, AttributeValueSingle } from "../../../../Helper/Condition/AttributeValue";
import { Attributes } from "../../../../Helper/Condition/Attributes";
import { ProductAttrValueType } from "../Attribute/ProductAttrValueType";
import { ProductItem } from "../Item/ProductItem";
import { ProductAttrConditionEvaluator } from "./ProductAttrConditionEvaluator";
import { ProductAttributeMap } from "./ProductAttrMap";

export class ProductAttrComputer
{
	protected attributes:               Record<string, ProductAttributeMap> = {};
	protected attributesOutOfStock:     Attributes<string[]>                = {};
	protected attributesFiltersMatched: Attributes<number>                  = {};
	protected attributesPreferred:      Attributes                          = {};
	protected attributesConstrained:    Attributes<AttributeValueMulti>     = {};
	protected attributesSuggested:      Attributes<AttributeValueMulti>     = {};
	protected attributesFiltered:       Attributes<AttributeValueMulti>     = {};

	constructor( public attrEvaluator: ProductAttrConditionEvaluator, public useFilters: boolean = true ) {}

	/**
	 * Resets old and feeds new attributes to the computer.
	 * 
	 * @param attributes The new attributes to be set.
	 */
	public reset( attributes: Record<string, ProductAttributeMap> ): void 
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
			this.attributesFiltered[ attributeName ] = this.attrEvaluator.filter( productItem.toTestableOneDimensionalArray(), attributeName, ( values, filtersMatched ) => {

				this.attributesFiltersMatched[ attributeName ] = filtersMatched.length;

				return values;
				
			} );
		}
	}

	protected evaluateConstrainedValues( productItem: ProductItem ): void
	{
		this.attrEvaluator.clearDebug();

		this.attributesConstrained = {};

		for ( const attributeName in this.attributes )
		{
			const attr = this.attributes[ attributeName ];

			this.attributesConstrained[ attributeName ] = [];

			for ( const attributeValue in attr.valuesAndConstraints )
			{
				const result = this.attrEvaluator.canIChangeAttribute( productItem.toTestableOneDimensionalArray(), attributeName, attributeValue );
				
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
			let values = this.useFilters ? this.getFilteredValues( attributeName ) : [];

			if ( !values.length )
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

	/**
	 * We want to read in the out-of-stock values for "stockable" attributes
	 * so that we can still show them but make them unselectable
	 * and indicate to the customer that they are not currently in stock.
	 */
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
	 * @param attributeName 
	 * @param value 
	 */
	public isAvailable( attributeName: string, value: AttributeValueSingle ): boolean 
	{
		return !this.isConstrained( attributeName, value ) && ( this.isInSuggestedValues( attributeName, value ) || this.isDynamicValue( attributeName ) );
	}

	/**
	 * Determines whether the value is constrained or not suggested.
	 * 
	 * @param attributeName 
	 * @param value 
	 */
	public isUnavailable( attributeName: string, value: AttributeValueSingle ): boolean 
	{
		return !this.isAvailable( attributeName, value );
	}

	/**
	 * Gets the first suggested value that isn't constrained.
	 * 
	 * @param attributeName 
	 */
	public getDefaultValue( attributeName: string ): AttributeValue | null 
	{
		if ( this.isMultiValue( attributeName ) ) 
		{
			return [];
		}

		return this.getSuggestedValues( attributeName ).find( value => !this.isConstrained( attributeName, value ) ) ?? null;
	}

	/**
	 * Gets all values.
	 * 
	 * @param attributeName 
	 * @returns 
	 */
	public getAllValues( attributeName: string ): AttributeValueMulti 
	{
		if ( this.attributes.hasOwnProperty( attributeName ) ) 
		{
			return Object.keys( this.attributes[ attributeName ].valuesAndConstraints ).map( attrValueRaw => {

				if ( this.isBooleanType( attributeName ) ) 
				{
					try
					{
						return JSON.parse( attrValueRaw );
					}
					catch ( e )
					{
						// Do nothing
					}
				}
				else if ( this.isIntType( attributeName ) )
				{
					return parseInt( attrValueRaw );
				}
				else if ( this.isFloatType( attrValueRaw ) )
				{
					return parseFloat( attrValueRaw );
				}

				return attrValueRaw;
			} );
		}

		return [];
	}

	/**
	 * Iterates through suggested values and returns the highest non-constrained number.
	 * 
	 * @param attributeName 
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
	 * @param attributeName
	 */
	public getLowestAvailableValue( attributeName: string ): number | null
	{
		const values = this.getSuggestedValues( attributeName ).filter( value => !this.isConstrained( attributeName, value ) );

		const lowestValue = Math.min( ...values.map( value => parseFloat( String( value ) ) ) );

		return isNaN( lowestValue ) ? null : lowestValue;
	}

	/**
	 * Suggested values are filtered values, but if filtered values are empty it will fallback to all values.
	 * 
	 * OBS! Can contain constrained values.
	 * 
	 * @param attributeName 
	 */
	public getSuggestedValues( attributeName: string ): AttributeValueMulti
	{
		if ( this.attributesSuggested.hasOwnProperty( attributeName ) )
		{
			return this.attributesSuggested[ attributeName ];
		}

		return [];
	}

	/**
	 * @param attributeName 
	 */
	public getFilteredValues( attributeName: string ): AttributeValueMulti
	{
		if ( this.attributesFiltered.hasOwnProperty( attributeName ) )
		{
			return this.attributesFiltered[ attributeName ];
		}

		return [];
	}

	/**
	 * Determines whether the attribute has been filtered.
	 * 
	 * @param attributeName 
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

	public getPreferredValue( attributeName: string ): AttributeValue | null
	{
		if ( this.hasPreferredValue( attributeName ) )
		{
			return this.attributesPreferred[ attributeName ];
		}

		return null;
	}

	/**
	 * Sets a preferred value. Will be available as a suggested value if not constrained. 
	 * 
	 * @param attributeName 
	 * @param attributeValue 
	 */
	public setPreferredValue( attributeName: string, attributeValue: AttributeValue ): void
	{
		this.attributesPreferred[ attributeName ] = attributeValue;
	}

	public getConstrainedValues( attributeName: string ): AttributeValueMulti
	{
		if ( this.attributesConstrained.hasOwnProperty( attributeName ) )
		{
			return this.attributesConstrained[ attributeName ];
		}

		return [];
	}

	public getOutOfStockValues( attributeName: string ): AttributeValueMulti
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

	public isInFilteredValues( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		const filteredValues = this.getFilteredValues( attributeName );
		
		if ( filteredValues.length )
		{
			return filteredValues.indexOf( attributeValue ) >= 0;
		}

		return false;
	}

	public isInSuggestedValues( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		const suggestedValues = this.getSuggestedValues( attributeName );
		
		if ( suggestedValues.length )
		{
			return suggestedValues.indexOf( attributeValue ) >= 0;
		}

		return false;
	}

	public isInOutOfStockValues( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		const outOfStockValues = this.getOutOfStockValues( attributeName );

		if ( outOfStockValues.length )
		{
			return outOfStockValues.indexOf( attributeValue ) >= 0;
		}

		return false;
	}

	public canValueBe( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		if ( !this.isDynamicValue( attributeName ) ) 
		{
			return this.attributes[ attributeName ]?.valuesAndConstraints.hasOwnProperty( attributeValue.toString() );
		}

		return true;
	}

	public isConstrained( attributeName: string, attributeValue: AttributeValueSingle ): boolean
	{
		let disabledValues = this.getConstrainedValues( attributeName );
		
		if ( disabledValues.length )
		{
			return disabledValues.indexOf( attributeValue ) >= 0 || disabledValues.indexOf( String( attributeValue ) ) >= 0;
		}

		return false;
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
