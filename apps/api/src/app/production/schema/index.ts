import { Type } from "@sinclair/typebox";
import * as TypeHelper from "$/helpers/TypeHelper";

export const getItemWithProductionSettingsSchema = {
	operationId: 'getItemWithProductionSettings',
	tags: ['Production'],
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesString(),
		useFilters: TypeHelper.UseFilters()
	} ),
	response: {
		200: Type.Object( { 
			item: TypeHelper.ProductItem( true ) 
		} ),
		400: TypeHelper.Error()
	}
}

export const getItemWithoutProductionSettingsSchema = {
	operationId: 'getItemWithoutProductionSettings',
	tags: ['Production'],
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesString( true ),
		useFilters: TypeHelper.UseFilters()
	} ),
	response: {
		200: Type.Object( { 
			item: TypeHelper.ProductItem() 
		} ),
		400: TypeHelper.Error()
	}
}