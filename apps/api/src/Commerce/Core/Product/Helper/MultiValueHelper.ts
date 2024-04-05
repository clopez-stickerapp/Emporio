import { AttributeValueMulti, AttributeValueSingle } from "$/Helper/Condition/AttributeValue";
import { ProductItem } from "../Item/ProductItem";

export class MultiValueHelper
{
    public constructor( protected item: ProductItem, protected attrAlias: string ) {}

	public insertOne( value: AttributeValueSingle ): void
	{
		let attrValues = this.get() ?? [];
		
		if ( !attrValues.includes( value ) )
		{
			attrValues.push( value );
		}

		if ( attrValues.length )
		{
			this.set( attrValues );
		}
		else
		{
			this.delete();
		}
	}

	public deleteOne( value: AttributeValueSingle ): void
	{
		let attrValues = this.get() ?? [];

		attrValues = attrValues.filter( v => v != value );

		if ( attrValues.length )
		{
			this.set( attrValues );
		}
		else
		{
			this.delete();
		}
	}

    public has( attrValue: AttributeValueSingle ): boolean
    {
		return ( this.get() ?? [] ).includes( attrValue );
    }

	public get(): AttributeValueMulti | undefined
	{
		return this.item.getAttribute( this.attrAlias );
	}

	public set( attrValues: AttributeValueMulti ): void
	{
		this.item.setAttribute( this.attrAlias, attrValues );
	}

	public delete(): void
	{
		this.item.removeAttribute( this.attrAlias );
	}
}
