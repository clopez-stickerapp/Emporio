import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { formatPrice } from '$/Commerce/Core/Price/Price';
import { ProductItem } from '$/Commerce/Core/Product/Item/ProductItem';
import { formatCurrency } from '$/Commerce/Core/Currency/Currency';
import { getLocale } from '$/Commerce/Core/Localization/Locale';
import { getPriceListSchema, getPricesSchema } from '../schema';
import { CustomStickerFamily } from '$/Commerce/Product/Family/CustomStickerFamily';

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

		const priceDTO = await emporio.calculatePrice(item, quantity, request.query.lang, request.query.incVat)

		const maxDecimals = item.getProductName() == CustomStickerFamily.PRODUCT_LIBRARY_DESIGN ? 2 : 0;
		const unitPriceFormatted = formatCurrency(priceDTO.unitPrice, {currency: priceDTO.price.currency, locale: getLocale(request.query.lang), minorIfBelowOne: true, maxDecimals});

		return {
			"price": formatPrice(priceDTO.price, request.query.lang, maxDecimals),
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

		let prices = await emporio.getPriceList(item, request.query.lang, request.query.incVat)

		const maxDecimals = item.getProductName() == CustomStickerFamily.PRODUCT_LIBRARY_DESIGN ? 2 : 0;

		//for each price step in prices, format the price
		let formattedPrices = prices.map(priceStep => {
			return {
				price: formatPrice(priceStep.price, request.query.lang, maxDecimals),
				unitPrice: priceStep.unitPrice,
				quantity: priceStep.quantity
			}
		});

		return {
			prices: formattedPrices
		};
	} )
}