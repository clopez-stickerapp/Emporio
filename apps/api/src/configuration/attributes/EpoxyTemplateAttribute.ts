import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const EpoxyTemplateAttribute = new ProductAttr({
	name: "epoxy_template_id",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});