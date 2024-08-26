import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const MaxSizes = {
	LASER: 275,
	DIGITAL: 1250,
	SHEET_LEGACY: 300,
	ONE_SIDE_LASER: 800,
	ROLL: 980,
	TRANSFER_TAPE: 1130,
};

export const MaxSizeAttribute = new ProductAttr({
	name: "max_size_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [
		MaxSizes.LASER,
		MaxSizes.DIGITAL,
		MaxSizes.SHEET_LEGACY,
		MaxSizes.ONE_SIDE_LASER,
		MaxSizes.ROLL,
		MaxSizes.TRANSFER_TAPE,
	],
});