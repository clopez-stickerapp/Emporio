import { ProductAttr } from "../../../src/Commerce/Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../src/Commerce/Core/Product/Attribute/ProductAttrValueType";

export class CuisineAttribute extends ProductAttr {
	public static readonly NAME = 'cuisine';

	public static readonly SWEDISH = 'swedish';
	public static readonly NEOPOLITAN = 'neopolitan';
	
	public constructor() {
		super( ProductAttrValueType.STRING );
		
		this.addAttrValue( CuisineAttribute.SWEDISH );
		this.addAttrValue( CuisineAttribute.NEOPOLITAN );
	}
}