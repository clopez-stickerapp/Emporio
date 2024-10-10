import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
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
	isAttributeRequiredSchema,
} from '../schema';
import { ProductItemBuilder } from '$/product/helpers/ProductItemBuilder';
import { ProductItem } from '@stickerapp-org/nomisma';

export default async function (fastify: FastifyInstance) {
	const f = fastify.withTypeProvider<TypeBoxTypeProvider>();

	const emporio = fastify.emporio;

	f.get('/item/:family/:name', { schema: getCreateItemSchema }, async function (request) {
		const service = emporio.getProductService();

		const productFamily = service.retrieveProductFamily(request.params.family);
		const product = productFamily.getProduct(request.params.name);
		const map = service.getProductMap(request.params.family, request.params.name);
		const builder = new ProductItemBuilder();
		const item = builder.createItem(productFamily, product, map, request.query.useFilters);

		return {
			productName: item.getProductName(),
			productFamilyName: item.getProductFamilyName(),
			attributes: item.getAttributes(),
			sku: product.getSku(),
		};
	});

	f.get('/minimum-quantity/:family/:name', { schema: getMinimumQuantitySchema }, async function (request) {
		const item = new ProductItem(request.params.family, request.params.name, JSON.parse(request.query.attributes));

		return { minimumQuantity: emporio.getMinimumQuantity(item) };
	});

	f.get('/attribute-map/:family/:name?', { schema: getAttributeMapSchema }, async function (request) {
		return {
			attributes: emporio.getProductService().getProductMap(request.params.family, request.params.name),
		};
	});

	f.get('/conditionable-map/:family', { schema: getConditionableMapSchema }, async function (request) {
		return { map: emporio.getConditionableMap(request.params.family) };
	});

	f.get('/validate/:family/:name', { schema: getValidationSchema }, async function (request) {
		const item = new ProductItem(request.params.family, request.params.name, JSON.parse(request.query.attributes));

		try {
			emporio.validate(
				item,
				request.query.allowUnsupportedAttributeAliases,
				request.query.allowUnsuggestedAttributeValues,
				request.query.checkAgainstFilteredValues,
			);
			return {
				validation: {
					valid: true,
				},
			};
		} catch (error: any) {
			return {
				validation: {
					valid: false,
					error: {
						name: error.name,
						message: error.message,
					},
				},
			};
		}
	});

	f.get('/size/:family/:name', { schema: getSizeDetailsSchema }, async function (request) {
		const item = new ProductItem(request.params.family, request.params.name, JSON.parse(request.query.attributes));
		return { sizeDetails: emporio.getSizeDetails(item, request.query.useFilters) };
	});

	f.get('/attribute/available/:name/:value', { schema: isAttributeAvailableSchema }, async function (request) {
		const itemJSON = JSON.parse(request.query.item);
		const item = new ProductItem(itemJSON.productFamilyName, itemJSON.productName, itemJSON.attributes);
		return {
			available: emporio.isAttributeAvailable(item, request.params.name, request.params.value, request.query.useFilters),
		};
	});

	f.get('/attribute/required/:name', { schema: isAttributeRequiredSchema }, async function (request) {
		return {
			required: emporio.isAttributeRequired(request.query.family, request.query.name, request.params.name),
		};
	});

	f.get('/attribute/fixed-quantity-evaluated/:family/:name', { schema: getFixedQuantitySchema }, async function (request) {
		const item = new ProductItem(request.params.family, request.params.name, JSON.parse(request.query.attributes));
		return { fixedQuantity: emporio.getFixedQuantityEvaluated(item, request.query.useFilters) };
	});

	f.get('/families', { schema: getFamiliesSchema }, async function (request) {
		const families: Record<string, any> = {};

		const productFamilies = request.query.name
			? [emporio.getProductService().retrieveProductFamily(request.query.name)]
			: emporio.getProductService().getProductFamilies();

		for (const family of productFamilies) {
			families[family.getName()] = {
				name: family.getName(),
				supported: Object.values(family.getAttributeManager().getAll()).map((attribute) => attribute.instance.getName()),
				required: Object.values(family.getAttributeManager().getAll())
					.filter((attribute) => attribute.required)
					.map((attribute) => attribute.instance.getName()),
				products: {},
			};
			for (const product of Object.values(family.getProducts())) {
				families[family.getName()].products[product.getName()] = {
					name: product.getName(),
					attributes: product.getAttributeManager().getAllValues(),
					sku: product.getSku(),
					available: product.isAvailable(),
				};
			}
		}

		return { families };
	});

	f.get('/attributes', { schema: getAttributesSchema }, async function (request) {
		const attributes: Record<string, any> = {};

		const attrs = request.query.name
			? [emporio.getProductService().retrieveAttribute(request.query.name)]
			: emporio.getProductService().getAttributes();

		for (const attribute of attrs) {
			attributes[attribute.getName()] = {
				name: attribute.getName(),
				values: attribute.getValues(),
				dynamic: attribute.isDynamicValue(),
				multi: attribute.isMultiValue(),
				type: attribute.getValueType(),
			};
		}

		return { attributes };
	});

	f.get('/legacy-sku/:family/:name', { schema: getLegacySKUSchema }, async function (request) {
		const item = new ProductItem(request.params.family, request.params.name, JSON.parse(request.query.attributes));
		return { legacySKU: emporio.getStickerAppLegacySKU(item) };
	});

	f.get('/out-of-stock/:family', { schema: getOutOfStockSchema }, async function (request) {
		const products = emporio.getProductService().retrieveProductFamily(request.params.family).getProducts();
		const unavailableProducts = Object.values(products).filter(
			(product) => !emporio.isProductAvailable(product.getProductFamilyName(), product.getName()),
		);
		return { outOfStock: unavailableProducts.map((product) => product.getName()) };
	});
}
