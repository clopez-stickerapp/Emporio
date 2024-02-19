import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";
import { LaminateAttribute } from "./LaminateAttribute";
import { MaterialAttribute } from "./MaterialAttribute";

export class ProductionLineAttribute extends ProductAttr {
	public static readonly ALIAS = "production_line";

	public static readonly DIGITAL = "digital";
	public static readonly SPECIAL = "special";
	public static readonly LASER   = "laser";

	public static readonly DIGITAL_MATERIALS = [
		MaterialAttribute.WHITE,
		MaterialAttribute.WHITE_HI_TACK,
		MaterialAttribute.WHITE_STURDY,
		MaterialAttribute.WHITE_REMOVABLE,
		MaterialAttribute.WHITE_WALL,
		MaterialAttribute.SKIN,
		MaterialAttribute.BUBBLE_FREE,
		MaterialAttribute.CLEAR,
		MaterialAttribute.COLORED_VINYL,
		MaterialAttribute.METALLIC_GOLD,
		MaterialAttribute.METALLIC_SILVER,
		MaterialAttribute.FROSTED,
		MaterialAttribute.FLUORESCENT,
		MaterialAttribute.MAGNETIC,
		MaterialAttribute.WHITE_COVERALL,
		MaterialAttribute.SATIN_MATTE,
		MaterialAttribute.REFLECTIVE,
		MaterialAttribute.HEAT_TRANSFER,
	];

	public static readonly DIGITAL_LAMINATES = [
		LaminateAttribute.GLOSSY_UV,
		LaminateAttribute.GLOSSY_UV_12_MIL_HEAVY_DUTY,
		LaminateAttribute.SATIN_MATTE,
		LaminateAttribute.SANDY,
		LaminateAttribute.EPOXY,
		LaminateAttribute.PEBBLE,
		LaminateAttribute.SUPER_ROUGH,
		LaminateAttribute.WHITE_WINDOW,
		LaminateAttribute.UNCOATED,
		LaminateAttribute.GLOSSY_THIN,
	];

	public static readonly LASER_MATERIALS = [
		MaterialAttribute.WHITE,
		MaterialAttribute.WHITE_HI_TACK,
		MaterialAttribute.WHITE_REMOVABLE,
		MaterialAttribute.WHITE_BACKSCORE,
		MaterialAttribute.WHITE_THIN,
		MaterialAttribute.PAPER_THIN,
		MaterialAttribute.CLEAR_THIN,
		MaterialAttribute.KRAFT_THIN,
		MaterialAttribute.SILVER_THIN,
		MaterialAttribute.WARRANTY,
		MaterialAttribute.HOLOGRAPHIC,
		MaterialAttribute.BRUSHED_ALLOY,
		MaterialAttribute.PRISMATIC,
		MaterialAttribute.GITD,
		MaterialAttribute.KRAFT_PAPER,
		MaterialAttribute.MIRROR,
		MaterialAttribute.GLITTER,
		MaterialAttribute.CLEAR,
		MaterialAttribute.CLEAR_BACKSCORE,
		MaterialAttribute.PIXIE_DUST,
		MaterialAttribute.REFLECTIVE,
	];

	public static readonly LASER_LAMINATES = [
		LaminateAttribute.GLOSSY_UV,
		LaminateAttribute.GLOSSY_NO_UV,
		LaminateAttribute.GLOSSY_THIN_NO_UV,
		LaminateAttribute.SOFT_TOUCH,
		LaminateAttribute.CRACKED_ICE,
		LaminateAttribute.SATIN_MATTE,
		LaminateAttribute.TEXTURED,
		LaminateAttribute.EPOXY,
		LaminateAttribute.UNCOATED,
	];

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( ProductionLineAttribute.LASER );
		this.addAttrValue( ProductionLineAttribute.DIGITAL );
		this.addAttrValue( ProductionLineAttribute.SPECIAL );
	}
}
