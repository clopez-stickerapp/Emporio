import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const WidthAttribute = new ProductAttr({
	name: "width_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});