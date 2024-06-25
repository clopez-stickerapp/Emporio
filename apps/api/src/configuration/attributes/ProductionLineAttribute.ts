import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";
import { LaminateValues } from "./LaminateAttribute";
import { MaterialValues } from "./MaterialAttribute";

export const ProductionLineValues = {
	LASER: "laser",
	DIGITAL: "digital",
	SPECIAL: "special",
};

export const DigitalMaterials = [
	MaterialValues.WHITE,
	MaterialValues.WHITE_HI_TACK,
	MaterialValues.WHITE_STURDY,
	MaterialValues.WHITE_REMOVABLE,
	MaterialValues.WHITE_WALL,
	MaterialValues.SKIN,
	MaterialValues.BUBBLE_FREE,
	MaterialValues.CLEAR,
	MaterialValues.COLORED_VINYL,
	MaterialValues.METALLIC_GOLD,
	MaterialValues.METALLIC_SILVER,
	MaterialValues.FROSTED,
	MaterialValues.FLUORESCENT,
	MaterialValues.MAGNETIC,
	MaterialValues.WHITE_COVERALL,
	MaterialValues.SATIN_MATTE,
	MaterialValues.REFLECTIVE,
	MaterialValues.HEAT_TRANSFER,
];

export const DigitalLaminates = [
	LaminateValues.GLOSSY_UV,
	LaminateValues.GLOSSY_UV_12_MIL_HEAVY_DUTY,
	LaminateValues.SATIN_MATTE,
	LaminateValues.SANDY,
	LaminateValues.EPOXY,
	LaminateValues.PEBBLE,
	LaminateValues.SUPER_ROUGH,
	LaminateValues.WHITE_WINDOW,
	LaminateValues.UNCOATED,
	LaminateValues.GLOSSY_THIN,
];

export const LaserMaterials = [
	MaterialValues.WHITE,
	MaterialValues.WHITE_HI_TACK,
	MaterialValues.WHITE_REMOVABLE,
	MaterialValues.WHITE_BACKSCORE,
	MaterialValues.WHITE_THIN,
	MaterialValues.PAPER_THIN,
	MaterialValues.CLEAR_THIN,
	MaterialValues.KRAFT_THIN,
	MaterialValues.SILVER_THIN,
	MaterialValues.WARRANTY,
	MaterialValues.HOLOGRAPHIC,
	MaterialValues.BRUSHED_ALLOY,
	MaterialValues.PRISMATIC,
	MaterialValues.GITD,
	MaterialValues.KRAFT_PAPER,
	MaterialValues.MIRROR,
	MaterialValues.GLITTER,
	MaterialValues.CLEAR,
	MaterialValues.CLEAR_BACKSCORE,
	MaterialValues.PIXIE_DUST,
	MaterialValues.REFLECTIVE,
];

export const LaserLaminates = [
	LaminateValues.GLOSSY_UV,
	LaminateValues.GLOSSY_NO_UV,
	LaminateValues.GLOSSY_THIN_NO_UV,
	LaminateValues.SOFT_TOUCH,
	LaminateValues.CRACKED_ICE,
	LaminateValues.SATIN_MATTE,
	LaminateValues.TEXTURED,
	LaminateValues.EPOXY,
	LaminateValues.UNCOATED,
];

export const ProductionLineAttribute = new ProductAttr({
	name: "production_line",
	type: ProductAttrValueType.STRING,
	values: Object.values( ProductionLineValues ),
});