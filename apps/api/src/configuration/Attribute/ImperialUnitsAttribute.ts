import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class ImperialUnitsAttribute extends ProductAttr {
	public static readonly ALIAS = "imperial_units";

	public constructor() {
		super( ProductAttrValueType.BOOL );

		this.addAttrValue( false );
		this.addAttrValue( true );
	}
}
