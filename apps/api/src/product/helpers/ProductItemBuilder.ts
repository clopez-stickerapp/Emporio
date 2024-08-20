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
		// TODO: transfer_decal - delivery sheet missing
		// TODO: labels_on_roll - cut_direction missing
		// TODO: hang_tag       - note missing (add as required?)
		// TODO: front_adhesive - note missing (add as required?)
		// FIXED: 3d_dome       - path instead of circle for sheet_name
		// FIXED: laptop_skin   - glossy_uv instead of sandy for laminate
		
		const item = new ProductItem( productFamily.getName(), product.getName() );

		this.attrComputer.evaluate( item, map, useFilters );

		for ( let [ attrName, attrValue ] of Object.entries( product.getRequiredAttrs() ) ) 
		{
			const attr = productFamily.getAttribute( attrName );
			
			if ( Array.isArray( attrValue ) && attrValue.length && !attr.isMultiValue() ) 
			{
				attrValue = attrValue[ 0 ];
			}

			if ( attr.canBe( attrValue ) ) 
			{
				item.setAttribute( attrName, attrValue );
			}
		}
		
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

				if ( Array.isArray( attrValue ) && attrValue.length && !attr.isMultiValue() ) 
				{
					attrValue = attrValue[ 0 ];
				}
	
				if ( attrValue !== undefined )
				{
					item.setAttribute( attrName, attrValue );

					this.attrComputer.evaluate( item, map, useFilters );
				}
			}
		}

		return item;
	}
}
