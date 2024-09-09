import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const FigureAttribute = new ProductAttr({
	name: "figure_id",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});