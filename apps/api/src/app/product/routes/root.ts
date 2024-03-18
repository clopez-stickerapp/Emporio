import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { Emporio } from '$/Emporio';
import { paramSchema } from '$app/prices/routes/root';

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
}