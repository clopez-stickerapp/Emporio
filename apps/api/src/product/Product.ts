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

	// Instead of making this.conditions public like in other classes, we use this method to add conditions
	// This is because adding subgroups to conditions is not allowed in this class
	public addCondition(attrName: string, operator: ConditionOperators, attrValue: ConditionValue|null = null): Product {
		this.conditions.addCondition(attrName, operator, attrValue);

		return this;
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
		let attrName = attr.getName();

		this.attrMap[attrName] = value;

		if (required && strictMatchIfRequired) {
			this.attrStrictMatches.push(attrName);
		}

		if (required) {
			if (attr.isMultiValue()) {
				if (strictMatchIfRequired) {
					this.addCondition(attrName, ConditionOperators.EQUAL, value);
				}
				else {
					if (!Array.isArray(value)) {
						value = [value.toString()];
					}
					for (let subValue of value) {
						this.addCondition(attrName, ConditionOperators.IN, subValue);
					}
				}
			}
			else {
				if (Array.isArray(value)) {
					this.addCondition(attrName, ConditionOperators.IN, value);
				}
				else {
					this.addCondition(attrName, ConditionOperators.EQUAL, value);
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
