import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const MinSizeValues = {
	MIN_SIZE_SPECIAL_STS: 6,
	MIN_SIZE_DEFAULT: 25,
	MIN_SIZE_BIGGER: 150,
	MIN_SIZE_SHEET_CUSTOMIZABLE: 50,
	MIN_SIZE_SHEET_LEGACY: 200,
	MIN_SIZE_ADMIN: 5,
	MIN_SIZE_STICKER_ON_SHEET: 10,
};

export const MinSizeAttribute = new ProductAttr({
	name: "min_size_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [
		MinSizeValues.MIN_SIZE_SPECIAL_STS,
		MinSizeValues.MIN_SIZE_DEFAULT,
		MinSizeValues.MIN_SIZE_BIGGER,
		MinSizeValues.MIN_SIZE_SHEET_CUSTOMIZABLE,
		MinSizeValues.MIN_SIZE_SHEET_LEGACY,
		MinSizeValues.MIN_SIZE_ADMIN,
		MinSizeValues.MIN_SIZE_STICKER_ON_SHEET,
	],
});