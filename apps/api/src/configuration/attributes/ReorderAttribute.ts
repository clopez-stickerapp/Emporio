import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const ReorderAttribute = new ProductAttr({
	name: "reorder_id",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});