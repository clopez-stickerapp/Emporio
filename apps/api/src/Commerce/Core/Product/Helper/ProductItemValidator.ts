import { isEmpty } from "../../../../../Util";
import { ProductAttrNotSupportedException } from "../../Exception/ProductAttrNotSupportedException";
import { ProductAttrValueNotSupportedException } from "../../Exception/ProductAttrValueNotSupportedException";
import { ProductItemInvalidException } from "../../Exception/ProductItemInvalidException";
import { ProductItemOutOfStockException } from "../../Exception/ProductItemOutOfStockException";
import { ProductService } from "../../ProductService";
import { ProductItem } from "../Item/ProductItem";
import { ProductAttrComputerExtended } from "./ProductAttrComputerExtended";

export class ProductItemValidator 
{
	protected ps:           ProductService;
	protected attrComputer: ProductAttrComputerExtended;

	public constructor( ps: ProductService ) 
	{
		this.ps           = ps;
		this.attrComputer = new ProductAttrComputerExtended( this.ps );
	}

	public validate( item: ProductItem, allowUnsupportedAttributeAliases: boolean = true, allowUnsuggestedAttributeValues: boolean = true ): boolean 
	{
		this.attrComputer.prepare( item );
		
		const productFamily = this.ps.retrieveProductFamily( item.getProductFamilyName() );
		const product = productFamily.getProduct( item.getProductName() );
		
		if ( !item.getUnits() ) 
		{
			throw new ProductItemInvalidException( "Item units can't be zero." );
		}

		/**
		 * TODO:
		 * - Does units match? float / int
		 * - Does attr match?
		 */

		if ( !product.testAttributes( item.getAttributes() ) ) 
		{
			throw new ProductItemInvalidException( "Attributes doesn't match product recipe." );
		}

		const stockMap = product.getProductFamily().getStockCollection()?.getAllOutOfStock() ?? {};

		for ( let [ attrName, value ] of Object.entries( item.getAttributes() ) ) 
		{
			if ( Array.isArray( value ) ) 
			{
				value = value.filter( v => !isEmpty( v ) );
			}

			if ( !product.canHaveAttr( attrName ) )
			{
				if ( !allowUnsupportedAttributeAliases )
				{
					throw new ProductAttrNotSupportedException( `Attribute name is not supported by product: ${ attrName }` );
				}

				continue;
			}

			const attrUID = productFamily.findAttrUIDByAlias( attrName );
			const attr = this.ps.retrieveAttribute( attrUID );

			if ( attr.canBe( value ) )
			{
				const attrValues = Array.isArray( value ) ? value : [ value ];

				if ( !allowUnsuggestedAttributeValues && !isEmpty( value ) && !attr.isDynamicValue() ) 
				{
					for ( const attrValue of attrValues )
					{
						if ( !this.attrComputer.isInSuggestedValues( attrName, attrValue ) )
						{
							throw new ProductAttrValueNotSupportedException( `${ JSON.stringify( attrValue ) } is not suggested as '${ attrName }'.` );
						}
					}
				}

				for ( const attrValue of attrValues ) 
				{
					const productAttrValue = attr.getAttrValue( attrValue );

					if ( productAttrValue && productFamily.getConstraintsCollection()?.test( attrName, productAttrValue.getValue(), item ) === false ) 
					{
						throw new ProductItemInvalidException( `Failed due to constraints related to ${ productAttrValue.getValue() } (${ attrName })\n` );
					}
				}

				if ( attrName in stockMap ) 
				{
					const outOfStock = stockMap[ attrName ];

					for ( const attrValue of attrValues ) 
					{
						if ( typeof attrValue === 'string' && outOfStock.isOutOfStock( attrValue ) ) 
						{
							throw new ProductItemOutOfStockException( `The product item can't be ordered because the value for ${ attrName } is out of stock: ${ attrValue }` );
						}
					}
				}
			}
		}

		return true;
	}
}
