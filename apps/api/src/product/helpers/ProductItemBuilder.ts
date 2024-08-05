import { ProductService } from "../ProductService";
import { ProductItem } from "../ProductItem";
import { ProductAttrComputer } from "./ProductAttrComputer";

export class ProductItemBuilder 
{
	protected ps:           ProductService;
	protected attrComputer: ProductAttrComputer;

	public constructor( productService: ProductService ) 
	{
		this.ps           = productService;
		this.attrComputer = new ProductAttrComputer();
	}

	public createItem( productFamilyName: string, productName: string, useFilters: boolean = true ): ProductItem 
	{
		const productFamily = this.ps.retrieveProductFamily( productFamilyName );
		const product       = productFamily.getProduct( productName );
		const item          = new ProductItem( productFamilyName, productName );
		
		item.setSku( product.getSku() );

		const map = this.ps.getProductMap(productFamilyName, productName);
		
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
