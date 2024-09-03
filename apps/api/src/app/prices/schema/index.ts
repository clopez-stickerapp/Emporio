import { Type } from "@sinclair/typebox";
import * as TypeHelper from "$/helpers/TypeHelper"
import { FormattedPriceList } from "$/Emporio";
import { FormattedPrice } from "$/prices/Price";

const querySchema = Type.Object({
	attributes: TypeHelper.AttributesString(),
	lang: Type.String({ examples: ['us'] }),
	incVat: Type.Boolean({ default: true }),
	useNewCurves: Type.Optional(Type.Boolean({ default: false })),
});

export const getPricesSchema = {
	operationId: 'getPrices',
	tags: ['Price'],
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: querySchema,
	response: {
		200: Type.Object({ 
			price: FormattedPrice,
			unitPrice: Type.Number(),
			unitPriceFormatted: Type.String(),
			quantity: Type.Number(),
		}),
		400: TypeHelper.Error()
	},
}

export const getPriceListSchema = {
	operationId: 'getPriceList',
	tags: ['Price'],
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: querySchema,
	response: {
		200: { prices: FormattedPriceList },
		400: TypeHelper.Error()
	},
}

export const postBulkPricesSchema = {
	operationId: 'postBulkPrices',
	tags: ['Price'],
	body: Type.Object({
		items: Type.Array( TypeHelper.ProductItem()	),
		lang: Type.String({ examples: ['us'] }),
		incVat: Type.Boolean({ default: true }),
	}),
	response: {
		200: Type.Object({ 
			discount: Type.Number(),
		}),
		400: TypeHelper.Error()
	},
}