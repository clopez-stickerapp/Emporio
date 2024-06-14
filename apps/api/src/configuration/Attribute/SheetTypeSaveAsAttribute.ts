import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class SheetTypeSaveAsAttribute extends ProductAttr {
	public static readonly ALIAS = "sheet_type_save_as";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
