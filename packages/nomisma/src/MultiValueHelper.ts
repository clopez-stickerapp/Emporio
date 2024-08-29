import { ProductItem } from "./ProductItem";
import { AttributeValueSingle, AttributeValueMulti } from "./AttributeValue";

export class MultiValueHelper
{
    public constructor( protected item: ProductItem, protected attrAlias: string ) {}

	public insertOne( value: AttributeValueSingle ): ProductItem
	{
		let attrValues = this.get() ?? [];
		
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

	public deleteOne( value: AttributeValueSingle ): ProductItem
	{
		let attrValues = this.get() ?? [];

		attrValues = attrValues.filter( v => v != value );

		if ( attrValues.length )
		{
			return this.set( attrValues );
		}

		return this.delete();
	}

    public has( attrValue: AttributeValueSingle ): boolean
    {
		return ( this.get() ?? [] ).includes( attrValue );
    }

	public get(): AttributeValueMulti | undefined
	{
		return this.item.getAttribute( this.attrAlias );
	}

	public set( attrValues: AttributeValueMulti ): ProductItem
	{
		return this.item.setAttribute( this.attrAlias, attrValues );
	}

	public delete(): ProductItem
	{
		return this.item.removeAttribute( this.attrAlias );
	}
}
