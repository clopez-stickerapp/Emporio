import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const ProductionInstructionValues = {
	MANUAL: "manual",
	CUT_SQUARE_COLOR_BLEED: "cut_square_color_bleed",
};

export const ProductionInstructionAttribute = new ProductAttr({
	name: "production_instruction",
	type: ProductAttrValueType.STRING,
	values: Object.values( ProductionInstructionValues ),
});