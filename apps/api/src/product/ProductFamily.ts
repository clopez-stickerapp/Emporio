import { Product } from './Product';
import { FamilyConfig } from '$/configuration/interface/FamilyConfig';
import { ProductAttr } from './attribute/ProductAttr';
import { AllUnitTypes, UnitTypeNames } from './unit-type/AllUnitTypes';
import { UnitType } from './unit-type/UnitType';
import { ProductConfig } from '$/configuration/interface/ProductConfig';
import { AttributeValueMulti, ProductItem } from '@stickerapp-org/nomisma';
import { AttributeManager } from './attribute/AttributeManager';
import { toArray, unique } from '../../Util';

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

		for (const [name, attrValueOnProduct] of Object.entries(config.attributes ?? {})) {
			const attribute = this.attributes.get(name);
			const attrValueOnFamily = attribute?.attrValue;

			if (!attribute) {
				throw new Error(`Failed to add attribute '${name}': The attribute is not supported by the family`);
			} else if (attrValueOnFamily !== undefined) {
				for (const value of toArray(attrValueOnProduct)) {
					if (!toArray(attrValueOnFamily).includes(value)) {
						throw new Error(
							`Failed to add value '${value}' for attribute '${name}' on product '${product.getName()}': The value is not supported by the family`,
						);
					}
				}
			}

			product.attributes.add(attribute.instance, attrValueOnProduct);
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

	public getAttributeValueOptions(attribute: ProductAttr, product?: Product): AttributeValueMulti {
		let attrValues = toArray(product?.attributes.getValue(attribute.getName()) ?? []);
		if (!attrValues.length) {
			attrValues = toArray(this.attributes.getValue(attribute.getName()) ?? []);
		}
		if (!attrValues.length || attribute.isMultiValue()) {
			return unique(attrValues, attribute.getValues());
		}
		return attrValues;
	}

	public get attributes() {
		return this.attributeManager;
	}
}
