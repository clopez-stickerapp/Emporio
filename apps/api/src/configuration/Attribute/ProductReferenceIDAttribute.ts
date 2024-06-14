import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class ProductReferenceIDAttribute extends ProductAttr {
	public static readonly ALIAS = "reference_id";

	public constructor() {
		super( ProductAttrValueType.STRING );
	}
}
