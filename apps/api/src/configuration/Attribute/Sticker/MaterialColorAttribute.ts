import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class MaterialColorAttribute extends ProductAttr {
	public static readonly ALIAS = "material_color";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
