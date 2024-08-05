import { ProductItem } from "../ProductItem";
import { ProductAttrComputer } from "./ProductAttrComputer";
import { ProductFamily } from "../ProductFamily";
import { TProductAttrMap } from "./ProductAttrMap";
import { Product } from "../Product";

export class ProductItemBuilder 
{
	protected attrComputer: ProductAttrComputer;

	public constructor() 
	{
		this.attrComputer = new ProductAttrComputer();
	}

	public createItem( productFamily: ProductFamily, product: Product, map: TProductAttrMap, useFilters: boolean = true ): ProductItem 
	{
		const item          = new ProductItem( productFamily.getName(), product.getName() );
		
		item.setSku( product.getSku() );
		
		this.attrComputer.evaluate( item, map, useFilters );

		for ( const [ attrName, attr ] of Object.entries( productFamily.getRequiredAttrs() ) ) 
		{
			let attrValue = product.getAttrValue( attrName );

			if ( !attrValue ) 
			{
				const defaultValue = this.attrComputer.getDefaultValue( attrName );

				if ( defaultValue !== null ) 
				{
					attrValue = defaultValue;
				}
			}

			if ( Array.isArray( attrValue ) && attrValue.length && !attr.isMultiValue() ) 
			{
				attrValue = attrValue[ 0 ];
			}

			if( attrValue !== undefined){
				item.setAttribute( attrName, attrValue );
			}			
		}

		for ( let [ attrName, attrValue ] of Object.entries( product.getRequiredAttrs() ) ) 
		{
			const attr = productFamily.getAttribute( attrName );

			if ( Array.isArray( attrValue ) && attrValue.length && !attr.isMultiValue() ) 
			{
				attrValue = attrValue[ 0 ];
			}

			if ( !item.getAttribute( attrName ) && attr.canBe( attrValue ) ) 
			{
				item.setAttribute( attrName, attrValue );
			}
		}

		return item;
	}
}
