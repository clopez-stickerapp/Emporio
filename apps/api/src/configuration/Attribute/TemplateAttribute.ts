import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class TemplateAttribute extends ProductAttr {
	public static readonly ALIAS = "template_id";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
