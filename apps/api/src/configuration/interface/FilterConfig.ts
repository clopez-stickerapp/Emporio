import { ProductAttrFilterMode } from "$/product/attribute/Filter/ProductAttrFilterMode";
import { RuleConfig } from "./RuleConfig";

export interface FilterConfig<T = string[]> extends RuleConfig<T> {
	mode: ProductAttrFilterMode
};