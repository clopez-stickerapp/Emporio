import { Attributes } from "../../../../Helper/Condition/Attributes";
import { ProductService } from "../../ProductService";
import { ProductItem } from "../Item/ProductItem";
import { ProductAttrComputerExtended } from "./ProductAttrComputerExtended";

export class ProductItemBuilder 
{
	protected ps:           ProductService;
	protected attrComputer: ProductAttrComputerExtended;

	public constructor( productService: ProductService, useFilters: boolean = true ) 
	{
		this.ps           = productService;
		this.attrComputer = new ProductAttrComputerExtended( this.ps, useFilters );
	}

	public createItem( productFamilyName: string, productName: string, withAttributes: Attributes = {} ): ProductItem 
	{
		const productFamily = this.ps.retrieveProductFamily( productFamilyName );
		const product       = productFamily.getProduct( productName );
		const item          = new ProductItem( productFamilyName, productName );
		
		// item.setSku( product.getSku() );
		this.attrComputer.prepare( item );

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

			if ( Array.isArray( attrValue ) && !attr.isMultiValue() ) 
			{
				const firstValue = attrValue.shift();

				if ( firstValue !== undefined )
				{
					attrValue = firstValue;
				}
			}

			// TODO: Can we set attribute only if attrValue !== undefined?
			item.setAttribute( attrName, attrValue );
		}

		for ( let [ attrName, attrValue ] of Object.entries( product.getAttrMap() ) ) 
		{
			const attrUID = productFamily.findAttrUIDByAlias( attrName );
			const attr = this.ps.retrieveAttribute( attrUID );

			if ( Array.isArray( attrValue ) && !attr.isMultiValue() ) 
			{
				const firstValue = attrValue.shift();

				if ( firstValue !== undefined )
				{
					attrValue = firstValue;
				}
			}

			if ( !item.getAttribute( attrName ) && attr.canBe( attrValue ) ) 
			{
				item.setAttribute( attrName, attrValue );
			}
		}

		item.setAttributes( {
			...item.getAttributes(),
			...withAttributes
		} );

		item.setUnits( productFamily.getMinimumUnits( item ) );

		return item;
	}
}
