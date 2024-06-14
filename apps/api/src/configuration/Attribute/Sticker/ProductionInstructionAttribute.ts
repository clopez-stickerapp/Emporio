import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class ProductionInstructionAttribute extends ProductAttr {
	public static readonly ALIAS = "production_instruction";

	public constructor()
	{
		super( ProductAttrValueType.STRING );

		this.addAttrValue( "manual" );
		this.addAttrValue( "cut_square_color_bleed" );
	}
}
