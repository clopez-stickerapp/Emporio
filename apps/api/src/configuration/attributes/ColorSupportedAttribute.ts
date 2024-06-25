import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const ColorSupportedAttribute = new ProductAttr({
	name: "color_supported",
	type: ProductAttrValueType.BOOL,
	values: [true, false] 
});