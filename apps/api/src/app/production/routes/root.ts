import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { getItemWithProductionSettingsSchema, getItemWithoutProductionSettingsSchema } from '../schema';
import { ProductItem } from '@stickerapp-org/nomisma';

export default async function ( fastify: FastifyInstance ) {
	const f = fastify.withTypeProvider<TypeBoxTypeProvider>();

	const emporio = fastify.emporio;

	f.get( '/item-with-settings/:family/:name', { schema: getItemWithProductionSettingsSchema }, async function ( request ) {
		let item = new ProductItem( request.params.family, request.params.name, JSON.parse( request.query.attributes ) );

		item = emporio.setProductionSettingsOnItem( item, request.query.useFilters );

		return { 
			item: {
				'productFamilyName': item.getProductFamilyName(),
				'productName': item.getProductName(),
				'attributes': item.getAttributes()
			} 
		};
	} )

	f.get( '/item-without-settings/:family/:name', { schema: getItemWithoutProductionSettingsSchema }, async function ( request ) {
		let item = new ProductItem( request.params.family, request.params.name, JSON.parse( request.query.attributes ) );

		item = emporio.unsetProductionSettingsOnItem( item, request.query.useFilters );

		return {
			item: {
				'productFamilyName': item.getProductFamilyName(),
				'productName': item.getProductName(),
				'attributes': item.getAttributes()
			} 
		}
	} );
}