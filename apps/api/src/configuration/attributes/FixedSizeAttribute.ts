import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const FixedSizeAttribute = new ProductAttr({
	name: "fixed_size",
	type: ProductAttrValueType.BOOL,
	dynamicvalue: true,
});