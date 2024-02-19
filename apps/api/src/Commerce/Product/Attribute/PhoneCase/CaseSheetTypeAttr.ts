import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class CaseSheetTypeAttr extends ProductAttr {
	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( "case" );
	}
}
