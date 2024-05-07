import { Type } from "@sinclair/typebox";
import * as TypeHelper from "$/Helper/TypeHelper";

export const getCreateItemSchema = {
	operationId: 'createItem',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		useFilters: TypeHelper.UseFilters()
	} ),
	response: {
		200: TypeHelper.ProductItem(),
		400: TypeHelper.Error()
	},
}

export const getAttributeMapSchema = {
	operationId: 'getAttributeMap',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	response: {
		200: Type.Object( {
			attributes: Type.Any(),
		} ),
		400: TypeHelper.Error()
	}
}

export const getMinimumQuantitySchema = {
	operationId: 'getMinimumQuantity',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesString()
	} ),
	response: {
		200: Type.Object( {
			minimumQuantity: Type.Number()
		} ),
		400: TypeHelper.Error()
	}
}

export const getConditionableMapSchema = {
	operationId: 'getConditionableMap',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
	} ),
	response: {
		200: Type.Object( {
			map: Type.Record( Type.String(), Type.Any() ),
		} ),
		400: TypeHelper.Error()
	}
}

export const getValidationSchema = {
	operationId: 'validate',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesString(),
		units: Type.Number(),
		allowUnsupportedAttributeAliases: Type.Boolean(),
		allowUnsuggestedAttributeValues: Type.Boolean(),
		checkAgainstFilteredValues: TypeHelper.UseFilters()
	} ),
	response: {
		200: Type.Object( {
			validation: Type.Object( {
				valid: Type.Boolean(),
				error: Type.Optional( Type.Object( {
					name: Type.String(),
					message: Type.String()
				} ) )
			} )
		} ),
		400: TypeHelper.Error()
	}
}

export const getSizeDetailsSchema = {
	operationId: 'getSizeDetails',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesString(),
		useFilters: TypeHelper.UseFilters()
	} ),
	response: {
		200: Type.Record( Type.String(), Type.Any() ),
		400: TypeHelper.Error()
	}
}

export const isAttributeAvailableSchema = {
	operationId: 'isAttributeAvailable',
	params: Type.Object( {
		name: Type.String(),
		value: TypeHelper.AttributeValueSingle()
	} ),
	querystring: Type.Object( {
		item: TypeHelper.ProductItemString(),
		useFilters: TypeHelper.UseFilters()
	} ),
	response: {
		200: Type.Object( { available: Type.Boolean() } ),
		400: TypeHelper.Error()
	}
}

export const isAttributeRequiredSchema = {
	operationId: 'isAttributeRequired',
	params: Type.Object( {
		name: Type.String()
	} ),
	querystring: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	response: {
		200: Type.Object( { required: Type.Boolean() } ),
		400: TypeHelper.Error()
	}
}

export const getFixedQuantitySchema = {
	operationId: 'getFixedQuantityEvaluated',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesString(),
		useFilters: TypeHelper.UseFilters()
	} ),
	response: {
		200: Type.Object( { fixedQuantity: Type.Boolean() } ),
		400: TypeHelper.Error()
	}
}

export const getFamiliesSchema = {
	operationId: 'getFamilies',
	querystring: Type.Object( {
		name: Type.Optional( TypeHelper.ProductFamily() )
	} ),
	response: {
		200: Type.Object( {
			families: Type.Record( Type.String(), Type.Object( {
				name: Type.String(),
				supported: Type.Array( Type.String() ),
				required: Type.Array( Type.String() ),
				products: Type.Record( Type.String(), Type.Object( {
					name: Type.String(),
					attributes: TypeHelper.Attributes(),
					sku: Type.String(),
					inStock: Type.Boolean()
				} ) ),
			} ) )
		} ),
		400: TypeHelper.Error()
	}
}

export const getAttributesSchema = {
	operationId: 'getAttributes',
	querystring: Type.Object( {
		name: Type.Optional( TypeHelper.AttributeUID() )
	} ),
	response: {
		200: Type.Object( {
			attributes: Type.Record( Type.String(), Type.Object( {
				name: Type.String(),
				values: TypeHelper.AttributeValueMulti(),
				dynamic: Type.Boolean(),
				multi: Type.Boolean(),
				type: Type.String()
			} ) )
		} ),
		400: TypeHelper.Error()
	}
}

export const getLegacySKUSchema = {
	operationId: 'getLegacySKU',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesString()
	} ),
	response: {
		200: Type.Object( {
			legacySKU: Type.Number()
		} ),
		400: TypeHelper.Error()
	}
}

export const getOutOfStockSchema = {
	operationId: 'getOutOfStock',
	params: Type.Object( {
		family: TypeHelper.ProductFamily()
	} ),
	response: {
		200: Type.Object( {
			outOfStock: Type.Array( Type.String() )
		} ),
		400: TypeHelper.Error()
	}
}