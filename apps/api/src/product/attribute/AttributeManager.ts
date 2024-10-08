import { ConditionValue } from '$/conditions/ConditionValue';
import { ProductAttr } from './ProductAttr';
import { ConditionBuilder } from '$/conditions/ConditionBuilder';
import { ConditionOperators } from '$/conditions/ConditionOperators';
import { Attributes, AttributeValue } from '@stickerapp-org/nomisma';

type AttributeData<T> = {
  instance: ProductAttr;
  attrValue: AttributeValue | undefined;
} & T;

/**
 * A class that helps manage product attributes and their conditions.
 *
 * @template T - Additional data that can be stored with each attribute.
 */
export class AttributeManager<T extends Record<string, any> = {}> {
  protected conditions: ConditionBuilder = new ConditionBuilder();
  protected attributes: Record<string, AttributeData<T>> = {};

  public add(productAttribute: ProductAttr, value?: ConditionValue, additionalData?: T): void {
    let attribute = productAttribute.getName();

    this.attributes[attribute] = {
      instance: productAttribute,
      attrValue: value,
      ...(additionalData as T),
    };

    if (value !== undefined) {
      if (productAttribute.isMultiValue()) {
        const values = Array.isArray(value) ? value : [value.toString()];
        for (const subValue of values) {
          this.conditions.addCondition({
            attribute,
            operator: ConditionOperators.IN,
            value: subValue,
          });
        }
      } else {
        const operator = Array.isArray(value) ? ConditionOperators.IN : ConditionOperators.EQUAL;
        this.conditions.addCondition({ attribute, operator, value });
      }
    }
  }

  public get(attributeName: string): AttributeData<T> | undefined {
    return this.attributes[attributeName];
  }

  public getAll(): Record<string, AttributeData<T>> {
    return this.attributes;
  }

  public has(attributeName: string): boolean {
    return attributeName in this.attributes;
  }

  public test(attributes: Attributes): boolean {
    return this.conditions.test(attributes);
  }
}
