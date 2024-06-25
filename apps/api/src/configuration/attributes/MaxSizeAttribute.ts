import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const MaxSizeValues = {
	MAX_SIZE_LASER: 275,
	MAX_SIZE_DIGITAL: 1250,
	MAX_SIZE_SHEET_LEGACY: 300,
	MAX_SIZE_ONE_SIDE_LASER: 800,
	MAX_SIZE_ROLL: 980,
	MAX_SIZE_TRANSFER_TAPE: 1130,
};

export const MaxSizeAttribute = new ProductAttr({
	name: "max_size_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [
		MaxSizeValues.MAX_SIZE_LASER,
		MaxSizeValues.MAX_SIZE_DIGITAL,
		MaxSizeValues.MAX_SIZE_SHEET_LEGACY,
		MaxSizeValues.MAX_SIZE_ONE_SIDE_LASER,
		MaxSizeValues.MAX_SIZE_ROLL,
		MaxSizeValues.MAX_SIZE_TRANSFER_TAPE,
	],
});