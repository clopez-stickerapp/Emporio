import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class CrustAttribute extends ProductAttr {
	public static readonly NAME = 'crust';

	public static readonly THIN = 'thin';
	public static readonly THICK = 'thick';
	public static readonly STUFFED = 'stuffed';
	
	public constructor() {
		super( ProductAttrValueType.STRING );
		
		this.addAttrValue( CrustAttribute.THIN );
		this.addAttrValue( CrustAttribute.THICK );
		this.addAttrValue( CrustAttribute.STUFFED );
	}
}