import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class NoteAttribute extends ProductAttr {
	public static readonly ALIAS = "note";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
