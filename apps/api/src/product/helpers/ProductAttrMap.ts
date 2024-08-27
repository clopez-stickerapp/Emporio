import { ProductAttrFilterMode } from "../attribute/Filter/ProductAttrFilterMode";
import { ProductAttrValueType } from "../attribute/ProductAttrValueType";
import { AttributeValueMulti } from "../attribute/AttributeValue";
import { Filter } from "../attribute/Filter/ProductAttrFilter";

export type AttributeMap = {
	alias: string,
	isDynamicValue: boolean,
	isMultiValue: boolean,
	valueType: ProductAttrValueType,
	isRequired: boolean,
	valuesAndConstraints: Record<string, string | null>,
	icons: Record<string, string>,
	filters: Filter[],
	filterMode: ProductAttrFilterMode | null,
	outOfStockValues: AttributeValueMulti
}

export type AttributesMap = Record<string, AttributeMap>