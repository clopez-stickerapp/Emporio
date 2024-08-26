import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const StickerSheetNameValues = {
	CONTOUR: "path",
	SQUARE: "square",
	RECTANGLE: "rect",
	ROUND: "circle",
	OVAL: "oval",
	ROUNDED: "rounded",
	STICKER_INDIVIDUAL: "sticker_individual",
	STICKER: "sticker",
	SHEET: "sheet",
	TEMPLATE: "template",
	MANUAL: "manual",
};

export const StickerSheetNameAttribute = new ProductAttr({
	name: "sheet_name",
	type: ProductAttrValueType.STRING,
	values: [
		StickerSheetNameValues.RECTANGLE,
		StickerSheetNameValues.CONTOUR,
		StickerSheetNameValues.ROUND,
		StickerSheetNameValues.ROUNDED,
		StickerSheetNameValues.STICKER_INDIVIDUAL,
		StickerSheetNameValues.STICKER,
		StickerSheetNameValues.SHEET,
		StickerSheetNameValues.TEMPLATE,
		StickerSheetNameValues.MANUAL,
		// StickerSheetNameValues.OVAL,
		// StickerSheetNameValues.SQUARE,
	],
});