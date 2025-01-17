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
	requireAll: boolean;
} & T;

export class AttributeManager<T extends Record<string, any> = {}> {
	protected conditions: ConditionBuilder = new ConditionBuilder();
	protected attributes: Record<string, AttributeData<T>> = {};

	/**
	 * Adds an attribute to the manager.
	 *
	 * @param attribute - The attribute to add.
	 * @param value - The condition value(s) for the attribute.
	 * @param requireAll - Whether all condition values must be required. For attributes that support multiple values. Defaults to true.
	 * @param additionalData - Additional data to associate with the attribute.
	 */
	public add(attribute: ProductAttr, value?: ConditionValue, requireAll: boolean = true, additionalData?: T): void {
		if (this.has(attribute.getName())) {
			throw new Error(`Failed to add attribute '${attribute.getName()}': The attribute already exists`);
		}

		if (value !== undefined) {
			for (const attrValue of toArray(value)) {
				attribute.canBe(attrValue, true);
			}

			if (attribute.isMultiValue() && requireAll) {
				for (const subValue of toArray(value)) {
					this.conditions.addCondition({
						attribute: attribute.getName(),
						operator: ConditionOperators.IN,
						value: subValue,
					});
				}
			} else {
				this.conditions.addCondition({
					attribute: attribute.getName(),
					operator: Array.isArray(value) || attribute.isMultiValue() ? ConditionOperators.IN : ConditionOperators.EQUAL,
					value,
				});
			}
		}

		this.attributes[attribute.getName()] = {
			instance: attribute,
			attrValue: value,
			requireAll,
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

	public test(attributes: Attributes) {
		const test = (): boolean => {
			try {
				return this.conditions.test(attributes);
			} catch (e) {
				return false;
			}
		};

		const result = {
			success: test(),
			errors: [] as string[],
		};

		if (!result.success) {
			for (const [attrName, attribute] of Object.entries(this.getAll())) {
				const attrValueRequired = attribute.attrValue;
				if (attrValueRequired !== undefined) {
					const attrValueOnItem = attributes[attrName] ?? [];
					const requireAll = attribute.requireAll && attribute.instance.isMultiValue();
					const valid = toArray(attrValueRequired)[requireAll ? 'every' : 'some']((value) => toArray(attrValueOnItem).includes(value));
					if (!valid) {
						let error = `${attrName} must ${attribute.instance.isMultiValue() ? 'include ' : 'be '}`;
						if (Array.isArray(attrValueRequired)) {
							error += (requireAll ? 'all ' : 'one ') + 'of the following: ';
						}
						error += toArray(attrValueRequired).join(', ');
						result.errors.push(error);
					}
				}
			}
		}

		return result;
	}

	public getConditions(): Conditions {
		return this.conditions.getConditions();
	}
}
