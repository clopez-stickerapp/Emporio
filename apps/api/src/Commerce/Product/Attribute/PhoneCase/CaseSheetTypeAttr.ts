import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class CaseSheetTypeAttr extends ProductAttr {
	public static readonly ALIAS = 'sheet_type';

	public static readonly CASE = "case";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( CaseSheetTypeAttr.CASE );
	}
}
