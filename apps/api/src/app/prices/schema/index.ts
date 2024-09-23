import { Type } from "@sinclair/typebox";
import { attributes, FamilyName, productItem, ProductName } from "$/helpers/TypeHelper";
import { 
	ErrorResponse, 
	GetPriceListResponse, 
	GetPricesResponse, 
	PostBulkPricesRequest, 
	PostBulkPricesResponse, 
	PriceQuery 
} from "@stickerapp-org/emporio-api-contract";

PriceQuery.properties.lang.examples = [ 'us' ];
PriceQuery.properties.attributes.examples = [ JSON.stringify( attributes ) ];

export const getPricesSchema = {
	operationId: 'getPrices',
	tags: ['Price'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: PriceQuery,
	response: {
		200: GetPricesResponse,
		400: ErrorResponse
	},
}

export const getPriceListSchema = {
	operationId: 'getPriceList',
	tags: ['Price'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: PriceQuery,
	response: {
		200: GetPriceListResponse,
		400: ErrorResponse
	},
}

PostBulkPricesRequest.properties.lang.examples = [ 'us' ];
PostBulkPricesRequest.properties.items.items.examples = [ JSON.stringify( productItem ) ];

export const postBulkPricesSchema = {
	operationId: 'postBulkPrices',
	tags: ['Price'],
	body: PostBulkPricesRequest,
	response: {
		200: PostBulkPricesResponse,
		400: ErrorResponse
	},
}