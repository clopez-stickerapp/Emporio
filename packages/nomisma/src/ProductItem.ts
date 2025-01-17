import { Attributes } from "./Attributes";
import { AttributeValue } from "./AttributeValue";

export class ProductItem {
	private productFamilyName: string;
	private productName: string;
	private attributes: Attributes = {};

	public constructor(productFamilyName: string, productName: string, attributes: Attributes = {}) {
		this.productFamilyName = productFamilyName;
		this.productName = productName;
		this.attributes = attributes;
	}

	public getAttribute<T extends AttributeValue>(name: string): T | undefined {
		return this.attributes[name] as T | undefined;
	}

	public setAttribute(name: string, value: AttributeValue): ProductItem {
		this.attributes[name] = value;
		return this;
	}

	public removeAttribute(name: string): ProductItem {
		delete this.attributes[name];
		return this;
	}

	public hasAttribute(name: string): boolean {
		return this.attributes[name] !== undefined;
	}

	public getAttributes(): Attributes {
		return this.attributes;
	}

	public setAttributes(attributes: Attributes): void {
		this.attributes = attributes;
	}

	public getProductName(): string {
		return this.productName;
	}

	public getProductFamilyName(): string {
		return this.productFamilyName;
	}

	/** @deprecated Use createProductItemFromJSON in Elpis instead. */
	public reset(json: Record<string, any>): ProductItem {
		this.productFamilyName = json["productFamilyName"];
		this.productName = json["productName"];
		this.attributes = json["attributes"];
		return this;
	}

	// Should be rename to "toTestableObject"
	public toTestableOneDimensionalArray(): Attributes{
		const result: Record<string, AttributeValue> = {};

		result["item.productFamilyName"] = this.productFamilyName;
		result["item.productName"] = this.productName;

		for (const key in this.attributes){
			result["item.attributes." + key] = this.attributes[key];
		}

		return result;
	}
}