import { Static, Type } from "@sinclair/typebox";
import { Attributes, AttributeValueMulti, FamilyName, ProductItem, ProductName, UseFilters } from "./shared";

export const GetFamiliesQuery = Type.Object( {
	name: Type.Optional( Type.String() )
} );

export type GetFamiliesQueryT = Static<typeof GetFamiliesQuery>;

export const GetFamiliesResponse = Type.Object( {
	families: Type.Record( Type.String(), Type.Object( {
		name: Type.String(),
		supported: Type.Array( Type.String() ),
		required: Type.Array( Type.String() ),
		products: Type.Record( Type.String(), Type.Object( {
			name: Type.String(),
			attributes: Attributes,
			sku: Type.String(),
			available: Type.Boolean()
		} ) ),
	} ) )
} );

export type GetFamiliesResponseT = Static<typeof GetFamiliesResponse>;

export const GetAttributesQuery = Type.Object( {
	name: Type.Optional( Type.String() )
} );

export type GetAttributesQueryT = Static<typeof GetAttributesQuery>;

export const GetAttributesResponse = Type.Object( {
	attributes: Type.Record( Type.String(), Type.Object( {
		name: Type.String(),
		values: AttributeValueMulti,
		dynamic: Type.Boolean(),
		multi: Type.Boolean(),
		type: Type.String()
	} ) )
} );

export type GetAttributesResponseT = Static<typeof GetAttributesResponse>;

export const GetAttributesMapResponse = Type.Object( {
	attributes: Type.Any(),
} );

export type GetAttributesMapResponseT = Static<typeof GetAttributesMapResponse>;

export const GetMinimumQuantityQuery = Type.Object( {
	attributes: Type.String()
} );

export type GetMinimumQuantityQueryT = Static<typeof GetMinimumQuantityQuery>;

export const GetMinimumQuantityResponse = Type.Object( {
	minimumQuantity: Type.Number()
} );

export type GetMinimumQuantityResponseT = Static<typeof GetMinimumQuantityResponse>;

export const GetConditionableMapResponse = Type.Object( {
	map: Type.Record( Type.String(), Type.Any() ),
} );

export type GetConditionableMapResponseT = Static<typeof GetConditionableMapResponse>;

export const ValidationQuery = Type.Object( {
	attributes: Type.String(),
	allowUnsupportedAttributeAliases: Type.Boolean(),
	allowUnsuggestedAttributeValues: Type.Boolean(),
	checkAgainstFilteredValues: UseFilters
} );

export type ValidationQueryT = Static<typeof ValidationQuery>;

export const ValidationResponse = Type.Object( {
	validation: Type.Object( {
		valid: Type.Boolean(),
		error: Type.Optional( Type.Object( {
			name: Type.String(),
			message: Type.String()
		} ) )
	} )
} );

export type ValidationResponseT = Static<typeof ValidationResponse>;

export const CreateItemQuery = Type.Object( {
	useFilters: UseFilters
} );

export type CreateItemQueryT = Static<typeof CreateItemQuery>;

export const CreateItemResponse = ProductItem;

export type CreateItemResponseT = Static<typeof CreateItemResponse>;

export const GetSizeDetailsQuery = Type.Object( {
	attributes: Type.String(),
	useFilters: UseFilters
} );

export type GetSizeDetailsQueryT = Static<typeof GetSizeDetailsQuery>;

export const GetSizeDetailsResponse = Type.Record( Type.String(), Type.Any() );

export type GetSizeDetailsResponseT = Static<typeof GetSizeDetailsResponse>;

export const IsAttributeAvailableResponse = Type.Object( { 
	available: Type.Boolean() 
} );

export type IsAttributeAvailableResponseT = Static<typeof IsAttributeAvailableResponse>;

export const IsAttributeAvailableQuery = Type.Object( {
	item: Type.String(),
	useFilters: UseFilters
} );

export type IsAttributeAvailableQueryT = Static<typeof IsAttributeAvailableQuery>;

export const isAttributeRequiredQuery = Type.Object( {
	family: FamilyName,
	name: ProductName
} )

export type isAttributeRequiredQueryT = Static<typeof isAttributeRequiredQuery>;

export const isAttributeRequiredResponse = Type.Object( { 
	required: Type.Boolean() 
} );

export type isAttributeRequiredResponseT = Static<typeof isAttributeRequiredResponse>;

export const GetFixedQuantityQuery = Type.Object( {
	attributes: Type.String(),
	useFilters: UseFilters
} );

export type GetFixedQuantityQueryT = Static<typeof GetFixedQuantityQuery>;

export const GetFixedQuantityResponse = Type.Object( { 
	fixedQuantity: Type.Boolean() 
} );

export type GetFixedQuantityResponseT = Static<typeof GetFixedQuantityResponse>;

export const GetLegacySKUQuery = Type.Object( {
	attributes: Type.String()
} );

export type GetLegacySKUQueryT = Static<typeof GetLegacySKUQuery>;

export const GetLegacySKUResponse = Type.Object( {
	legacySKU: Type.Number()
} );

export type GetLegacySKUResponseT = Static<typeof GetLegacySKUResponse>;

export const GetOutOfStockResponse = Type.Object( {
	outOfStock: Type.Array( Type.String() )
} );

export type GetOutOfStockResponseT = Static<typeof GetOutOfStockResponse>;

export const ErrorResponse = Type.Object( { 
	message: Type.String() 
} );

export type ErrorResponseT = Static<typeof ErrorResponse>;