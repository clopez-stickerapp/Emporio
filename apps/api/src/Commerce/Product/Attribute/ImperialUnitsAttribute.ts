import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class ImperialUnitsAttribute extends ProductAttr {
	public static readonly ALIAS = "imperial_units";

	public constructor() {
		super( ProductAttrValueType.BOOL );

		this.addAttrValue( false );
		this.addAttrValue( true );
	}
}
