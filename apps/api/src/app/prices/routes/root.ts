import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { formatPrice } from '$/Commerce/Core/Price/Price';
import { ProductItem } from '$/Commerce/Core/Product/Item/ProductItem';
import { formatCurrency } from '$/Commerce/Core/Currency/Currency';
import { getLocale } from '$/Commerce/Core/Localization/Locale';
import { getPriceListSchema, getPricesSchema } from '../schema';

export default async function (fastify: FastifyInstance) {
	const f = fastify.withTypeProvider<TypeBoxTypeProvider>();

	const emporio = fastify.emporio;

	f.get( '/price/:family/:name', { schema: getPricesSchema }, async function (request) {
		let item = ProductItem.fromJSON({
			productFamilyName: request.params.family,
			productName: request.params.name,
			attributes: JSON.parse(request.query.attributes),
		});

		const quantity = item.getAttribute<number>('quantity') ?? 1;

		const priceDTO = emporio.calculatePrice(item, quantity, request.query.lang, request.query.incVat)
		const unitPriceFormatted = formatCurrency(priceDTO.unitPrice, {currency: priceDTO.price.currency, locale: getLocale(request.query.lang), minorIfBelowOne: true});

		return {
			"price": formatPrice(priceDTO.price, request.query.lang, 2),
			"unitPrice": priceDTO.unitPrice,
			unitPriceFormatted,
			quantity,
		};
	} );

	f.get( '/price-list/:family/:name', { schema: getPriceListSchema }, async function (request) {
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
	} )
}