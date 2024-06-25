import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const QuantityAttribute = new ProductAttr({
	name: "quantity",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});