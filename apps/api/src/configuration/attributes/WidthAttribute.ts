import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const WidthAttribute = new ProductAttr({
	name: "width_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});