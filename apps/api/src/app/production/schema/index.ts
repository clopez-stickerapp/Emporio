import { attributes, FamilyName, ProductName } from "$/helpers/TypeHelper";
import { Type } from "@sinclair/typebox";
import { 
	ErrorResponse, 
	GetItemWithoutProductionSettingsQuery, 
	GetItemWithoutProductionSettingsResponse, 
	GetItemWithProductionSettingsQuery, 
	GetItemWithProductionSettingsResponse,
} from "@stickerapp-org/emporio-api-contract";

GetItemWithProductionSettingsQuery.properties.attributes.examples = [ JSON.stringify( attributes ) ];

export const getItemWithProductionSettingsSchema = {
	operationId: 'getItemWithProductionSettings',
	tags: [ 'Production' ],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: GetItemWithProductionSettingsQuery,
	response: {
		200: GetItemWithProductionSettingsResponse,
		400: ErrorResponse
	}
}

GetItemWithoutProductionSettingsQuery.properties.attributes.examples = [ JSON.stringify( { 
	...attributes,
	'production_line': 'laser',
	'cut_direction': 'auto'	
} ) ];

export const getItemWithoutProductionSettingsSchema = {
	operationId: 'getItemWithoutProductionSettings',
	tags: [ 'Production' ],
	params: Type.Object( {
		family: FamilyName,
		name: ProductName
	} ),
	querystring: GetItemWithoutProductionSettingsQuery,
	response: {
		200: GetItemWithoutProductionSettingsResponse,
		400: ErrorResponse
	}
}