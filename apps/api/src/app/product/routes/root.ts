import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { ProductItem } from '$/Commerce/Core/Product/Item/ProductItem';
import { 
	getAttributeMapSchema, 
	getAttributesSchema, 
	getConditionableMapSchema, 
	getCreateItemSchema, 
	getFamiliesSchema, 
	getFixedQuantitySchema, 
	getLegacySKUSchema, 
	getMinimumQuantitySchema, 
	getOutOfStockSchema, 
	getSizeDetailsSchema, 
	getValidationSchema, 
	isAttributeAvailableSchema, 
	isAttributeRequiredSchema
} from '../schema';

export default async function ( fastify: FastifyInstance ) {
	const f = fastify.withTypeProvider<TypeBoxTypeProvider>();

	const emporio = fastify.emporio;

	f.get( '/item/:family/:name', { schema: getCreateItemSchema }, async function ( request ) {
		const item = emporio.createItem( request.params.family, request.params.name, request.query.useFilters );
		return {
			productName: item.getProductName(),
			productFamilyName: item.getProductFamilyName(),
			attributes: item.getAttributes(),
			units: item.getUnits(),
			sku: item.getSku()
		}
	} );

	f.get( '/minimum-quantity/:family/:name', { schema: getMinimumQuantitySchema }, async function ( request ) {
		const item = ProductItem.fromJSON( {
			productFamilyName: request.params.family,
			productName: request.params.name,
			attributes: JSON.parse( request.query.attributes ),
		} );

		return { minimumQuantity: emporio.getMinimumQuantity( item ) };
	} )

	f.get( '/attribute-map/:family/:name', { schema: getAttributeMapSchema }, async function ( request ) {
		return { attributes: emporio.getAttributeMap( request.params.family, request.params.name ) };
	} )

	f.get( '/conditionable-map/:family', { schema: getConditionableMapSchema }, async function ( request ) {
		return { map: emporio.getConditionableMap( request.params.family ) }
	} )

	f.get( '/validate/:family/:name', { schema: getValidationSchema }, async function ( request ) {
		const item = ProductItem.fromJSON( {
			productFamilyName: request.params.family,
			productName: request.params.name,
			attributes: JSON.parse( request.query.attributes ),
		} );

		item.setUnits( request.query.units );

		try {
			emporio.validate( item, request.query.allowUnsupportedAttributeAliases, request.query.allowUnsuggestedAttributeValues, request.query.checkAgainstFilteredValues );
			return { 
				validation: { 
					valid: true 
				} 
			}
		} catch ( error: any ) {
			return {
				validation: {
					valid: false,
					error: {
						name: error.name,
						message: error.message
					}
				}
			}
		}
	} );

	f.get( '/size/:family/:name', { schema: getSizeDetailsSchema }, async function ( request ) {
		const item = ProductItem.fromJSON( {
			productFamilyName: request.params.family,
			productName: request.params.name,
			attributes: JSON.parse( request.query.attributes ),
		} );
		return { sizeDetails: emporio.getSizeDetails( item, request.query.useFilters ) };
	} );

	f.get( '/attribute/available/:name/:value', { schema: isAttributeAvailableSchema }, async function ( request ) {
		const item = ProductItem.fromJSON( JSON.parse( request.query.item ) );
		return { available: emporio.isAttributeAvailable( item, request.params.name, request.params.value, request.query.useFilters ) };
	} );

	f.get( '/attribute/required/:name', { schema: isAttributeRequiredSchema }, async function ( request ) {
		return { required: emporio.isAttributeRequired( request.query.family, request.query.name, request.params.name ) };
	} );

	f.get( '/attribute/fixed-quantity-evaluated/:family/:name', { schema: getFixedQuantitySchema }, async function ( request ) {
		const item = ProductItem.fromJSON( {
			productFamilyName: request.params.family,
			productName: request.params.name,
			attributes: JSON.parse( request.query.attributes ),
		} );
		return { fixedQuantity: emporio.getFixedQuantityEvaluated( item, request.query.useFilters ) };
	} );

	f.get( '/families', { schema: getFamiliesSchema }, async function ( request ) {
		const families: Record<string, any> = {};
		
		const productFamilies = request.query.name ? [ emporio.getFamily( request.query.name ) ] : emporio.getFamilies();
		
		for ( const family of productFamilies ) {
			families[ family.getName() ] = {
				'name': family.getName(),
				'supported': Object.keys( family.getAttributes() ),
				'required': Object.keys( family.getRequiredAttrs() ),
				'products': {}
			}
			for ( const product of Object.values( family.getProducts() ) ) {
				families[ family.getName() ].products[ product.getName() ] = {
					'name': product.getName(),
					'attributes': product.getAttrMap(),
					'sku': product.getSku(),
					'inStock': product.isInStock()
				}
			}
		}
		
		return { families };
	} );

	f.get( '/attributes', { schema: getAttributesSchema }, async function ( request ) {
		const attributes: Record<string, any> = {};

		const attrs = request.query.name ? [ emporio.getAttribute( request.query.name ) ] : emporio.getAttributes();

		for ( const attribute of attrs ) {
			attributes[ attribute.getUID() ] = {
				'name': attribute.getUID(),
				'values': attribute.getValues().map( value => value.getValue() ),
				'dynamic': attribute.isDynamicValue(),
				'multi': attribute.isMultiValue(),
				'type': attribute.getValueType(),
			}
		}

		return { attributes };
	} )

	f.get( '/legacy-sku/:family/:name', { schema: getLegacySKUSchema }, async function ( request ) {
		const item = ProductItem.fromJSON( {
			productFamilyName: request.params.family,
			productName: request.params.name,
			attributes: JSON.parse( request.query.attributes ),
		} );

		return { legacySKU: emporio.getStickerAppLegacySKU( item ) };
	} )

	f.get( '/out-of-stock/:family', { schema: getOutOfStockSchema }, async function ( request ) {
		return { outOfStock: emporio.getFamily( request.params.family ).getOutOfStockProducts() };
	} )
}