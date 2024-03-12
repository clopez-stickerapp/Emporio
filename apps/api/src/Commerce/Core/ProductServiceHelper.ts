import { AttributeValueMulti } from "../../Helper/Condition/AttributeValue";
import { ProductService } from "./ProductService";
import { ProductItem } from "./Product/Item/ProductItem";
import { Product } from "./Product/Product";
import { ProductAttrMap } from "./Product/Helper/ProductAttrMap";

export class ProductServiceHelper 
{
	public constructor( private ps: ProductService ) {}

	public getProductService(): ProductService 
	{
		return this.ps;
	}

	public getAllAttributeValueOptionsForProduct( product: Product, attrAlias: string ): AttributeValueMulti 
	{
		const attrUID = product.getProductFamily().findAttrUIDByAlias( attrAlias );
		const attrValues = this.getDefaultAttributeValueOptionsForProduct( product, attrAlias );

		if ( !product.isAttrStrictlyRequiredFor( attrAlias ) ) 
		{
			for ( const attrValue of this.ps.retrieveAttribute( attrUID ).getValues() ) 
			{
				if ( !attrValues.includes( attrValue.getValue() ) ) 
				{
					attrValues.push( attrValue.getValue() );
				}
			}
		}

		return attrValues;
	}

	public getDefaultAttributeValueOptionsForProduct( product: Product, attrAlias: string ): AttributeValueMulti 
	{
		const attrValues: AttributeValueMulti = [];
		const attrUID = product.getProductFamily().findAttrUIDByAlias( attrAlias );
		const attr = product.getProductService().retrieveAttribute( attrUID );
		let withAttrValues = product.getAttrValue( attrAlias ) ?? [];

		if ( !Array.isArray( withAttrValues ) ) 
		{
			withAttrValues = [ withAttrValues ]
		}

		for ( const attrRawValue of withAttrValues ) 
		{
			if ( attr.isDynamicValue() ) 
			{
				attrValues.push( attrRawValue );
			} 
			else 
			{
				const attrValue = this.ps.findAttributeValue( attrUID, attrRawValue );
				
				if ( attrValue ) 
				{
					attrValues.push( attrValue.getValue() );
				}
			}
		}

		return attrValues;
	}

	public hasProductRecommendedValuesFor( productItem: ProductItem, attributeName: string ): boolean 
	{
		const productFamily = this.ps.retrieveProductFamily( productItem.getProductFamilyName() );
		
		if ( productFamily.isRequired( attributeName ) ) 
		{
			return true;
		} 
		else if ( productFamily.isSupported( attributeName ) ) 
		{
			return this.getProductFromItem( productItem ).isAttrRecommendedFor( attributeName );
		}

		return false;
	}

	public canHaveAttribute( productItem: ProductItem, attributeName: string ): boolean 
	{
		return this.getProductFromItem( productItem ).canHaveAttr( attributeName );
	}

	public getAttributeMap( product: Product, includeFilters: boolean = true ): ProductAttrMap 
	{
		return new ProductAttrMap( this.ps, product, includeFilters );
	}

	public getProductFromItem( productItem: ProductItem ): Product 
	{
		return this.ps.findProduct( productItem.getProductFamilyName(), productItem.getProductName() );
	}
}