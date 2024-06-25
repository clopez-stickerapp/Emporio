import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const TemplateAttribute = new ProductAttr({
	name: "template_id",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});