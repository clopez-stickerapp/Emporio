import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export enum DeliveryType {
	SINGLE = "single",
	SHEET = "sheet",
	ROLL = "roll"
}

export const DeliveryAttribute = new ProductAttr({
	name: "delivery",
	type: ProductAttrValueType.STRING,
	values: [
		DeliveryType.SINGLE,
		DeliveryType.SHEET,
		DeliveryType.ROLL,
	]
});