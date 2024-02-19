import { AttributeValue } from "../../../../Helper/Condition/AttributeValue";
import { Attributes } from "./../../../../Helper/Condition/Attributes"

export class ProductItem {
	private readonly productFamilyName: string;
	private readonly productName: string;
	private attributes: Attributes = {};

	//private units: number = 0;

	public constructor(productFamilyName: string, productName: string){
		this.productFamilyName = productFamilyName;
		this.productName = productName;
	}

	public getAttribute(name: string): AttributeValue {
		return this.attributes[name];
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
		throw new Error("Not implemented");
	}

	public setUnits(units: number): void {
		throw new Error("Not implemented");
	}

	public fromJSON(json: string): ProductItem {
		throw new Error("Not implemented");
	}

	public toTestableOneDimensionalArray(){
		throw new Error("Not implemented");
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