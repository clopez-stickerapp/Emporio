import { Attributes } from "Attributes";
import { ProductAttrComputer } from "./ProductAttrComputer";
import { AttributeValue, AttributeValueMulti, AttributeValueSingle } from "AttributeValue";

export class CherryPickHelper
{
	protected lostAttributes: Attributes = {};

	public constructor( protected attrComputer: ProductAttrComputer, protected attributes: Attributes = {} ) {}

	public reset(): void
	{
		this.attributes = {};
		this.lostAttributes = {};
	}

	public hasLostAttributeValue( attributeName: string, attributeValue: AttributeValue ): boolean
	{
		if ( this.hasLostAttribute( attributeName ) )
		{
			if ( this.attrComputer.isMultiValue( attributeName ) )
			{
				const lostValues = this.getLostAttribute<AttributeValueMulti>( attributeName ) ?? [];

				const attributeValues = Array.isArray( attributeValue ) ? attributeValue : [ attributeValue ];

				return attributeValues.some( value => lostValues.includes( value ) );
			}

			return this.getLostAttribute( attributeName ) != attributeValue;
		}

		return false;
	}

	public hasLostAttribute( attributeName: string ): boolean
	{
		return this.lostAttributes.hasOwnProperty( attributeName );
	}

	public maybeRegisterALost( attributeName: string, attributeValue: AttributeValue ): boolean
	{
		if ( this.hasAttribute( attributeName ) )
		{
			if ( this.attrComputer.isMultiValue( attributeName ) )
			{
				const cherryPickedValue = this.getAttribute<AttributeValueMulti>( attributeName ) ?? [];
				const attributeValues   = Array.isArray( attributeValue ) ? attributeValue : [ attributeValue ];

				const lostValues = cherryPickedValue.filter( value => !attributeValues.includes( value ) );

				if ( lostValues.length )
				{
					this.lostAttributes[ attributeName ] = lostValues;

					return true;
				}
				else
				{
					delete this.lostAttributes[ attributeName ];
				}
			}
			else
			{
				// TODO: Doesn't work for features (multi value)
				const cherryPickedValue         = this.getAttribute<AttributeValueSingle>( attributeName );
				const cherryPickedValueAsString = JSON.stringify( cherryPickedValue );
				const attributeValueAsString    = JSON.stringify( attributeValue );

				if ( cherryPickedValue !== undefined && cherryPickedValueAsString != attributeValueAsString )
				{
					this.lostAttributes[ attributeName ] = cherryPickedValue;

					return true;
				}
				else if ( this.hasLostAttribute( attributeName ) )
				{
					delete this.lostAttributes[ attributeName ];
				}
			}
		}

		return false;
	}

	public removeAttribute( attributeName: string, attributeValue: AttributeValueSingle ): void
	{
		if ( this.hasAttribute( attributeName ) )
		{
			if ( this.attrComputer.isMultiValue( attributeName ) )
			{
				const attributeValues = this.getAttribute<AttributeValueMulti>( attributeName ) ?? [];
	
				this.attributes[ attributeName ] = attributeValues.filter( value => value != attributeValue );
			}
			else
			{
				delete this.attributes[ attributeName ];
			}
		}
	}

	public hasAttribute( attributeName: string ): boolean
	{
		return this.attributes.hasOwnProperty( attributeName );
	}

	public setAttributes( attributes: Attributes ): void
	{
		this.attributes = attributes;
	}

	public setAttribute( attributeName: string, attributeValue: AttributeValueSingle ): void
	{
		// TODO: Make sure it keeps track of multi values: Example, when selecting both backpaper printing and effect layer it seems to just remembed the last picked one?
		if ( this.attrComputer.isMultiValue( attributeName ) )
		{
			if ( !this.hasAttribute( attributeName ) )
			{
				this.attributes[ attributeName ] = [];
			}

			this.getAttribute<AttributeValueMulti>( attributeName )?.push( attributeValue );
		}
		else
		{
			this.attributes[ attributeName ] = attributeValue;
		}
	}

	public getAttribute<T extends AttributeValue>( attributeName: string ): T | undefined
	{
		return this.attributes[ attributeName ] as T | undefined;
	}

	public getLostAttribute<T extends AttributeValue>( attributeName: string ): T | undefined
	{
		return this.lostAttributes[ attributeName ] as T | undefined;
	}
}
