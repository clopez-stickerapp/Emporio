import { services } from "$/configuration/ServiceLoader";
import { Type } from "@sinclair/typebox";

const attributesExample = {
	"sheet_type": "single",
	"sheet_name": "path",
	"delivery": "single",
	"material": "white",
	"laminate": "glossy_uv",
	"imperial_units": true,
	"width_mm": 51,
	"height_mm": 25,
	"quantity": 111
};

const getAttributes = ( withProduction: boolean = false ) => {
	return withProduction ? {
		...attributesExample,
		'production_line': 'laser',
		'cut_direction': 'auto'
	} : attributesExample;
}

const service = services["stickerapp"]; //Todo: should we do it like this?

export const ProductFamily = () => Type.String( { 
	minLength: 1,
	examples: service.getProductFamilies().map( family => family.getName() ),
} );

export const ProductName = () => Type.String( {
	minLength: 1,
	examples: service.getProductFamilies().map( family => Object.keys( family.getProducts() ) ).flat()
} );

export const AttributeValueSingle = () => Type.Union( [ Type.String(), Type.Number(), Type.Boolean() ] );

export const AttributeValueMulti = () => Type.Array( AttributeValueSingle() );

export const AttributeValue = () => Type.Union( [ 
	AttributeValueSingle(), 
	AttributeValueMulti() 
] );

export const Attributes = ( withProductionAttributes: boolean = false ) => Type.Record( Type.String(), AttributeValue(), {
	examples: [ getAttributes( withProductionAttributes ) ]
} );

export const AttributesString = ( withProductionAttributes: boolean = false ) => Type.String( {
	examples: [ JSON.stringify( getAttributes( withProductionAttributes ) ) ]
} );

export const AttributeUID = () => Type.String( {
	examples: service.getAttributes().map( attribute => attribute.getUID() ),
} )

export const ProductItem = ( withProductionAttributes: boolean = false ) => Type.Object( {
	productFamilyName: ProductFamily(),
	productName: ProductName(),
	attributes: Attributes( withProductionAttributes ),
	sku: Type.Optional( Type.String() )
} );

export const ProductItemString = ( withProductionAttributes: boolean = false ) => Type.String( {
	examples: [ JSON.stringify( {
		productFamilyName: 'custom_sticker',
		productName: 'die_cut',
		attributes: getAttributes( withProductionAttributes ),
		sku: 'DCRS-108'
	} ) ]
} );

export const UseFilters = ( defaultValue: boolean = true ) => Type.Boolean( { default: defaultValue } );

export const Error = () => Type.Object( { message: Type.String() } )