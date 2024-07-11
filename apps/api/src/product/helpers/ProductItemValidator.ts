import { ProductService } from "../ProductService";
import { ProductItem } from "../ProductItem";
import { ProductAttrComputerExtended } from "./ProductAttrComputerExtended";
import { ProductAttrNotSupportedException } from "$/product/exceptions/ProductAttrNotSupportedException";
import { ProductAttrValueNotSupportedException } from "$/product/exceptions/ProductAttrValueNotSupportedException";
import { ProductItemInvalidException } from "$/product/exceptions/ProductItemInvalidException";
import { ProductItemOutOfStockException } from "$/product/exceptions/ProductItemOutOfStockException";
import { isEmpty } from "../../../Util";
import { ProductAttrConstraint } from "../attribute/Constraint/ProductAttrConstraint";
import { ProductAttrAsset } from "../attribute/Asset/ProductAttrAsset";

export class ProductItemValidator 
{
	protected ps:           ProductService;
	protected attrComputer: ProductAttrComputerExtended;

	public constructor( ps: ProductService ) 
	{
		this.ps           = ps;
		this.attrComputer = new ProductAttrComputerExtended( this.ps );
	}

	/**
	 * Validates a ProductItem. If invalid, an error will be thrown.
	 * 
	 * @param item The ProductItem to validate.
	 * @param allowUnsupportedAttributeAliases Determines whether it should allow unsupported attribute aliases.
	 * @param allowUnsuggestedAttributeValues Determines whether it should allow unsuggested attribute values.
	 * @param checkAgainstFilteredValues Determines whether it should check against filtered values. Will be applied only if allowUnsuggestedAttributeValues is set to false.
	 */
	public validate( item: ProductItem, allowUnsupportedAttributeAliases: boolean = true, allowUnsuggestedAttributeValues: boolean = false, checkAgainstFilteredValues: boolean = true ): void 
	{
		this.attrComputer.prepare( item, checkAgainstFilteredValues );
		
		const productFamily = this.ps.retrieveProductFamily( item.getProductFamilyName() );
		const product = productFamily.getProduct( item.getProductName() );
		
		if ( productFamily.calculateUnits( item ) <= 0 )
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

		const assets = this.ps.retrieveCollection<ProductAttrAsset>( productFamily.getAssetCollectionName() ).getAll();

		for ( let [ attrName, value ] of Object.entries( item.getAttributes() ) ) 
		{
			if ( Array.isArray( value ) ) 
			{
				value = value.filter( v => !isEmpty( v ) );
			}

			if ( !productFamily.canHaveAttr( attrName ) )
			{
				if ( !allowUnsupportedAttributeAliases )
				{
					throw new ProductAttrNotSupportedException( `Attribute name "${ attrName }" is not supported by product` );
				}

				continue;
			}

			const attr = productFamily.getAttribute( attrName );

			if ( attr.canBe( value ) )
			{
				const attrValues = Array.isArray( value ) ? value : [ value ];

				if ( !allowUnsuggestedAttributeValues && !isEmpty( value ) && !attr.isDynamicValue() ) 
				{
					for ( const attrValue of attrValues )
					{
						if ( !this.attrComputer.isInSuggestedValues( attrName, attrValue ) )
						{
							throw new ProductAttrValueNotSupportedException( `"${ attrValue }" is not suggested as ${ attrName }` );
						}
					}
				}

				for ( const attrValue of attrValues ) 
				{
					const productAttrValue = attr.getAttrValue( attrValue );

					if ( productAttrValue && this.ps.retrieveCollection<ProductAttrConstraint>( productFamily.getConstraintsCollectionName() ).get( attrName )?.getConstraint( productAttrValue )?.testOnItem( item ) === false )
					{
						throw new ProductItemInvalidException( `Failed due to constraints related to "${ productAttrValue }" (${ attrName })` );
					}
				}

				if ( attrName in assets ) 
				{
					const asset = assets[ attrName ];

					for ( const attrValue of attrValues ) 
					{
						if ( !asset.isAvailable( attrValue ) ) 
						{
							throw new ProductItemOutOfStockException( `${ attrName } "${ attrValue }" is out of stock` );
						}
					}
				}
			}
		}
	}
}
