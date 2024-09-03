import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const ChangedAttribute = new ProductAttr({
	name: "changed",
	type: ProductAttrValueType.INT,
	dynamicvalue: true
})