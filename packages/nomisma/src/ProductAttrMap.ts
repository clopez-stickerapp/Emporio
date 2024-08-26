import { ProductAttrFilterMode } from "./ProductAttrFilterMode";
import { ProductAttrValueType } from "./ProductAttrValueType";
import { AttributeValueMulti } from "./AttributeValue";

export type TProductAttrMapValue = {
	alias: string,
	isDynamicValue: boolean,
	isMultiValue: boolean,
	valueType: ProductAttrValueType,
	isRequired: boolean,
	valuesAndConstraints: Record<string, string | null>,
	icons: Record<string, string>,
	filters: ProductAttributeFilter[],
	filterMode: ProductAttrFilterMode | null,
	outOfStockValues: AttributeValueMulti
}

export type TProductAttrMap = Record<string, TProductAttrMapValue>

export type ProductAttributeFilter = {
	values: AttributeValueMulti;
	conditions: string;
	conditionsComplexityScore: number;
}
