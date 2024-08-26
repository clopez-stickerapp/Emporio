import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const FixedQuantityAttribute = new ProductAttr({
	name: "fixed_quantity",
	type: ProductAttrValueType.BOOL,
	dynamicvalue: true,
});