import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

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