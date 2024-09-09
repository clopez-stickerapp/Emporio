import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const TextAttribute = new ProductAttr({
	name: "text",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});