import { attributeNames, attributes, familyNames, FamilyName, productNames, ProductName, productItem } from "$/helpers/TypeHelper";
import { Type } from "@sinclair/typebox";
import { 
	AttributeValueSingle, 
	CreateItemQuery, 
	CreateItemResponse, 
	ErrorResponse, 
	GetAttributesMapResponse, 
	GetAttributesQuery, 
	GetAttributesResponse, 
	GetConditionableMapResponse, 
	GetFamiliesQuery, 
	GetFamiliesResponse, 
	GetFixedQuantityQuery, 
	GetFixedQuantityResponse, 
	GetLegacySKUQuery, 
	GetLegacySKUResponse, 
	GetMinimumQuantityQuery, 
	GetMinimumQuantityResponse, 
	GetOutOfStockResponse, 
	GetSizeDetailsQuery, 
	GetSizeDetailsResponse, 
	IsAttributeAvailableQuery, 
	IsAttributeAvailableResponse, 
	isAttributeRequiredQuery, 
	isAttributeRequiredResponse, 
	ValidationQuery, 
	ValidationResponse,
} from "@stickerapp-org/emporio-api-contract";

export const getCreateItemSchema = {
	operationId: 'createItem',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: CreateItemQuery,
	response: {
		200: CreateItemResponse,
		400: ErrorResponse
	},
}

export const getAttributeMapSchema = {
	operationId: 'getAttributeMap',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	response: {
		200: GetAttributesMapResponse,
		400: ErrorResponse
	}
}

GetMinimumQuantityQuery.properties.attributes.examples = [ JSON.stringify( attributes ) ];

export const getMinimumQuantitySchema = {
	operationId: 'getMinimumQuantity',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: GetMinimumQuantityQuery,
	response: {
		200: GetMinimumQuantityResponse,
		400: ErrorResponse
	}
}

export const getConditionableMapSchema = {
	operationId: 'getConditionableMap',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName,
	} ),
	response: {
		200: GetConditionableMapResponse,
		400: ErrorResponse
	}
}

ValidationQuery.properties.attributes.examples = [ JSON.stringify( attributes ) ];

export const getValidationSchema = {
	operationId: 'validate',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: ValidationQuery,
	response: {
		200: ValidationResponse,
		400: ErrorResponse
	}
}

GetSizeDetailsQuery.properties.attributes.examples = [ JSON.stringify( attributes ) ];

export const getSizeDetailsSchema = {
	operationId: 'getSizeDetails',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: GetSizeDetailsQuery,
	response: {
		200: GetSizeDetailsResponse,
		400: ErrorResponse
	}
}

IsAttributeAvailableQuery.properties.item.examples = [ JSON.stringify( productItem ) ];

export const isAttributeAvailableSchema = {
	operationId: 'isAttributeAvailable',
	tags: ['Product'],
	params: Type.Object( {
		name: Type.String( { examples: attributeNames } ),
		value: AttributeValueSingle
	} ),
	querystring: IsAttributeAvailableQuery,
	response: {
		200: IsAttributeAvailableResponse,
		400: ErrorResponse
	}
}

isAttributeRequiredQuery.properties.family.examples = familyNames;
isAttributeRequiredQuery.properties.name.examples = productNames;

export const isAttributeRequiredSchema = {
	operationId: 'isAttributeRequired',
	tags: ['Product'],
	params: Type.Object( {
		name: Type.String( { examples: attributeNames } )
	} ),
	querystring: isAttributeRequiredQuery,
	response: {
		200: isAttributeRequiredResponse,
		400: ErrorResponse
	}
}

GetFixedQuantityQuery.properties.attributes.examples = [ JSON.stringify( attributes ) ];

export const getFixedQuantitySchema = {
	operationId: 'getFixedQuantityEvaluated',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: GetFixedQuantityQuery,
	response: {
		200: GetFixedQuantityResponse,
		400: ErrorResponse
	}
}

GetFamiliesQuery.properties.name.examples = familyNames;

export const getFamiliesSchema = {
	operationId: 'getFamilies',
	tags: ['Product'],
	querystring: GetFamiliesQuery,
	response: {
		200: GetFamiliesResponse,
		400: ErrorResponse
	}
}

GetAttributesQuery.properties.name.examples = attributeNames;

export const getAttributesSchema = {
	operationId: 'getAttributes',
	tags: ['Product'],
	querystring: GetAttributesQuery,
	response: {
		200: GetAttributesResponse,
		400: ErrorResponse
	}
}

GetLegacySKUQuery.properties.attributes.examples = [ JSON.stringify( attributes ) ];

export const getLegacySKUSchema = {
	operationId: 'getLegacySKU',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: GetLegacySKUQuery,
	response: {
		200: GetLegacySKUResponse,
		400: ErrorResponse
	}
}

export const getOutOfStockSchema = {
	operationId: 'getOutOfStock',
	tags: ['Product'],
	params: Type.Object( {
		family: FamilyName
	} ),
	response: {
		200: GetOutOfStockResponse,
		400: ErrorResponse
	}
}