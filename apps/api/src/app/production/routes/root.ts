import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { Emporio } from '$/Emporio';
import { paramSchema } from '$app/prices/routes/root';
import { ProductItem } from '$/Commerce/Core/Product/Item/ProductItem';

export const attributesExample = {
	"sheet_type": "single",
	"sheet_name": "path",
	"delivery": "single",
	"material": "white",
	"laminate": "glossy_uv",
	"width_mm": 51,
	"height_mm": 25,
	"quantity": 111
};

export default async function ( fastify: FastifyInstance ) {
	const f = fastify.withTypeProvider<TypeBoxTypeProvider>();

	const emporio = new Emporio();

	f.get( 
		'/item-with-settings/:family/:name', {
			schema: {
				params: paramSchema,
				operationId: 'getItemWithProductionSettings',
				querystring: Type.Object( {
					attributes: Type.String( { 
						examples: [ 
							JSON.stringify( attributesExample ) 
						] 
					} ),
					useFilters: Type.Boolean( { 
						default: true 
					} )
				} ),
				response: {
					200: Type.Object( {
						item: Type.Object( {
							productName: Type.String(),
							productFamilyName: Type.String(),
							attributes: Type.Record( Type.String(), Type.Any(), { 
								'examples': [
									{
										...attributesExample,
										'production_line': 'laser',
										'cut_direction': 'auto'
									}
								] 
							} ),
							units: Type.Number()
						} )
					} ),
					400: Type.Object( {
						message: Type.String()
					} )
				},
			},
		},
		async function ( request ) {
			let item = ProductItem.fromJSON( {
				productFamilyName: request.params.family,
				productName: request.params.name,
				attributes: JSON.parse( request.query.attributes ),
			} );

			item = emporio.setProductionSettingsOnItem( item, request.query.useFilters );

			return { 
				item: {
					'productFamilyName': item.getProductFamilyName(),
					'productName': item.getProductName(),
					'attributes': item.getAttributes(),
					'units': item.getUnits()
				} 
			};
		},
	)

	f.get( 
		'/item-without-settings/:family/:name', {
			schema: {
				params: paramSchema,
				operationId: 'getItemWithoutProductionSettings',
				querystring: Type.Object( {
					attributes: Type.String( { 
						examples: [ 
							JSON.stringify( {
								...attributesExample,
								'production_line': 'laser',
								'cut_direction': 'auto'
							} ) 
						] 
					} ),
					useFilters: Type.Boolean( { 
						default: true 
					} )
				} ),
				response: {
					200: Type.Object( {
						item: Type.Object( {
							productName: Type.String(),
							productFamilyName: Type.String(),
							attributes: Type.Record( Type.String(), Type.Any(), { 
								'examples': [
									attributesExample
								] 
							} ),
							units: Type.Number()
						} )
					} ),
					400: Type.Object( {
						message: Type.String()
					} )
				},
			},
		},
		async function ( request ) {
			let item = ProductItem.fromJSON( {
				productFamilyName: request.params.family,
				productName: request.params.name,
				attributes: JSON.parse( request.query.attributes ),
			} );

			item = emporio.unsetProductionSettingsOnItem( item, request.query.useFilters );

			return { 
				item: {
					'productFamilyName': item.getProductFamilyName(),
					'productName': item.getProductName(),
					'attributes': item.getAttributes(),
					'units': item.getUnits()
				} 
			};
		},
	)
}