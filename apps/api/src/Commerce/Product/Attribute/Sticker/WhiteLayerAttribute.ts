import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

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
