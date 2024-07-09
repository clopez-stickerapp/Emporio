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
	protected requiredAttrs: Record<string, AttributeValue> = {};
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

	public isAttrRequired(attrName: string): boolean {
		return this.requiredAttrs[attrName] !== undefined;
	}

	public testAttributes(attributes: Attributes): boolean {
		return this.conditions.test(attributes);
	}

	public getAttrValue(attrName: string): AttributeValue | undefined {
		return this.requiredAttrs[attrName];
	}

	public requireAttr(attr: ProductAttr, value: ConditionValue): Product {
		let attribute = attr.getName();

		this.requiredAttrs[attribute] = value;

		if ( attr.isMultiValue() ) {
			const values = Array.isArray( value ) ? value : [ value.toString() ];
			for ( const subValue of values ) {
				this.conditions.addCondition( { attribute, operator: ConditionOperators.IN, value: subValue } );
			}
		} else {
			const operator = Array.isArray( value ) ? ConditionOperators.IN : ConditionOperators.EQUAL;
			this.conditions.addCondition( { attribute, operator, value } );
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

	public getRequiredAttrs(): Record<string, AttributeValue> {
		return this.requiredAttrs;
	}

	public isInStock(): boolean {
		return this.inStock;
	}

	public getSku(): string {
		return this.sku;
	}
}
