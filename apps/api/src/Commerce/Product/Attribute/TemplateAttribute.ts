import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class TemplateAttribute extends ProductAttr {
	public static readonly ALIAS = "template_id";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
