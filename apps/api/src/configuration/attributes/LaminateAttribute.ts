import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const LaminateValues = {
	GLOSSY_UV: "glossy_uv",
	GLOSSY_NO_UV: "glossy_no_uv",
	GLOSSY_UV_12_MIL_HEAVY_DUTY: "glossy_uv_12_mil_heavy_duty",
	SOFT_TOUCH: "soft_touch",
	SATIN_MATTE: "satin_matte",
	SANDY: "sandy",
	EPOXY: "epoxy",
	CRACKED_ICE: "cracked_ice",
	PEBBLE: "pebble",
	SUPER_ROUGH: "super_rough",
	TEXTURED: "textured",
	UNCOATED: "uncoated",
	WHITE_WINDOW: "white_window",
	GLOSSY_THIN: "glossy_thin",
	GLOSSY_THIN_NO_UV: "glossy_thin_no_uv",
}

export const LaminatesOOS = [
	LaminateValues.CRACKED_ICE,
];

export const LaminateAttribute = new ProductAttr({
	name: "laminate",
	type: ProductAttrValueType.STRING,
	values: Object.values(LaminateValues),
});
