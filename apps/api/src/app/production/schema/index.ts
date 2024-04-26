import { Type } from "@sinclair/typebox";
import * as TypeHelper from "$/Helper/TypeHelper";

export const getItemWithProductionSettingsSchema = {
	operationId: 'getItemWithProductionSettings',
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesQ(),
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
	params: Type.Object( {
		family: TypeHelper.ProductFamily(),
		name: TypeHelper.ProductName()
	} ),
	querystring: Type.Object( {
		attributes: TypeHelper.AttributesQ( true ),
		useFilters: TypeHelper.UseFilters()
	} ),
	response: {
		200: Type.Object( { 
			item: TypeHelper.ProductItem() 
		} ),
		400: TypeHelper.Error()
	}
}