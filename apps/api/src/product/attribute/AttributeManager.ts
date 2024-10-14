import { ConditionValue } from '$/conditions/ConditionValue';
import { ProductAttr } from './ProductAttr';
import { ConditionBuilder } from '$/conditions/ConditionBuilder';
import { ConditionOperators } from '$/conditions/ConditionOperators';
import { Attributes, AttributeValue } from '@stickerapp-org/nomisma';
import { Conditions } from '$/conditions/Conditions';
import { toArray } from '../../../Util';

type AttributeData<T> = {
	instance: ProductAttr;
	attrValue: AttributeValue | undefined;
} & T;

/**
 * A class that helps manage attributes.
 *
 * @template T - Additional data that can be stored with each attribute.
 */
export class AttributeManager<T extends Record<string, any> = {}> {
	protected conditions: ConditionBuilder = new ConditionBuilder();
	protected attributes: Record<string, AttributeData<T>> = {};

	public add(productAttribute: ProductAttr, value?: ConditionValue, additionalData?: T): void {
		let attribute = productAttribute.getName();

		if (this.has(attribute)) {
			throw new Error(`Failed to add attribute '${attribute}': The attribute already exists`);
		}

		if (value !== undefined) {
			for (const attrValue of toArray(value)) {
				productAttribute.canBe(attrValue, true);
			}

			if (productAttribute.isMultiValue()) {
				value = Array.isArray(value) ? value : [value.toString()];
			}

			const operator = Array.isArray(value) ? ConditionOperators.IN : ConditionOperators.EQUAL;
			this.conditions.addCondition({ attribute, operator, value });
		}

		this.attributes[attribute] = {
			instance: productAttribute,
			attrValue: value,
			...(additionalData as T),
		};
	}

	public get(attributeName: string): AttributeData<T> | undefined {
		return this.attributes[attributeName];
	}

	public getValue(attributeName: string): AttributeValue | undefined {
		return this.attributes[attributeName]?.attrValue;
	}

	public getAll(): Record<string, AttributeData<T>> {
		return this.attributes;
	}

	public getAllValues(): Record<string, AttributeValue | undefined> {
		return Object.fromEntries(Object.entries(this.attributes).map(([key, value]) => [key, value.attrValue]));
	}

	public has(attributeName: string): boolean {
		return attributeName in this.attributes;
	}

	public test(attributes: Attributes): boolean {
		return this.conditions.test(attributes);
	}

	public getConditions(): Conditions {
		return this.conditions.getConditions();
	}
}
