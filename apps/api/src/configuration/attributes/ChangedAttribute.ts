import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const ChangedAttribute = new ProductAttr({
	name: "changed",
	type: ProductAttrValueType.INT,
	dynamicvalue: true
})