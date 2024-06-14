import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class SauceBaseAttribute extends ProductAttr {
	public static readonly NAME = 'sauce_base';

	public static readonly TOMATO = 'tomato';
	public static readonly CREME_FRAICHE = 'creme_fraiche';

	public constructor() {
		super( ProductAttrValueType.STRING, false );
		
		this.addAttrValue( SauceBaseAttribute.TOMATO );
		this.addAttrValue( SauceBaseAttribute.CREME_FRAICHE );
	}
}