import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const PriceMarginPercentageAttribute = new ProductAttr({
	name: "price_margin_percentage",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});