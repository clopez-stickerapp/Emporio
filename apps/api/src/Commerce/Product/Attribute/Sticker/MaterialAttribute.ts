import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class MaterialAttribute extends ProductAttr {
	public static readonly ALIAS = "material";

	public static readonly WHITE           = "white";
	public static readonly WHITE_REMOVABLE = "white_removable";
	public static readonly WHITE_WALL      = "white_wall";
	public static readonly WHITE_HI_TACK   = "white_hi_tack";
	public static readonly WHITE_THIN      = "white_thin";
	public static readonly PAPER_THIN      = "paper_thin";
	public static readonly CLEAR_THIN      = "clear_thin";
	public static readonly KRAFT_THIN      = "kraft_thin";
	public static readonly SILVER_THIN     = "silver_thin";
	public static readonly WHITE_COVERALL  = "white_coverall";
	public static readonly WHITE_PAPER     = "white_paper";
	public static readonly WHITE_BACKSCORE = "white_backscore";
	public static readonly WHITE_STURDY    = "white_sturdy";
	public static readonly HOLOGRAPHIC     = "holographic";
	public static readonly KRAFT_PAPER     = "kraft_paper";
	public static readonly PRISMATIC       = "prismatic";
	public static readonly MIRROR          = "mirror";
	public static readonly GLITTER         = "glitter";
	public static readonly GITD            = "gitd";
	public static readonly BRUSHED_ALLOY   = "brushed_alloy";
	public static readonly CLEAR           = "clear";
	public static readonly CLEAR_BACKSCORE = "clear_backscore";
	public static readonly BUBBLE_FREE     = "bubble_free";
	public static readonly SKIN            = "skin";
	public static readonly COLORED_VINYL   = "colored_vinyl";
	public static readonly METALLIC_GOLD   = "metallic_gold";
	public static readonly METALLIC_SILVER = "metallic_silver";
	public static readonly FROSTED         = "frosted";
	public static readonly FLUORESCENT     = "fluorescent";
	public static readonly MAGNETIC        = "magnetic";
	public static readonly PIXIE_DUST      = "pixie_dust";
	public static readonly SATIN_MATTE     = "satin_matte";
	public static readonly WARRANTY        = "warranty";
	public static readonly REFLECTIVE      = "reflective";
	public static readonly HEAT_TRANSFER   = "heat_transfer";
	public static readonly SPECIAL         = "special";

	public static readonly OUT_OF_STOCK = [ 
		MaterialAttribute.WARRANTY,
		MaterialAttribute.CLEAR_BACKSCORE,
	];

	public static readonly MATERIALS_LABELS_ON_ROLL = [
		MaterialAttribute.WHITE_THIN,
		MaterialAttribute.PAPER_THIN,
		MaterialAttribute.CLEAR_THIN,
		MaterialAttribute.KRAFT_THIN,
		MaterialAttribute.SILVER_THIN,
	];

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( MaterialAttribute.WHITE );
		this.addAttrValue( MaterialAttribute.WHITE_HI_TACK );
		this.addAttrValue( MaterialAttribute.WHITE_REMOVABLE );
		this.addAttrValue( MaterialAttribute.WHITE_WALL );
		this.addAttrValue( MaterialAttribute.WHITE_THIN );
		this.addAttrValue( MaterialAttribute.PAPER_THIN );
		this.addAttrValue( MaterialAttribute.CLEAR_THIN );
		this.addAttrValue( MaterialAttribute.KRAFT_THIN );
		this.addAttrValue( MaterialAttribute.SILVER_THIN );
		this.addAttrValue( MaterialAttribute.WHITE_COVERALL );
		this.addAttrValue( MaterialAttribute.WHITE_PAPER );
		this.addAttrValue( MaterialAttribute.WHITE_BACKSCORE );
		this.addAttrValue( MaterialAttribute.WHITE_STURDY );
		this.addAttrValue( MaterialAttribute.CLEAR_BACKSCORE );
		this.addAttrValue( MaterialAttribute.HOLOGRAPHIC );
		this.addAttrValue( MaterialAttribute.PIXIE_DUST );
		this.addAttrValue( MaterialAttribute.KRAFT_PAPER );
		this.addAttrValue( MaterialAttribute.PRISMATIC );
		this.addAttrValue( MaterialAttribute.MIRROR );
		this.addAttrValue( MaterialAttribute.GITD );
		this.addAttrValue( MaterialAttribute.BRUSHED_ALLOY );
		this.addAttrValue( MaterialAttribute.CLEAR );
		this.addAttrValue( MaterialAttribute.GLITTER );
		this.addAttrValue( MaterialAttribute.BUBBLE_FREE );
		this.addAttrValue( MaterialAttribute.SKIN );
		this.addAttrValue( MaterialAttribute.COLORED_VINYL );
		this.addAttrValue( MaterialAttribute.METALLIC_GOLD );
		this.addAttrValue( MaterialAttribute.METALLIC_SILVER );
		this.addAttrValue( MaterialAttribute.FROSTED );
		this.addAttrValue( MaterialAttribute.FLUORESCENT );
		this.addAttrValue( MaterialAttribute.SATIN_MATTE );
		this.addAttrValue( MaterialAttribute.WARRANTY );
		this.addAttrValue( MaterialAttribute.REFLECTIVE );
		this.addAttrValue( MaterialAttribute.MAGNETIC );
		this.addAttrValue( MaterialAttribute.HEAT_TRANSFER );
		this.addAttrValue( MaterialAttribute.SPECIAL );
	}
}
