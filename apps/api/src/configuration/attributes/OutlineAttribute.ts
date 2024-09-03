import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const OutlineAttribute = new ProductAttr({
	name: "outline",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});