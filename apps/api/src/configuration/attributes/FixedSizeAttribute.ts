import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const FixedSizeAttribute = new ProductAttr({
	name: "fixed_size",
	type: ProductAttrValueType.BOOL,
	dynamicvalue: true,
});