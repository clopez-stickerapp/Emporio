import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class FeatureAttribute extends ProductAttr {
	public static readonly ALIAS = "feature";

	public static readonly BACKPAPER_PRINT  = "backpaper_print";
	public static readonly HANGTAGGING      = "hangtagging";
	public static readonly TRANSFER_TAPE    = "transfer_tape";
	public static readonly EFFECT_LAYER     = "effect_layer";
	public static readonly VARIABLE_DATA    = "variable_data";
	public static readonly MANUAL_BACKSCORE = "manual_backscore";
	public static readonly PACK_SET_AMOUNT  = "pack_set_amount";
	public static readonly PERFORATION      = "perforation";

	public static readonly OUT_OF_STOCK: string[] = [];

	public constructor() {
		super( ProductAttrValueType.STRING, true );

		this.addAttrValue( FeatureAttribute.HANGTAGGING );
		this.addAttrValue( FeatureAttribute.BACKPAPER_PRINT );
		this.addAttrValue( FeatureAttribute.EFFECT_LAYER );
		this.addAttrValue( FeatureAttribute.TRANSFER_TAPE );
		this.addAttrValue( FeatureAttribute.VARIABLE_DATA );
		this.addAttrValue( FeatureAttribute.MANUAL_BACKSCORE );
		this.addAttrValue( FeatureAttribute.PACK_SET_AMOUNT );
		this.addAttrValue( FeatureAttribute.PERFORATION );
	}
}
