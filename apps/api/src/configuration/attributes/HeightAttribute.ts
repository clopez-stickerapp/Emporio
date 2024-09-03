import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const HeightAttribute = new ProductAttr({
	name: "height_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});