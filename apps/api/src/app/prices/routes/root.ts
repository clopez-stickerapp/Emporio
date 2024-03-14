import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { StickerAppProductService } from '../../../Commerce/Product/StickerAppProductService';
import { FormattedPrice, formatPrice } from '$/Commerce/Core/Price/Price';
import { ProductItem } from '$/Commerce/Core/Product/Item/ProductItem';
import { Emporio, FormattedPriceList } from '$/Emporio';
import { formatCurrency } from '$/Commerce/Core/Currency/Currency';
import { getLocale } from '$/Commerce/Core/Localization/Locale';

export const paramSchema = Type.Object({
	family: Type.String({ examples: ['custom_sticker'] }),
	name: Type.String({ examples: ['die_cut'] }),
});

export const querySchema = Type.Object({
	attributes: Type.String({ examples: ['{"material":"white", "laminate":"glossy", "width_mm":51, "height_mm":25, "quantity":111}'] }),
	lang: Type.String({ examples: ['us'] }),
	incVat: Type.Boolean({ default: true }),
});

export default async function (fastify: FastifyInstance) {
	const f = fastify.withTypeProvider<TypeBoxTypeProvider>();

	const service = new StickerAppProductService();
	const emporio = new Emporio(service);

	f.get(
		'/price/:family/:name',
		{
			schema: {
				params: paramSchema,
				operationId: 'getPrices',
				querystring: querySchema,
				response: {
					200: Type.Object({ 
						price: FormattedPrice,
						unitPrice: Type.Number(),
						unitPriceFormatted: Type.String(),
						quantity: Type.Number(),
					}),
					400: Type.Object({
						message: Type.String(),
					}),
				},
			},
		},
		async function (request) {
			let item = ProductItem.fromJSON({
				productFamilyName: request.params.family,
				productName: request.params.name,
				attributes: JSON.parse(request.query.attributes),
			});

			const units = emporio.calculateUnits(item);

			const price = emporio.calculatePrice(item, units, request.query.lang, request.query.incVat)
			const unitPrice = price.total / (item.getAttribute<number>("quantity") ?? 1);
			const unitPriceFormatted = formatCurrency(unitPrice, {currency: price.currency, locale: getLocale(request.query.lang), minorIfBelowOne: true});

			return {
				"price": formatPrice(price, request.query.lang, 2),
				"unitPrice": unitPrice,
				"unitPriceFormatted": unitPriceFormatted,
				"quantity": units,
			};
		},
	);

	f.get(
		'/price-list/:family/:name',
		{
			schema: {
				params: paramSchema,
				operationId: 'getPriceList',
				querystring: querySchema,
				response: {
					200: { prices: FormattedPriceList },
					400: Type.Object({
						message: Type.String(),
					}),
				},
			},
		},
		async function (request) {
			let item = ProductItem.fromJSON({
				productFamilyName: request.params.family,
				productName: request.params.name,
				attributes: JSON.parse(request.query.attributes),
			});

			item.setUnits(emporio.calculateUnits(item));

			let prices = emporio.getPriceList(item, request.query.lang, request.query.incVat)

			//for each price step in prices, format the price
			let formattedPrices = prices.map(priceStep => {
				return {
					price: formatPrice(priceStep.price, request.query.lang, 2),
					unitPrice: priceStep.unitPrice,
					quantity: priceStep.quantity
				}
			});

			return {
				prices: formattedPrices
			};
		},
	)
}