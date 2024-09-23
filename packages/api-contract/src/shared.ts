import { Type } from "@sinclair/typebox";

export const UseFilters = Type.Boolean( { default: true } );

export const AttributeValueSingle = Type.Union( [ Type.Number(), Type.Boolean(), Type.String() ] );

export const AttributeValueMulti = Type.Array( AttributeValueSingle );

export const AttributeValue = Type.Union( [ AttributeValueSingle, AttributeValueMulti ] );

export const Attributes = Type.Record( Type.String(), AttributeValue );

export const FamilyName = Type.String( { 
	minLength: 1
} );

export const ProductName = Type.String( { 
	minLength: 1
} );

export const ProductItem = Type.Object( {
	productFamilyName: FamilyName,
	productName: ProductName,
	attributes: Attributes,
	sku: Type.Optional( Type.String() )
} );