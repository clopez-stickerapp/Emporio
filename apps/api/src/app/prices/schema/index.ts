import { FormattedPrice } from "$/Commerce/Core/Price/Price";
import { Type } from "@sinclair/typebox";
import * as TypeHelper from "$/Helper/TypeHelper"
import { FormattedPriceList } from "$/Emporio";

const querySchema = Type.Object({
	attributes: TypeHelper.AttributesQ(),
	lang: Type.String({ examples: ['us'] }),
	incVat: Type.Boolean({ default: true }),
});

export const getPricesSchema = {
	operationId: 'getPrices',
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