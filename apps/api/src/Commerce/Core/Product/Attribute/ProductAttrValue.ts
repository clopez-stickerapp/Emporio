import { ProductAttr } from "./ProductAttr";

export class ProductAttrValue {
	protected attr: ProductAttr;
	protected value: boolean | number | string;

	public constructor( value: boolean | number | string, attr: ProductAttr ) {
		this.value = value;
		this.attr = attr;
	}

	public getAttr(): ProductAttr {
		return this.attr;
	}

	public getValue(): boolean | number | string {
		return this.value;
	}
}
