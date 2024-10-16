import { AttributeValue, AttributeValueMulti } from '@stickerapp-org/nomisma';

export function isEmpty(value: any): boolean {
	return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
}

/**
 * Converts an attribute value to an array.
 */
export function toArray(value: AttributeValue): AttributeValueMulti {
	return Array.isArray(value) ? value : [value];
}

/**
 * Returns a unique array of values.
 */
export function unique<T>(...arrays: T[][]): T[] {
	return [...new Set(arrays.flat())];
}
