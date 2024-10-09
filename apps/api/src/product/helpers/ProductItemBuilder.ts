import { ProductFamily } from '../ProductFamily';
import { Product } from '../Product';
import { ProductItem, AttributesMap, ProductAttrComputer } from '@stickerapp-org/nomisma';

export class ProductItemBuilder {
  protected attrComputer: ProductAttrComputer;

  public constructor() {
    this.attrComputer = new ProductAttrComputer();
  }

  public createItem(
    productFamily: ProductFamily,
    product: Product,
    map: AttributesMap,
    useFilters: boolean = true,
  ): ProductItem {
    const item = new ProductItem(productFamily.getName(), product.getName());

    this.attrComputer.evaluate(item, map, useFilters);

    for (let [attrName, attrValue] of Object.entries(
      product.getAttributeManager().getAllValues(),
    )) {
      const attr = productFamily.getAttribute(attrName);

      if (Array.isArray(attrValue) && attrValue.length && !attr.isMultiValue()) {
        attrValue = attrValue[0];
      }

      if (attrValue !== undefined && attr.canBe(attrValue)) {
        item.setAttribute(attrName, attrValue);
      }
    }

    this.attrComputer.evaluate(item, map, useFilters);

    for (const [attrName, { instance: attr, required }] of Object.entries(
      productFamily.getAttributeManager().getAll(),
    )) {
      if (!required) {
        continue;
      }
      let attrValue = product.getAttributeManager().getValue(attrName);

      if (attrValue === undefined) {
        const defaultValue = this.attrComputer.getDefaultValue(attrName);

        if (defaultValue !== null) {
          attrValue = defaultValue;
        }

        if (Array.isArray(attrValue) && attrValue.length && !attr.isMultiValue()) {
          attrValue = attrValue[0];
        }

        if (attrValue !== undefined) {
          item.setAttribute(attrName, attrValue);

          this.attrComputer.evaluate(item, map, useFilters);
        }
      }
    }

    return item;
  }
}
