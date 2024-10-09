import { AttributeValue, AttributeValueMulti } from '@stickerapp-org/nomisma';

export function isEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  );
}

/**
 * Converts an attribute value to an array.
 *
 * @param value The attribute value.
 * @returns The attribute value as an array.
 */
export function toArray(value: AttributeValue): AttributeValueMulti {
  return Array.isArray(value) ? value : [value];
}
