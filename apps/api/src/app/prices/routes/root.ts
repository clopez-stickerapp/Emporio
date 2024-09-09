import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { getPriceListSchema, getPricesSchema, postBulkPricesSchema } from '../schema';
import { Currencies, CurrencyConverter, formatCurrency, shouldShowDecimalsInShop } from '$/currency/Currency';
import { getCurrency, getLocale } from '$/localization/Locale';
import { calculateBreakdownSum, formatPrice, toMajorUnits } from '$/prices/Price';
import { ProductItem } from '@stickerapp-org/nomisma';
import { ProductNames } from '$data/ConditionValueResolver';
import { Emporio } from '$/Emporio';
import { RateBasedProductPriceProvider } from '$/prices/RateBasedProductPriceProvider';
import { validateCountryCode } from '$/localization/Countries';

export default async function (fastify: FastifyInstance) {
	const f = fastify.withTypeProvider<TypeBoxTypeProvider>();

	// Temporary solution until switched to bulk price system
	const emporio = (useNewCurves: boolean): Emporio => { return useNewCurves ? fastify.emporioBulk : fastify.emporio; }
	const emporioBulk = fastify.emporioBulk;

	f.get( '/price/:family/:name', { schema: getPricesSchema }, async function (request) {
		let item = new ProductItem( request.params.family, request.params.name, JSON.parse( request.query.attributes ) );

		const lang = validateCountryCode(request.query.lang);
		const useNewCurves = request.query.useNewCurves ?? false;
		const quantity = item.getAttribute<number>('quantity') ?? 1;
		const priceDTO = await emporio(useNewCurves).calculatePrice(item, quantity, lang, request.query.incVat)

		const showDecimals = (item.getProductName() == ProductNames.PRODUCT_LIBRARY_DESIGN && shouldShowDecimalsInShop(lang));

		const maxDecimals = showDecimals ? 2 : 0;
		const unitPriceFormatted = formatCurrency(priceDTO.unitPrice, {currency: priceDTO.price.currency, locale: getLocale(lang), minorIfBelowOne: true, maxDecimals});

		return {
			"price": formatPrice(priceDTO.price, lang, maxDecimals),
			"unitPrice": priceDTO.unitPrice,
			unitPriceFormatted,
			quantity,
		};
	} );

	f.get( '/price-list/:family/:name', { schema: getPriceListSchema }, async function (request) {
		let item = new ProductItem( request.params.family, request.params.name, JSON.parse( request.query.attributes ) );

		const useNewCurves = request.query.useNewCurves ?? false;
		const lang = validateCountryCode(request.query.lang);
		let prices = await emporio(useNewCurves).getPriceList(item, lang, request.query.incVat)

		const showDecimals = (item.getProductName() == ProductNames.PRODUCT_LIBRARY_DESIGN && shouldShowDecimalsInShop(lang));

		const maxDecimals = showDecimals ? 2 : 0;

		let formattedPrices = prices.map(priceStep => {
			return {
				price: formatPrice(priceStep.price, lang, maxDecimals),
				unitPrice: priceStep.unitPrice,
				quantity: priceStep.quantity
			}
		});

		return {
			prices: formattedPrices
		};
	} )

	// add a route that calculates something called a bulk discount, you send in an array of product items and it returns that discount percentage
	f.post( '/bulk-discount', { schema: postBulkPricesSchema }, async function (request) {
		const items = request.body.items.map((item) => new ProductItem(item.productFamilyName, item.productName, item.attributes));
		let lang = validateCountryCode(request.body.lang);
		const incVat = request.body.incVat;

		let discount: number = 0;

		const totalUnits = items.reduce((acc: number, item: ProductItem) => acc + emporioBulk.calculateUnits(item), 0);

		let totalUnitsTotalPrice = 0;
		let normalTotalPrice = 0;
		let customStickerItems = 0;

		const currency = getCurrency(lang);
		const converter = new CurrencyConverter();

		for (const item of items) {
			if (item.getProductFamilyName() == "custom_sticker") {				
				customStickerItems++;
				const units = emporioBulk.calculateUnits(item);
				const normalPrice = await emporioBulk.calculatePriceByUnits(item, units, lang, incVat);
				normalTotalPrice += normalPrice.total;
				
				const family = emporioBulk.getProductService().retrieveProductFamily(item.getProductFamilyName());
				const priceProvider = emporioBulk.getProductService().retrievePriceProvider(family.getPriceProviderName()) as RateBasedProductPriceProvider;

				const rates = await priceProvider.getRatesFor(item, totalUnits);
				const breakdown = priceProvider.getBreakdownFor(rates, units);
				const total = calculateBreakdownSum(breakdown);

				const result =  toMajorUnits(converter.convertPrice({
					total,
					breakdown,
					currency: Currencies.USD
				}, currency));

				totalUnitsTotalPrice += result.total;
			}
		}

		if (normalTotalPrice > 0 && customStickerItems > 1) {
			let difference = normalTotalPrice - totalUnitsTotalPrice;
			discount = difference * 0.3;

			if (discount / normalTotalPrice > 0.2) {
				discount = normalTotalPrice * 0.2;
			}
		}

		return {
			discount
		}
	})
}