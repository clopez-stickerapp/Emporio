import { ProductAttr } from "../../../src/Commerce/Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../src/Commerce/Core/Product/Attribute/ProductAttrValueType";

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