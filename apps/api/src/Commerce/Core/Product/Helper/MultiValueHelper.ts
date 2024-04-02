import { AttributeValueMulti, AttributeValueSingle } from "$/Helper/Condition/AttributeValue";
import { ProductItem } from "../Item/ProductItem";

export class MultiValueHelper
{
    public constructor( protected item: ProductItem, protected attrAlias: string ) {}

    public insertOrDeleteOne( attrValue: AttributeValueSingle, value: boolean ): void
    {
        let attrValues = this.getAll() ?? [];

		if ( !value )
		{
			attrValues = attrValues.filter( v => v != attrValue );
		}
		else if ( !attrValues.includes( attrValue ) )
		{
			attrValues.push( attrValue );
		}

		if ( attrValues.length )
		{
			this.set( attrValues );
		}
		else
		{
			this.deleteAll();
		}
    }

	public insertOne( attrValue: AttributeValueSingle ): void
	{
		this.insertOrDeleteOne( attrValue, true );
	}

	public deleteOne( attrValue: AttributeValueSingle ): void
	{
		this.insertOrDeleteOne( attrValue, false );
	}

    public has( attrValue: AttributeValueSingle ): boolean
    {
		return ( this.getAll() ?? [] ).includes( attrValue );
    }

	public getAll(): AttributeValueMulti | undefined
	{
		return this.item.getAttribute( this.attrAlias );
	}

	public set( attrValues: AttributeValueMulti ): void
	{
		this.item.setAttribute( this.attrAlias, attrValues );
	}

	public deleteAll(): void
	{
		this.item.removeAttribute( this.attrAlias );
	}
}
