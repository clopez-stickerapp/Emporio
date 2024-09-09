import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const SheetTypeValues = {
	SINGLE: "single",
	SHEET: "sheet",
	SKIN: "skin",
	DIE_CUT: "die_cut",
	GIFTCARD: "giftcard",
	STICKER_PACK: "sticker_pack",
	STICKER_FREEBIE: "sticker_freebie",
};

export const SheetTypeAttribute = new ProductAttr({
	name: "sheet_type",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
	values: [
		SheetTypeValues.SINGLE,
		SheetTypeValues.SHEET,
		SheetTypeValues.SKIN,
		SheetTypeValues.DIE_CUT,
		SheetTypeValues.GIFTCARD,
		SheetTypeValues.STICKER_PACK,
		// SheetTypeValues.STICKER_FREEBIE,
	],
});