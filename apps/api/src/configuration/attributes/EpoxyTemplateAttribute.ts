import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const EpoxyTemplateAttribute = new ProductAttr({
	name: "epoxy_template_id",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});