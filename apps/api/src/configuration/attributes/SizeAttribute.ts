import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const SizeAttribute = new ProductAttr({
	name: "size",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});