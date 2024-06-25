import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const MaterialColorAttribute = new ProductAttr({
	name: "material_color",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});