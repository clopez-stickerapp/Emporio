import { AttributeValueSingle } from "./AttributeValue";
import { ProductAttr } from "./ProductAttr";

export class ProductAttrValue {
	protected attr: ProductAttr;
	protected value: AttributeValueSingle;

	public constructor( value: AttributeValueSingle, attr: ProductAttr ) {
		this.value = value;
		this.attr = attr;
	}

	public getAttr(): ProductAttr {
		return this.attr;
	}

	public getValue(): AttributeValueSingle {
		return this.value;
	}
}
