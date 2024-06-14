import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class PortionAttribute extends ProductAttr {
	public static readonly NAME = 'portion';

	public static readonly MINI   = 1;
	public static readonly NORMAL = 2;
	public static readonly BIG    = 3;
	public static readonly FAMILY = 4;

	public constructor() {
		super( ProductAttrValueType.INT, false, true );

		this.addAttrValue( PortionAttribute.MINI );
		this.addAttrValue( PortionAttribute.NORMAL );
		this.addAttrValue( PortionAttribute.BIG );
		this.addAttrValue( PortionAttribute.FAMILY );
	}
}