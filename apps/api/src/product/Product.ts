import { ConditionBuilder } from "$/conditions/ConditionBuilder";
import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionValue } from "$/conditions/ConditionValue";
import { AttributeValue } from "./attribute/AttributeValue";
import { Attributes } from "./attribute/Attributes";
import { ProductConfig } from "$/configuration/interface/ProductConfig";
import { ProductAttr } from "./attribute/ProductAttr";

export class Product {
	protected productFamilyName: string;
	protected name: string;
	protected attrMap: Record<string, AttributeValue> = {};
	protected attrStrictMatches: string[] = [];
	protected conditions: ConditionBuilder;
	protected inStock: boolean = true;
	protected sku: string;

	public constructor(productFamilyName: string, config: ProductConfig) {
		this.productFamilyName = productFamilyName;
		this.name = config.name;
		this.conditions = new ConditionBuilder();
		this.inStock = true;
		this.sku = config.sku;
	}

	public isAttrRecommendedFor(attrName: string): boolean {
		return this.attrMap[attrName] !== undefined;
	}

	public isAttrStrictlyRequiredFor(attrName: string): boolean {
		return this.attrStrictMatches.includes(attrName);
	}

	public testAttributes(attributes: Attributes): boolean {
		return this.conditions.test(attributes);
	}

	public getAttrValue(attrName: string): AttributeValue | undefined {
		return this.attrMap[attrName];
	}

	public withAttrValue(attr: ProductAttr, value: ConditionValue, required: boolean = true, strictMatchIfRequired: boolean = true): Product {
		let attribute = attr.getName();

		this.attrMap[attribute] = value;

		if (required && strictMatchIfRequired) {
			this.attrStrictMatches.push(attribute);
		}

		if (required) {
			if (attr.isMultiValue()) {
				if (strictMatchIfRequired) {
					this.conditions.addCondition({attribute, operator: ConditionOperators.EQUAL, value});
				}
				else {
					if (!Array.isArray(value)) {
						value = [value.toString()];
					}
					for (let subValue of value) {
						this.conditions.addCondition({attribute, operator: ConditionOperators.IN, value: subValue});
					}
				}
			}
			else {
				if (Array.isArray(value)) {
					this.conditions.addCondition({attribute, operator: ConditionOperators.IN, value});
				}
				else {
					this.conditions.addCondition({attribute, operator: ConditionOperators.EQUAL, value});
				}
			}
		}

		return this;
	}

	// TODO: what to do with this?
	// public setStock(): void {
	// 	for (let [key, value] of Object.entries(this.attrMap)) {
	// 		if (!Array.isArray(value)) {
	// 			value = [value];
	// 		}
	// 		if (!this.isAttrInStock(key, value)) {
	// 			this.inStock = false;
	// 			break;
	// 		}
	// 	}
	// }

	// public isAttrInStock(attrName: string, attrValue: AttributeValueSingle[]): boolean {
	// 	let stockCollection = this.productFamily.getStockCollection();
	// 	let outOfStockForAttr = stockCollection?.getOutOfStockFor(attrName)?.getOutOfStock() ?? [];
	// 	return attrValue.filter((value) => outOfStockForAttr.includes(value.toString())).length === 0;
	// }

	public getName(): string {
		return this.name;
	}

	public getProductFamilyName(): string {
		return this.productFamilyName;
	}

	public getAttrMap(): Record<string, AttributeValue> {
		return this.attrMap;
	}

	public isInStock(): boolean {
		return this.inStock;
	}

	public getSku(): string {
		return this.sku;
	}
}
