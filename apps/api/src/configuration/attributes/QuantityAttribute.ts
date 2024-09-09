import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const QuantityAttribute = new ProductAttr({
	name: "quantity",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});