import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class MaterialColorAttribute extends ProductAttr {
	public static readonly ALIAS = "material_color";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
