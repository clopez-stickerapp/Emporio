import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class EpoxyTemplateAttribute extends ProductAttr {
	public static readonly ALIAS = "epoxy_template_id";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
