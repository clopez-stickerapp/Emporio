import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class CaseMaterialAttr extends ProductAttr {
	public static readonly ALIAS = "material";

	public static readonly GLOSSY = "glossy_case";
	public static readonly MATTE  = "matte_case";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( CaseMaterialAttr.GLOSSY );
		this.addAttrValue( CaseMaterialAttr.MATTE );
	}
}
