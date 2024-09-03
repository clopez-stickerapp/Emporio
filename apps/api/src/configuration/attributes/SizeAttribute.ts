import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const SizeAttribute = new ProductAttr({
	name: "size",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});