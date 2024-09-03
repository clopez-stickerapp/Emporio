import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const DeliveryRollItemDefaultMargin = 4;

export const DeliveryRollItemMarginAttribute = new ProductAttr({
	name: "delivery_roll_item_margin",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});