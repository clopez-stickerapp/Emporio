import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class SheetTypeSaveAsAttribute extends ProductAttr {
	public static readonly ALIAS = "sheet_type_save_as";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
