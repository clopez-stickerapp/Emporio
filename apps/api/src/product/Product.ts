import { ProductService } from "./ProductService";
import { ProductFamily } from "./ProductFamily";
import { Condition } from "$/conditions/Condition";
import { ConditionBuilder } from "$/conditions/ConditionBuilder";
import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionValue } from "$/conditions/ConditionValue";
import { ProductAttrValueInvalidException } from "$/product/exceptions/ProductAttrValueInvalidException";
import { AttributeValue, AttributeValueSingle } from "./attribute/AttributeValue";
import { Attributes } from "./attribute/Attributes";

export class Product {
	protected productFamily: ProductFamily;
	protected name: string;
	protected attrMap: Record<string, AttributeValue> = {};
	protected attrStrictMatches: string[] = [];
	protected conditions: ConditionBuilder;
	protected inStock: boolean = true;
	protected sku: string;

	public constructor(productFamily: ProductFamily, name: string, sku: string) {
		this.productFamily = productFamily;
		this.name = name;
		this.conditions = new ConditionBuilder();
		this.inStock = true;
		this.sku = sku;
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

	public canAttrBe(attrName: string, attrValue: ConditionValue): boolean {
		let attr = this.productFamily.getAttribute(attrName);

		try{
			attr.canBe(attrValue);
		} catch (e) {
			if(e instanceof ProductAttrValueInvalidException){
				return false;
			} else {
				throw e;
			}
		}

		// this.conditions doesn't contain any Condition builders, that's why we can cast it to Condition[]
		for (let condition of Object.values(this.conditions.getConditions()) as Condition[]) {
			if(condition.columnName === attrName && !condition.test({[attrName]: attrValue})){
				return false;
			}
		}

		return true;
	}

	public canHaveAttr(attrName: string): boolean {
		if(this.productFamily.getRequiredAttrs()[attrName] || this.productFamily.getSupportedAttrs()[attrName]){
			return true;
		}

		return false;
	}

	public getAttrValue(attrName: string): AttributeValue | undefined {
		return this.attrMap[attrName];
	}

	public withAttrValue(attrName: string, value: ConditionValue, required: boolean = true, strictMatchIfRequired: boolean = true): Product {
		let attr = this.productFamily.getAttribute(attrName);

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

	public setStock(): void {
		for (let [key, value] of Object.entries(this.attrMap)) {
			if (!Array.isArray(value)) {
				value = [value];
			}
			if (!this.isAttrInStock(key, value)) {
				this.inStock = false;
				break;
			}
		}
	}

	public isAttrInStock(attrName: string, attrValue: AttributeValueSingle[]): boolean {
		let stockCollection = this.productFamily.getStockCollection();
		let outOfStockForAttr = stockCollection?.getOutOfStockFor(attrName)?.getOutOfStock() ?? [];
		return attrValue.filter((value) => outOfStockForAttr.includes(value.toString())).length === 0;
	}

	public getName(): string {
		return this.name;
	}

	public getProductFamily(): ProductFamily {
		return this.productFamily;
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
