import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class CaseSheetTypeAttr extends ProductAttr {
	public static readonly ALIAS = 'sheet_type';

	public static readonly CASE = "case";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( CaseSheetTypeAttr.CASE );
	}
}
