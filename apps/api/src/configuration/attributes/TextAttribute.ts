import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const TextAttribute = new ProductAttr({
	name: "text",
	type: ProductAttrValueType.STRING,
});