import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const TemplateAttribute = new ProductAttr({
	name: "template_id",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});