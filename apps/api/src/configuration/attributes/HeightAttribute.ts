import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const HeightAttribute = new ProductAttr({
	name: "height_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});