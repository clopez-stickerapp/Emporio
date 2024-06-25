import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const FixedQuantityAttribute = new ProductAttr({
	name: "fixed_quantity",
	type: ProductAttrValueType.BOOL,
	dynamicvalue: true,
});