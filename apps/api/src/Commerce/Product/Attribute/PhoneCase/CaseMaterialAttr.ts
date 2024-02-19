import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

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
