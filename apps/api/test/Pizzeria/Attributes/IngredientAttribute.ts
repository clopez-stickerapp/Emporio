import { ProductAttr } from "../../../src/Commerce/Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../src/Commerce/Core/Product/Attribute/ProductAttrValueType";

export class IngredientAttribute extends ProductAttr {
	public static readonly NAME = 'ingredient';
	
	public static readonly CHEESE = 'cheese';
	public static readonly MUSHROOM = 'mushroom';
	public static readonly HAM = 'ham';
	public static readonly ONION = 'onion';
	public static readonly GARLIC = 'garlic';
	public static readonly WALNUT = 'walnut';
	public static readonly PINEAPPLE = 'pineapple';

	public constructor() {
		super( ProductAttrValueType.STRING, true );

		this.addAttrValue( IngredientAttribute.CHEESE );
		this.addAttrValue( IngredientAttribute.MUSHROOM );
		this.addAttrValue( IngredientAttribute.HAM );
		this.addAttrValue( IngredientAttribute.ONION );
		this.addAttrValue( IngredientAttribute.GARLIC );
		this.addAttrValue( IngredientAttribute.WALNUT );
		this.addAttrValue( IngredientAttribute.PINEAPPLE );
	}
}