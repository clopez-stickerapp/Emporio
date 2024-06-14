import { ProductService } from "../ProductService";
import { ProductItem } from "../ProductItem";
import { ProductAttrComputerExtended } from "./ProductAttrComputerExtended";

export class ProductItemBuilder 
{
	protected ps:           ProductService;
	protected attrComputer: ProductAttrComputerExtended;

	public constructor( productService: ProductService ) 
	{
		this.ps           = productService;
		this.attrComputer = new ProductAttrComputerExtended( this.ps );
	}

	public createItem( productFamilyName: string, productName: string, useFilters: boolean = true ): ProductItem 
	{
		const productFamily = this.ps.retrieveProductFamily( productFamilyName );
		const product       = productFamily.getProduct( productName );
		const item          = new ProductItem( productFamilyName, productName );
		
		item.setSku( product.getSku() );
		
		this.attrComputer.prepare( item, useFilters );

		for ( const [ attrName, attrUID ] of Object.entries( productFamily.getRequiredAttrs() ) ) 
		{
			const attr = this.ps.retrieveAttribute( attrUID );
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

		for ( let [ attrName, attrValue ] of Object.entries( product.getAttrMap() ) ) 
		{
			const attrUID = productFamily.findAttrUIDByAlias( attrName );
			const attr = this.ps.retrieveAttribute( attrUID );

			if ( Array.isArray( attrValue ) && attrValue.length && !attr.isMultiValue() ) 
			{
				attrValue = attrValue[ 0 ];
			}

			if ( !item.getAttribute( attrName ) && attr.canBe( attrValue ) ) 
			{
				item.setAttribute( attrName, attrValue );
			}
		}

		item.setUnits( productFamily.getMinimumUnits( item ) );

		return item;
	}
}
