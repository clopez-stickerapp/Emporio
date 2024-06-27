import { ProductItem } from "./ProductItem";
import { Product } from "./Product";
import { FamilyConfig } from "$/configuration/interface/FamilyConfig";
import { ProductAttr } from "./attribute/ProductAttr";
import { AllUnitTypes, UnitTypeNames } from "./unit-type/AllUnitTypes";
import { UnitType } from "./unit-type/UnitType";
import { ProductConfig } from "$/configuration/interface/ProductConfig";

export class ProductFamily {
	protected name: string;
	protected attrConstraintCollectionName: string;
	protected attrFilterCollectionName: string;
	protected minimumUnitsCollectionName: string;
	protected attrOutOfStockCollectionName: string = ""; // Todo
	protected attrIconCollectionName: string = ""; // Todo
	protected attrStockCollectionName: string = ""; // Todo
	protected productItemProcessorCollectionName: string = ""; // Todo
	protected priceProviderName: string;
	protected productQuantityListCollectionName: string;

	protected unitType: UnitType;

	protected products: Record<string, Product> = {};
	protected requiredAttrs: Record<string, ProductAttr> = {};
	protected supportedAttrs: Record<string, ProductAttr> = {};

	public constructor(config: FamilyConfig){
		this.name = config.name;
		this.attrConstraintCollectionName = config.rules.collections.constraint;
		this.attrFilterCollectionName = config.rules.collections.filter;
		this.minimumUnitsCollectionName = config.rules.collections.min_units;
		this.priceProviderName = config.rules.collections.price_provider;
		this.productQuantityListCollectionName = config.rules.collections.quantity_provider;

		this.unitType = AllUnitTypes[config.unitType as UnitTypeNames];
	}

	public getName(): string {
		return this.name;
	}

	public addProduct(config: ProductConfig): Product {
		if (this.products[config.name]) {
			throw new Error("Product already exists: " + config.name);
		}

		const product = new Product(this.getName(), config);
		this.products[config.name] = product;

		return product;
	}

	public getProduct(productName: string): Product {
		if (this.products[productName]) {
			return this.products[productName];
		}

		throw new Error("Product not found: " + productName);
	}

	public getProducts(): Record<string, Product> {
		return this.products;
	}

	public requireAttr(name: string, instance: ProductAttr): void {
		if (this.requiredAttrs[name]) {
			throw new Error("Attribute alias already required.");
		}

		if (this.supportedAttrs[name]) {
			throw new Error("Attribute alias already supported.");
		}

		this.requiredAttrs[name] = instance;
	}

	public getRequiredAttrs(): Record<string, ProductAttr> {
		return this.requiredAttrs;
	}

	public isRequired(alias: string): boolean {
		return this.requiredAttrs[alias] !== undefined;
	}

	public supportAttr(name: string, instance: ProductAttr): void {
		if (this.requiredAttrs[name]) {
			throw new Error("Attribute alias already required.");
		}

		if (this.supportedAttrs[name]) {
			throw new Error("Attribute alias already supported.");
		}

		this.supportedAttrs[name] = instance;
	}

	public getSupportedAttrs(): Record<string, ProductAttr> {
		return this.supportedAttrs;
	}

	public isSupported(alias: string): boolean {
		if (this.isRequired(alias)) {
			return true;
		}

		return this.supportedAttrs[alias] !== undefined;
	}

	public getAttributes(): Record<string, ProductAttr> {
		return {...this.supportedAttrs, ...this.requiredAttrs};
	}

	public getAttribute(name: string): ProductAttr {
		if (this.requiredAttrs[name]) {
			return this.requiredAttrs[name];
		}

		if (this.supportedAttrs[name]) {
			return this.supportedAttrs[name];
		}

		throw new Error("Alias is not supported by product family: " + name + " (" + this.getName() + ")");
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

	public getIconsCollectionName(): string {
		return this.attrIconCollectionName;
	}

	public getStockCollectionName(): string {
		return this.attrStockCollectionName;
	}

	public getPriceProviderName(): string {
		return this.priceProviderName;
	}

	public getQuantityCollectionName(): string {
		return this.productQuantityListCollectionName;
	}

	public validateUnits(productItem: ProductItem): void{
		productItem.setUnits(this.calculateUnits(productItem));
	}

	public calculateUnits(productItem: ProductItem): number {
		return this.unitType.calculateUnits(productItem);
	}

	public getMinimumQuantity(productItem: ProductItem): number {
		return 1;
	}

	public canHaveAttr(attrName: string): boolean {
		if(this.getRequiredAttrs()[attrName] || this.getSupportedAttrs()[attrName]){
			return true;
		}

		return false;
	}

	public getOutOfStockProducts(): string[] {
		const outOfStockProducts: string[] = [];
		for (const product of Object.values(this.products)) {
			if (product.isInStock() === false) {
				outOfStockProducts.push(product.getName());
			}
		}

		return outOfStockProducts;
	}
}
