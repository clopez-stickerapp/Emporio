import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const DynamicStringAttr = new ProductAttr({
	name: "dynamic_string",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});