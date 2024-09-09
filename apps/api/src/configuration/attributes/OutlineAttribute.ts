import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const OutlineAttribute = new ProductAttr({
	name: "outline",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});