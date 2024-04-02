import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { Emporio } from '$/Emporio';
import { paramSchema } from '$app/prices/routes/root';
import { ProductItem } from '$/Commerce/Core/Product/Item/ProductItem';

const attributesExample = {
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
		'/settings/set/:family/:name', {
			schema: {
				params: paramSchema,
				operationId: 'setProductionSettings',
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
						'attributes': Type.Record( Type.String(), Type.Any(), { 
							'examples': [
								{
									...attributesExample,
									'production_line': 'laser',
									'cut_direction': 'auto'
								}
							] 
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

			const attributes = emporio.setProductionSettingsOnItem( item, request.query.useFilters ).getAttributes();

			return { attributes };
		},
	)

	f.get( 
		'/settings/unset/:family/:name', {
			schema: {
				params: paramSchema,
				operationId: 'unsetProductionSettings',
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
						'attributes': Type.Record( Type.String(), Type.Any(), { 
							'examples': [ 
								attributesExample 
							] 
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

			const attributes = emporio.unsetProductionSettingsOnItem( item, request.query.useFilters ).getAttributes();

			return { attributes };
		},
	)
}