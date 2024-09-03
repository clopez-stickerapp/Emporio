import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const MaterialValues = {
	WHITE: "white",
	WHITE_HI_TACK: "white_hi_tack",
	WHITE_REMOVABLE: "white_removable",
	WHITE_WALL: "white_wall",
	WHITE_THIN: "white_thin",
	PAPER_THIN: "paper_thin",
	CLEAR_THIN: "clear_thin",
	KRAFT_THIN: "kraft_thin",
	SILVER_THIN: "silver_thin",
	WHITE_COVERALL: "white_coverall",
	WHITE_PAPER: "white_paper",
	WHITE_BACKSCORE: "white_backscore",
	WHITE_STURDY: "white_sturdy",
	CLEAR_BACKSCORE: "clear_backscore",
	HOLOGRAPHIC: "holographic",
	PIXIE_DUST: "pixie_dust",
	KRAFT_PAPER: "kraft_paper",
	PRISMATIC: "prismatic",
	MIRROR: "mirror",
	GITD: "gitd",
	BRUSHED_ALLOY: "brushed_alloy",
	CLEAR: "clear",
	GLITTER: "glitter",
	BUBBLE_FREE: "bubble_free",
	SKIN: "skin",
	COLORED_VINYL: "colored_vinyl",
	METALLIC_GOLD: "metallic_gold",
	METALLIC_SILVER: "metallic_silver",
	FROSTED: "frosted",
	FLUORESCENT: "fluorescent",
	SATIN_MATTE: "satin_matte",
	WARRANTY: "warranty",
	REFLECTIVE: "reflective",
	MAGNETIC: "magnetic",
	HEAT_TRANSFER: "heat_transfer",
	SPECIAL: "special",
};

export const MaterialsLabelsOnRollValues = [
	MaterialValues.WHITE_THIN,
	MaterialValues.CLEAR_THIN,
	MaterialValues.KRAFT_THIN,
	MaterialValues.SILVER_THIN,
];

export const MaterialAttribute = new ProductAttr({
	name: "material",
	type: ProductAttrValueType.STRING,
	values: Object.values(MaterialValues),
});
