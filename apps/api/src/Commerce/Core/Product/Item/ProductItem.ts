import { AttributeValue } from "../../../../Helper/Condition/AttributeValue";
import { Attributes } from "./../../../../Helper/Condition/Attributes"

export class ProductItem {
	private readonly productFamilyName: string;
	private readonly productName: string;
	private attributes: Attributes = {};

	private units: number = 0;

	public constructor(productFamilyName: string, productName: string){
		this.productFamilyName = productFamilyName;
		this.productName = productName;
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

	public getUnits(): number {
		return this.units;
	}

	public setUnits(units: number): void {
		this.units = units;
	}

	public fromJSON(json: string): ProductItem {
		throw new Error("Not implemented");
	}

	// Should be rename to "toTestableObject"
	public toTestableOneDimensionalArray(): Attributes{
		const result = {};

		result["item.productFamilyName"] = this.productFamilyName;
		result["item.productName"] = this.productName;
		result ["item.units"] = this.units;

		for (const key in this.attributes){
			result["item.attributes." + key] = this.attributes[key];
		}

		return result;
	}

	public jsonSerialize(): string {
		throw new Error("Not implemented");
	}

	public getSku(): string {
		throw new Error("Not implemented");
	}

	public setSku(sku: string): void {
		throw new Error("Not implemented");
	}
}