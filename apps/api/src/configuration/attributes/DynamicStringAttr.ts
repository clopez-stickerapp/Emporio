import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const DynamicStringAttr = new ProductAttr({
	name: "dynamic_string",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});