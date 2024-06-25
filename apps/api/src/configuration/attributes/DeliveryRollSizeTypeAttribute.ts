import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export enum DeliveryRollSizeType {
	MIN = 32,
	SMALL = 35,
	MEDIUM = 56,
	LARGE = 70,
	XLARGE = 93,
	XXLARGE = 140,
	FULL_WIDTH = 280,
}

export const DeliveryRollSizeTypeAttribute = new ProductAttr({
	name: "delivery_roll_size_type",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [
		// DeliveryRollSizeType.MIN,
		DeliveryRollSizeType.SMALL,
		DeliveryRollSizeType.MEDIUM,
		DeliveryRollSizeType.LARGE,
		DeliveryRollSizeType.XLARGE,
		DeliveryRollSizeType.XXLARGE,
		DeliveryRollSizeType.FULL_WIDTH,
	],
});