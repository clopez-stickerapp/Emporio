import { ProductConfig } from '$/configuration/interface/ProductConfig';
import { AttributeManager } from './attribute/AttributeManager';

export class Product {
  protected productFamilyName: string;
  protected name: string;
  protected available: boolean;
  protected status?: string;
  protected sku: string;
  protected attributeManager: AttributeManager;

  public constructor(productFamilyName: string, config: ProductConfig) {
    this.productFamilyName = productFamilyName;
    this.name = config.name;
    this.status = config.status;
    this.available = config.available ?? true;
    this.sku = config.sku;
    this.attributeManager = new AttributeManager();
  }

  public getName(): string {
    return this.name;
  }

  public getProductFamilyName(): string {
    return this.productFamilyName;
  }

  public getAttributeManager(): AttributeManager {
    return this.attributeManager;
  }

  public isAvailable(): boolean {
    return this.available;
  }

  public getStatus(): string | undefined {
    return this.status;
  }

  public getSku(): string {
    return this.sku;
  }
}
