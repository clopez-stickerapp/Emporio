import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class ProductReferenceIDAttribute extends ProductAttr {
	public static readonly ALIAS = "reference_id";

	public constructor() {
		super( ProductAttrValueType.STRING );
	}
}
