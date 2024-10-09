import { ProductItemConditionableParam } from '../condition/ProductItemConditionableParam';
import { ProductFamily } from '../ProductFamily';

export class ProductItemConditionablesMap {
  public map: Record<string, ProductItemConditionableParam> = {};

  public constructor(productFamily: ProductFamily) {
    const productNameConditionable = new ProductItemConditionableParam(
      'item.productName',
      'Product name',
      false,
      false,
      'string',
    );
    for (const product of Object.values(productFamily.getProducts())) {
      productNameConditionable.values.push(product.getName());
    }
    this.map['item.productName'] = productNameConditionable;
    const unitConditionable = new ProductItemConditionableParam(
      'item.units',
      'Units',
      true,
      false,
      'float',
    );
    this.map['item.units'] = unitConditionable;
    for (const [alias, { instance: productAttr }] of Object.entries(
      productFamily.getAttributeManager().getAll(),
    )) {
      const values: string[] = [];
      for (const attrValue of productAttr.getValues()) {
        values.push(attrValue.toString());
      }
      const productAttrConditionable = new ProductItemConditionableParam(
        `item.attributes.${alias}`,
        alias,
        productAttr.isDynamicValue(),
        productAttr.isMultiValue(),
        productAttr.getValueType(),
        values,
      );
      this.map[`item.attributes.${alias}`] = productAttrConditionable;
    }
  }
}
