import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const DeliveryRollSizeTypes = {
	MIN: 32,
	SMALL: 35,
	MEDIUM: 56,
	LARGE: 70,
	XLARGE: 93,
	XXLARGE: 140,
	MAX: 280,
}

export const DeliveryRollSizeTypeAttribute = new ProductAttr({
	name: "delivery_roll_size_type",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [
		// DeliveryRollSizeTypes.MIN,
		DeliveryRollSizeTypes.SMALL,
		DeliveryRollSizeTypes.MEDIUM,
		DeliveryRollSizeTypes.LARGE,
		DeliveryRollSizeTypes.XLARGE,
		DeliveryRollSizeTypes.XXLARGE,
		DeliveryRollSizeTypes.MAX,
	],
});