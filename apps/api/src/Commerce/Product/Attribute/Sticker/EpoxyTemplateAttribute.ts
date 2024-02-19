import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class EpoxyTemplateAttribute extends ProductAttr {
	public static readonly ALIAS = "epoxy_template_id";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
