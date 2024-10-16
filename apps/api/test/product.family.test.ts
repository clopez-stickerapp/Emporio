import { ProductAttr } from '$/product/attribute/ProductAttr';
import { Product } from '$/product/Product';
import { ProductFamily } from '$/product/ProductFamily';
import { UnitTypeNames } from '$/product/unit-type/AllUnitTypes';
import { ProductAttrValueType } from '@stickerapp-org/nomisma';

let family: ProductFamily;

describe('ProductFamily', () => {
	beforeEach(() => {
		family = new ProductFamily({
			name: 'foo',
			products: [],
			rules: {
				collections: {
					asset: '',
					constraint: '',
					filter: '',
					min_units: '',
					price_provider: '',
					quantity_provider: '',
				},
			},
			unitType: UnitTypeNames.PerPiece,
		});
	});

	test('getName', () => {
		expect(family.getName()).toBe('foo');
	});

	test('addProduct', () => {
		expect(() => family.getProduct('bar')).toThrowError(Error);

		family.addProduct({
			name: 'bar',
			sku: 'baz',
			available: true,
			status: 'active',
		});

		expect(family.getProduct('bar')).toBeDefined();
	});

	test('getProducts', () => {
		expect(family.getProducts()).toEqual({});

		family.addProduct({
			name: 'bar',
			sku: 'baz',
			available: true,
			status: 'active',
		});

		expect(family.getProducts()).toEqual({ bar: expect.any(Product) });
	});

	test('attributes', () => {
		const attrFoo = new ProductAttr({
			name: 'foo',
			type: ProductAttrValueType.STRING,
			values: ['bar', 'baz'],
		});
		const attrBar = new ProductAttr({
			name: 'bar',
			type: ProductAttrValueType.STRING,
			values: ['foo', 'baz'],
		});

		expect(() => family.attributes.add(attrFoo, undefined, false, { required: true })).not.toThrowError(Error);
		expect(() => family.attributes.add(attrFoo, undefined, false, { required: true })).toThrowError(Error);
		expect(() => family.attributes.add(attrFoo, undefined, false, { required: false })).toThrowError(Error);
		expect(() => family.attributes.add(attrBar, undefined, false, { required: false })).not.toThrowError(Error);
		expect(() => family.attributes.add(attrBar, undefined, false, { required: true })).toThrowError(Error);
		expect(() => family.attributes.add(attrBar, undefined, false, { required: false })).toThrowError(Error);

		expect(family.attributes.get('foo')?.required).toBe(true);
		expect(family.attributes.get('bar')?.required).toBe(false);

		expect(family.attributes.has('bar')).toBe(true);
		expect(family.attributes.has('foo')).toBe(true);

		expect(Object.values(family.attributes.getAll()).map((attribute) => attribute.instance)).toEqual([attrFoo, attrBar]);
	});

	test('getAttributeValueOptions', () => {
		let family = new ProductFamily({
			name: 'foo',
			products: [],
			rules: {
				collections: {
					asset: '',
					constraint: '',
					filter: '',
					min_units: '',
					price_provider: '',
					quantity_provider: '',
				},
			},
			unitType: UnitTypeNames.PerPiece,
		});

		family.addProduct({
			name: 'bar',
			sku: 'baz',
			available: true,
			status: 'active',
		});

		const attribute = new ProductAttr({ name: 'foo', type: ProductAttrValueType.STRING, values: ['bar', 'baz'] });
		family.attributes.add(attribute);

		expect(family.getAttributeValueOptions(attribute, family.getProduct('bar'))).toEqual(['bar', 'baz']);
	});
});
