import { ProductAttrFilterMode } from "./ProductAttrFilterMode";
import { ProductAttrValueType } from "./ProductAttrValueType";
import { AttributeValueMulti } from "./AttributeValue";

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

export type Filter = {
	name: string;
	values: AttributeValueMulti;
	conditions: string;
	conditionsComplexityScore: number;
}