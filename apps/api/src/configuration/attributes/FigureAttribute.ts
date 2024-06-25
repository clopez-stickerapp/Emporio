import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const FigureAttribute = new ProductAttr({
	name: "figure_id",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});