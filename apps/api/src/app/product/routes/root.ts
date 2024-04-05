import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { Emporio } from '$/Emporio';
import { paramSchema } from '$app/prices/routes/root';
import { ProductItem } from '$/Commerce/Core/Product/Item/ProductItem';

export default async function ( fastify: FastifyInstance ) {
	const f = fastify.withTypeProvider<TypeBoxTypeProvider>();

	const emporio = new Emporio();

	f.get( 
		'/item/:family/:name', {
			schema: {
				params: paramSchema,
				querystring: Type.Object( {
					useFilters: Type.Boolean( { 
						default: true 
					} )
				} ),
				operationId: 'createItem',
				response: {
					200: Type.Object( {
						productName: Type.String(),
						productFamilyName: Type.String(),
						attributes: Type.Any(),
						units: Type.Number()
					} ),
					400: Type.Object( {
						message: Type.String()
					} )
				},
			},
		},
		async function ( request ) {
			const item = emporio.createItem( request.params.family, request.params.name, request.query.useFilters );
			return {
				productName: item.getProductName(),
				productFamilyName: item.getProductFamilyName(),
				attributes: item.getAttributes(),
				units: item.getUnits()
			}
		},
	)

	f.get( 
		'/attribute-map/:family/:name', {
			schema: {
				params: paramSchema,
				operationId: 'attributeMap',
				response: {
					200: Type.Object( {
						attributes: Type.Any(),
					} ),
					400: Type.Object( {
						message: Type.String()
					} )
				},
			},
		},
		async function ( request ) {
			return { attributes: emporio.getAttributeMap( request.params.family, request.params.name ) };
		}
	)

	f.get( 
		'/validate/:family/:name', {
			schema: {
				params: paramSchema,
				operationId: 'validate',
				querystring: Type.Object( {
					attributes: Type.String( { examples: [ '{"sheet_type":"single","sheet_name":"path","delivery":"single","material":"white", "laminate":"glossy_uv", "width_mm":51, "height_mm":25, "quantity":111}' ] } ),
					allowUnsupportedAttributeAliases: Type.Boolean(),
					allowUnsuggestedAttributeValues: Type.Boolean(),
					checkAgainstFilteredValues: Type.Boolean( {
						default: true
					} )
				} ),
				response: {
					200: Type.Object( {
						valid: Type.Boolean(),
						error: Type.Optional( Type.Object( {
							name: Type.String(),
							message: Type.String()
						} ) )
					} ),
					400: Type.Object( {
						message: Type.String()
					} )
				},
			},
		},
		async function ( request ) {
			const item = ProductItem.fromJSON( {
				productFamilyName: request.params.family,
				productName: request.params.name,
				attributes: JSON.parse( request.query.attributes ),
			} );

			try {
				item.setUnits( emporio.calculateUnits( item ) );
				emporio.validate( item, request.query.allowUnsupportedAttributeAliases, request.query.allowUnsuggestedAttributeValues, request.query.checkAgainstFilteredValues );
				return { 
					valid: true 
				};
			} catch ( error: any ) {
				return {
					valid: false,
					error: {
						name: error.name,
						message: error.message
					}
				};
			}
		},
	)
}