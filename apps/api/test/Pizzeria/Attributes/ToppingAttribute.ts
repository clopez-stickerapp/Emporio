import { ProductAttr } from "../../../src/Commerce/Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../src/Commerce/Core/Product/Attribute/ProductAttrValueType";

export class ToppingAttribute extends ProductAttr {
	public static readonly NAME = 'topping';

	public static readonly CHEESE = 'cheese';
	public static readonly MUSHROOM = 'mushroom';
	public static readonly HAM = 'ham';
	public static readonly ONION = 'onion';
	public static readonly GARLIC = 'garlic';
	public static readonly WALNUT = 'walnut';
	public static readonly PINEAPPLE = 'pineapple';

	public constructor() {
		super( ProductAttrValueType.STRING, true );
		
		this.addAttrValue( ToppingAttribute.CHEESE );
		this.addAttrValue( ToppingAttribute.MUSHROOM );
		this.addAttrValue( ToppingAttribute.HAM );
		this.addAttrValue( ToppingAttribute.ONION );
		this.addAttrValue( ToppingAttribute.GARLIC );
		this.addAttrValue( ToppingAttribute.WALNUT );
		this.addAttrValue( ToppingAttribute.PINEAPPLE );
	}
}