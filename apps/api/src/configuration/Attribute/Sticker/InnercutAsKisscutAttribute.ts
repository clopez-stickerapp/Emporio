import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class InnercutAsKisscutAttribute extends ProductAttr {
	public static readonly ALIAS = "innercut_as_kisscut";

	public static readonly NO  = "no";
	public static readonly YES = "yes";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( InnercutAsKisscutAttribute.NO );
		this.addAttrValue( InnercutAsKisscutAttribute.YES );
	}
}
