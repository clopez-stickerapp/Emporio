import { ProductItem } from "./ProductItem";
import { AttributeValueSingle, AttributeValueMulti } from "./AttributeValue";

/**
 * A helper class for managing multi-value attributes.
 */
export class MultiValueHelper
{
    public constructor( protected item: ProductItem, protected attrAlias: string ) {}

	/**
	 * Pushes a single value.

	 * @param value The attribute value to insert.
	 * @returns The updated product item.
	 */
	public insertOne( value: AttributeValueSingle ): ProductItem
	{
		const attrValues = this.get();
		
		if ( !attrValues.includes( value ) )
		{
			attrValues.push( value );
		}

		if ( attrValues.length )
		{
			return this.set( attrValues );
		}

		return this.delete();
	}

	/**
	 * Filters out a single value.
	 * 
	 * If no values are left, the attribute will be deleted from the product item.
	 * 
	 * @param value The attribute value to delete.
	 * @returns The updated product item.
	 */
	public deleteOne( value: AttributeValueSingle ): ProductItem
	{
		const attrValues = this.get().filter( v => v != value );

		if ( attrValues.length )
		{
			return this.set( attrValues );
		}

		return this.delete();
	}

	/**
	 * Determines whether a single value is present.
	 * 
	 * @param value The attribute value to check.
	 * @returns True if the value is present, false otherwise.
	 */
    public has( attrValue: AttributeValueSingle ): boolean
    {
		return this.get().includes( attrValue );
    }

	/**
	 * Retrieves the attribute value.
	 */
	public get(): AttributeValueMulti
	{
		const value = this.item.getAttribute( this.attrAlias ) ?? [];

		return Array.isArray( value ) ? value : [ value ];
	}

	/**
	 * Sets the attribute.
	 */
	public set( attrValues: AttributeValueMulti ): ProductItem
	{
		return this.item.setAttribute( this.attrAlias, attrValues );
	}

	/**
	 * Deletes the attribute.
	 */
	public delete(): ProductItem
	{
		return this.item.removeAttribute( this.attrAlias );
	}
}
