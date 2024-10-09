import { Product } from './Product';
import { FamilyConfig } from '$/configuration/interface/FamilyConfig';
import { ProductAttr } from './attribute/ProductAttr';
import { AllUnitTypes, UnitTypeNames } from './unit-type/AllUnitTypes';
import { UnitType } from './unit-type/UnitType';
import { ProductConfig } from '$/configuration/interface/ProductConfig';
import { AttributeValueMulti, ProductItem } from '@stickerapp-org/nomisma';
import { AttributeManager } from './attribute/AttributeManager';

export class ProductFamily {
  protected name: string;
  protected attrConstraintCollectionName: string;
  protected attrFilterCollectionName: string;
  protected minimumUnitsCollectionName: string;
  protected priceProviderName: string;
  protected productQuantityListCollectionName: string;
  protected assetCollectionName: string;

  protected unitType: UnitType;

  protected products: Record<string, Product> = {};
  protected attributeManager: AttributeManager<{ required: boolean }> = new AttributeManager();

  public constructor(config: FamilyConfig) {
    this.name = config.name;
    this.attrConstraintCollectionName = config.rules.collections.constraint;
    this.attrFilterCollectionName = config.rules.collections.filter;
    this.minimumUnitsCollectionName = config.rules.collections.min_units;
    this.priceProviderName = config.rules.collections.price_provider;
    this.productQuantityListCollectionName = config.rules.collections.quantity_provider;
    this.assetCollectionName = config.rules.collections.asset;

    this.unitType = AllUnitTypes[config.unitType as UnitTypeNames];
  }

  public getName(): string {
    return this.name;
  }

  // Temporary method for moving over to bulk price system
  public setUnitType(unitType: UnitType): void {
    this.unitType = unitType;
  }

  // Temporary method for moving over to bulk price system
  public setPriceProviderName(priceProviderName: string): void {
    this.priceProviderName = priceProviderName;
  }

  // Temporary method for moving over to bulk price system
  public setMinimumUnitsCollectionName(minimumUnitsCollectionName: string): void {
    this.minimumUnitsCollectionName = minimumUnitsCollectionName;
  }

  public addProduct(config: ProductConfig): Product {
    if (this.products[config.name]) {
      throw new Error('Product already exists: ' + config.name);
    }

    const product = new Product(this.getName(), config);

    for (const [name, value] of Object.entries(config.attributes ?? {})) {
      const productAttr = this.getAttribute(name);
      product.getAttributeManager().add(productAttr, value);
    }

    this.products[config.name] = product;

    return product;
  }

  public getProduct(productName: string): Product {
    if (this.products[productName]) {
      return this.products[productName];
    }

    throw new Error('Product not found: ' + productName);
  }

  public getProducts(): Record<string, Product> {
    return this.products;
  }

  public getAttribute(name: string): ProductAttr {
    const attribute = this.attributeManager.get(name);

    if (attribute) {
      return attribute.instance;
    }

    throw new Error("Alias is not supported by '" + this.getName() + "' family: " + name);
  }

  public getAttributeManager() {
    return this.attributeManager;
  }

  public getConstraintsCollectionName(): string {
    return this.attrConstraintCollectionName;
  }

  public getFilterCollectionName(): string {
    return this.attrFilterCollectionName;
  }

  public getMinimumUnitsCollectionName(): string {
    return this.minimumUnitsCollectionName;
  }

  public getAssetCollectionName(): string {
    return this.assetCollectionName;
  }

  public getPriceProviderName(): string {
    return this.priceProviderName;
  }

  public getQuantityCollectionName(): string {
    return this.productQuantityListCollectionName;
  }

  public calculateUnits(productItem: ProductItem): number {
    return this.unitType.calculateUnits(productItem);
  }

  public getAllAttributeValueOptionsForProduct(
    product: Product,
    attrAlias: string,
  ): AttributeValueMulti {
    const attribute = this.getAttribute(attrAlias);
    const attrValues = this.getDefaultAttributeValueOptionsForProduct(product, attrAlias);

    if (!product.getAttributeManager().has(attrAlias) || attribute.isMultiValue()) {
      for (const attrValue of attribute.getValues()) {
        if (!attrValues.includes(attrValue)) {
          attrValues.push(attrValue);
        }
      }
    }

    return attrValues;
  }

  public getDefaultAttributeValueOptionsForProduct(
    product: Product,
    attrAlias: string,
  ): AttributeValueMulti {
    const attrValues: AttributeValueMulti = [];
    const attribute = this.getAttribute(attrAlias);

    let withAttrValues = product.getAttributeManager().getValue(attrAlias) ?? [];

    if (!Array.isArray(withAttrValues)) {
      withAttrValues = [withAttrValues];
    }

    for (const attrRawValue of withAttrValues) {
      if (attribute.isDynamicValue()) {
        attrValues.push(attrRawValue);
      } else {
        const attrValue = attribute.getAttrValue(attrRawValue);

        if (attrValue !== null) {
          attrValues.push(attrValue);
        }
      }
    }

    return attrValues;
  }
}
