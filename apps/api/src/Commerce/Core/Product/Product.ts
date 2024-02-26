import { AttributeValue, AttributeValueSingle } from "../../../Helper/Condition/AttributeValue";
import { Attributes } from "../../../Helper/Condition/Attributes";
import { ConditionBuilder } from "../../../Helper/Condition/ConditionBuilder";
import { ConditionOperators } from "../../../Helper/Condition/ConditionOperators";
import { ConditionValue } from "../../../Helper/Condition/ConditionValue";
import { ProductService } from "../ProductService";
import { ProductFamily } from "./ProductFamily";

export class Product {
	protected productService: ProductService;
	protected productFamily: ProductFamily;
	protected name: string;
	protected attrMap: Record<string, AttributeValue> = {};
	protected attrStrictMatches: string[] = [];
	protected conditions: ConditionBuilder;
	protected inStock: boolean = true;
	protected sku: string;

	public constructor(productFamily: ProductFamily, name: string, sku: string) {
		this.productFamily = productFamily;
		this.productService = productFamily.getProductService();
		this.name = name;
		this.conditions = new ConditionBuilder();
		this.inStock = true;
		this.sku = sku;
	}

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
		let attrUID = this.productFamily.findAttrUIDByAlias(attrName);
		let attr = this.productService.retrieveAttribute(attrUID);
		if (!attrUID || !attr) {
			throw new Error(`Cannot do Product.withAttrValue( ${attrName} ) because '${attrName}' is not an alias for product ${this.name}.`);
		}

		this.attrMap[attrName] = attrValue;

		if (attr.isMultiValue()) {
			if (this.isAttrStrictlyRequiredFor(attrName)) {
				this.addCondition(attrName, ConditionOperators.EQUAL, attrValue);
			}
			else {
				if (!Array.isArray(attrValue)) {
					attrValue = [attrValue.toString()];
				}
				for (let subValue of attrValue) {
					this.addCondition(attrName, ConditionOperators.IN, subValue);
				}
			}
		}
		else {
			if (Array.isArray(attrValue)) {
				this.addCondition(attrName, ConditionOperators.IN, attrValue);
			}
			else {
				this.addCondition(attrName, ConditionOperators.EQUAL, attrValue);
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

	public getAttrValue(attrName: string): AttributeValue {
		return this.attrMap[attrName];
	}

	public withAttrValue(attrName: string, value: ConditionValue, required: boolean = true, strictMatchIfRequired: boolean = true): Product {
		let attrUID = this.productFamily.findAttrUIDByAlias(attrName);
		let attr = this.productService.retrieveAttribute(attrUID);
		if (!attrUID || !attr) {
			throw new Error(`Cannot do Product.withAttrValue( ${attrName} ) because '${attrName}' is not an alias for product ${this.name}.`);
		}

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

	public getProductService(): ProductService {
		return this.productService;
	}

	public getProductFamily(): ProductFamily {
		return this.productFamily;
	}

	public getAttrMap(): Record<string, AttributeValue> {
		return this.attrMap;
	}

	public getConditions(): ConditionBuilder {
		return this.conditions;
	}

	public isInStock(): boolean {
		return this.inStock;
	}

	public getSku(): string {
		return this.sku;
	}

	public setSku(sku: string): Product {
		this.sku = sku;
		return this;
	}
}
