import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class NoteAttribute extends ProductAttr {
	public static readonly ALIAS = "note";
	public static readonly HANG_TAG = "Hang tag";
	public static readonly FRONT_ADHESIVE = "Front adhesive";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
