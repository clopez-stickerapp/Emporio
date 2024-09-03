import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const MinSizes = {
	SPECIAL_STS: 6,
	DEFAULT: 25,
	BIGGER: 150,
	SHEET_CUSTOMIZABLE: 50,
	SHEET_LEGACY: 200,
	ADMIN: 5,
	STICKER_ON_SHEET: 10,
};

export const MinSizeAttribute = new ProductAttr({
	name: "min_size_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [
		MinSizes.SPECIAL_STS,
		MinSizes.DEFAULT,
		MinSizes.BIGGER,
		MinSizes.SHEET_CUSTOMIZABLE,
		MinSizes.SHEET_LEGACY,
		MinSizes.ADMIN,
		MinSizes.STICKER_ON_SHEET,
	],
});