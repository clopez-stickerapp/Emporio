import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const ReorderAttribute = new ProductAttr({
	name: "reorder_id",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});