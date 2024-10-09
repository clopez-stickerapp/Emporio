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

    expect(() =>
      family.getAttributeManager().add(attrFoo, undefined, { required: true }),
    ).not.toThrowError(Error);
    expect(() =>
      family.getAttributeManager().add(attrFoo, undefined, { required: true }),
    ).toThrowError(Error);
    expect(() =>
      family.getAttributeManager().add(attrFoo, undefined, { required: false }),
    ).toThrowError(Error);
    expect(() =>
      family.getAttributeManager().add(attrBar, undefined, { required: false }),
    ).not.toThrowError(Error);
    expect(() =>
      family.getAttributeManager().add(attrBar, undefined, { required: true }),
    ).toThrowError(Error);
    expect(() =>
      family.getAttributeManager().add(attrBar, undefined, { required: false }),
    ).toThrowError(Error);

    expect(family.getAttributeManager().get('foo')?.required).toBe(true);
    expect(family.getAttributeManager().get('bar')?.required).toBe(false);

    expect(family.getAttributeManager().has('bar')).toBe(true);
    expect(family.getAttributeManager().has('foo')).toBe(true);

    expect(family.getAttributeManager().getAll()).toEqual({
      foo: {
        instance: attrFoo,
        attrValue: undefined,
        required: true,
      },
      bar: {
        instance: attrBar,
        attrValue: undefined,
        required: false,
      },
    });
  });

  test('getAllAttributeValueOptionsForProduct', () => {
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

    family
      .getAttributeManager()
      .add(
        new ProductAttr({ name: 'foo', type: ProductAttrValueType.STRING, values: ['bar', 'baz'] }),
      );

    expect(family.getAllAttributeValueOptionsForProduct(family.getProduct('bar'), 'foo')).toEqual([
      'bar',
      'baz',
    ]);
  });

  test('getDefaultAttributeValueOptionsForProduct', () => {
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

    family
      .getAttributeManager()
      .add(new ProductAttr({ name: 'foo', type: ProductAttrValueType.STRING }));

    expect(
      family.getDefaultAttributeValueOptionsForProduct(family.getProduct('bar'), 'foo'),
    ).toEqual([]);
  });
});
