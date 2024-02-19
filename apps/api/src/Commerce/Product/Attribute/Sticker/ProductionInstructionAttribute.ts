import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class ProductionInstructionAttribute extends ProductAttr {
	public static readonly ALIAS = "production_instruction";

	public constructor()
	{
		super( ProductAttrValueType.STRING );

		this.addAttrValue( "manual" );
		this.addAttrValue( "cut_square_color_bleed" );
	}
}
