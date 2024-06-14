import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class FigureAttribute extends ProductAttr {
	public static readonly ALIAS = "figure_id";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
