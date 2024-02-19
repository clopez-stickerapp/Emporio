import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class FigureAttribute extends ProductAttr {
	public static readonly ALIAS = "figure_id";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
