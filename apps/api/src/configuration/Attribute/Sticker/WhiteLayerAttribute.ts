import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class WhiteLayerAttribute extends ProductAttr {
	public static readonly ALIAS = "white_layer";

	public static readonly ALPHA    = "alpha";
	public static readonly MANUALLY = "manually";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( WhiteLayerAttribute.ALPHA );
		this.addAttrValue( WhiteLayerAttribute.MANUALLY );
	}
}
