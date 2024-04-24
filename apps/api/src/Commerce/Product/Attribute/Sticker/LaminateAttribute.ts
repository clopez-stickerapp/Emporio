import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class LaminateAttribute extends ProductAttr {
	public static readonly ALIAS = "laminate";

	public static readonly UNCOATED                    = "uncoated";
	public static readonly GLOSSY_UV                   = "glossy_uv";
	public static readonly GLOSSY_UV_12_MIL_HEAVY_DUTY = "glossy_uv_12_mil_heavy_duty";
	public static readonly GLOSSY_NO_UV                = "glossy_no_uv";
	public static readonly SOFT_TOUCH                  = "soft_touch";
	public static readonly SATIN_MATTE                 = "satin_matte";
	public static readonly SANDY                       = "sandy";
	public static readonly EPOXY                       = "epoxy";
	public static readonly CRACKED_ICE                 = "cracked_ice";
	public static readonly PEBBLE                      = "pebble";
	public static readonly SUPER_ROUGH                 = "super_rough";
	public static readonly TEXTURED                    = "textured";
	public static readonly WHITE_WINDOW                = "white_window";
	public static readonly GLOSSY_THIN                 = "glossy_thin";
	public static readonly GLOSSY_THIN_NO_UV           = "glossy_thin_no_uv";

	public static readonly OUT_OF_STOCK: string[] = [
		LaminateAttribute.CRACKED_ICE,
	];

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( LaminateAttribute.GLOSSY_UV );
		this.addAttrValue( LaminateAttribute.GLOSSY_NO_UV );
		this.addAttrValue( LaminateAttribute.GLOSSY_UV_12_MIL_HEAVY_DUTY );
		this.addAttrValue( LaminateAttribute.SOFT_TOUCH );
		this.addAttrValue( LaminateAttribute.SATIN_MATTE );
		this.addAttrValue( LaminateAttribute.SANDY );
		this.addAttrValue( LaminateAttribute.EPOXY );
		this.addAttrValue( LaminateAttribute.CRACKED_ICE );
		this.addAttrValue( LaminateAttribute.PEBBLE );
		this.addAttrValue( LaminateAttribute.SUPER_ROUGH );
		this.addAttrValue( LaminateAttribute.TEXTURED );
		this.addAttrValue( LaminateAttribute.UNCOATED );
		this.addAttrValue( LaminateAttribute.WHITE_WINDOW );
		this.addAttrValue( LaminateAttribute.GLOSSY_THIN );
		this.addAttrValue( LaminateAttribute.GLOSSY_THIN_NO_UV );
	}
}
