import { ProductAttrValue } from "$/product/attribute/ProductAttrValue";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";
import { NamedConfig } from "../../data/NamedConfig";

export interface AttributeConfig extends NamedConfig{
	type: ProductAttrValueType;
	multivalue?: boolean;
	dynamicvalue?: boolean;
	values?: ProductAttrValue[];
}