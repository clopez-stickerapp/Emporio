import { Static, Type } from "@sinclair/typebox";
import { ProductItem, UseFilters } from "./shared";

export const GetItemWithProductionSettingsQuery = Type.Object( {
	attributes: Type.String(),
	useFilters: UseFilters
} );

export type GetItemWithProductionSettingsQueryT = Static<typeof GetItemWithProductionSettingsQuery>;

export const GetItemWithProductionSettingsResponse = Type.Object( { 
	item: ProductItem
} );

export type GetItemWithProductionSettingsResponseT = Static<typeof GetItemWithProductionSettingsResponse>;

export const GetItemWithoutProductionSettingsQuery = Type.Object( {
	attributes: Type.String(),
	useFilters: UseFilters
} );

export type GetItemWithoutProductionSettingsQueryT = Static<typeof GetItemWithoutProductionSettingsQuery>;

export const GetItemWithoutProductionSettingsResponse = Type.Object( { 
	item: ProductItem
} );

export type GetItemWithoutProductionSettingsResponseT = Static<typeof GetItemWithoutProductionSettingsResponse>;