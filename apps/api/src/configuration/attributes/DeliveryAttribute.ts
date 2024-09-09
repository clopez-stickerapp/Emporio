import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const DeliveryTypes = {
	SINGLE: "single",
	SHEET: "sheet",
	ROLL: "roll"
}

export const DeliveryAttribute = new ProductAttr({
	name: "delivery",
	type: ProductAttrValueType.STRING,
	values: [
		DeliveryTypes.SINGLE,
		DeliveryTypes.SHEET,
		DeliveryTypes.ROLL,
	]
});