import { Condition } from '$/conditions/Condition';
import { ConditionOperators } from '$/conditions/ConditionOperators';
import { ProductAttr } from '$/product/attribute/ProductAttr';
import { Product } from '$/product/Product';
import { ProductAttrValueType } from '@stickerapp-org/nomisma';

class DummyProduct extends Product {
	public getConditions(): Condition[] {
		return Object.values(this.attributes.getConditions()) as Condition[];
	}
}

describe('Product', () => {
	let product: DummyProduct;
	let attribute: ProductAttr;

	beforeEach(() => {
		product = new DummyProduct('someFamily', {
			name: 'test-product',
			sku: 'sku123',
			available: true,
		});
	});

	test('attributes', () => {
		expect(product.attributes.has('foo')).toBe(false);
		expect(product.attributes.getAllValues()).toEqual({});
		expect(product.attributes.getValue('foo')).toBeUndefined();

		product.attributes.add(new ProductAttr({ name: 'foo', type: ProductAttrValueType.STRING, values: ['bar'] }), 'bar');

		expect(product.attributes.has('foo')).toBe(true);
		expect(product.attributes.getValue('foo')).toBe('bar');

		expect(product.attributes.getAllValues()).toEqual({ foo: 'bar' });
	});

	describe('requireAttr', () => {
		describe('non multivalue attribute', () => {
			beforeEach(() => {
				attribute = new ProductAttr({ name: 'foo', type: ProductAttrValueType.STRING, values: ['bar'] });
			});

			test('should add condition for non multivalue attribute', () => {
				product.attributes.add(attribute, 'bar');

				const conditions = product.getConditions();
				expect(conditions.length).toBe(1);

				const condition = conditions[0];
				expect(condition.columnName).toBe('foo');
				expect(condition.operator).toBe(ConditionOperators.EQUAL);
				expect(condition.conditionValue).toBe('bar');
			});
		});

		describe('multivalue attribute', () => {
			beforeEach(() => {
				attribute = new ProductAttr({
					name: 'foo',
					type: ProductAttrValueType.STRING,
					multivalue: true,
					values: ['bar', 'baz'],
				});
			});

			test('should add conditions for multivalue attribute', () => {
				product.attributes.add(attribute, ['bar', 'baz']);

				const conditions = product.getConditions();
				expect(conditions.length).toBe(2);

				const condition1 = conditions[0];
				expect(condition1.columnName).toBe('foo');
				expect(condition1.operator).toBe(ConditionOperators.IN);
				expect(condition1.conditionValue).toBe('bar');

				const condition2 = conditions[1];
				expect(condition2.columnName).toBe('foo');
				expect(condition2.operator).toBe(ConditionOperators.IN);
				expect(condition2.conditionValue).toBe('baz');
			});
		});
	});

	test('testAttributes', () => {
		const attributes = {
			foo: 'bar',
			baz: 'qux',
		};

		expect(product.attributes.test(attributes)).toBe(true);

		product.attributes.add(new ProductAttr({ name: 'foo', type: ProductAttrValueType.STRING, values: ['bar'] }), 'bar');

		expect(product.attributes.test(attributes)).toBe(true);

		product.attributes.add(new ProductAttr({ name: 'baz', type: ProductAttrValueType.STRING, values: ['fail'] }), 'fail');

		expect(product.attributes.test(attributes)).toBe(false);
	});
});
