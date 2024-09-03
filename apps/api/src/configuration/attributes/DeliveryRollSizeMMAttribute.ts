import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const DeliveryRollSizeDefaultMM = 76;

export const DeliveryRollSizeMMAttribute = new ProductAttr({
	name: "delivery_roll_size_mm",
	type: ProductAttrValueType.INT,
	values: [DeliveryRollSizeDefaultMM],
});