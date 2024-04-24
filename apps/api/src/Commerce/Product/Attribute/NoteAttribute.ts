import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class NoteAttribute extends ProductAttr {
	public static readonly ALIAS = "note";
	public static readonly HANG_TAG = "Hang tag";
	public static readonly FRONT_ADHESIVE = "Front adhesive";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
