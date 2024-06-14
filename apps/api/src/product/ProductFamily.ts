import { ProductService } from "./ProductService";
import { ProductAttrConstraintCollection } from "./attribute/Constraint/ProductAttrConstraintCollection";
import { ProductAttrFilterCollection } from "./attribute/Filter/ProductAttrFilterCollection";
import { ProductAttrIconCollection } from "./attribute/Icon/ProductAttrIconCollection";
import { ProductAttrStockCollection } from "./attribute/Stock/ProductAttrStockCollection";
import { ProductItem } from "./ProductItem";
import { Product } from "./Product";
import { ProductDynamicValue } from "./value/ProductDynamicValue";
import { ProductPriceProvider } from "$/prices/ProductPriceProvider";
import { ProductQuantityListCollection } from "$/prices/ProductQuantityListCollection";

export abstract class ProductFamily {
	protected productService: ProductService;
	protected name: string;
	protected attrConstraintCollectionName: string | undefined;
	protected attrFilterCollectionName: string | undefined;
	protected attrOutOfStockCollectionName: string | undefined;
	protected attrIconCollectionName: string | undefined;
	protected attrStockCollectionName: string | undefined;
	protected productItemProcessorCollectionName: string | undefined;
	protected priceProviderName: string | undefined;
	protected productQuantityListCollectionName: string | undefined;

	public minimumUnitsValue: ProductDynamicValue;
	protected products: Record<string, Product> = {};
	protected requiredAttrs: Record<string, string> = {};
	protected supportedAttrs: Record<string, string> = {};

	public constructor(name: string, defaultMinimumUnitsValue: number, productService: ProductService) {
		this.name = name;
		this.minimumUnitsValue = new ProductDynamicValue(defaultMinimumUnitsValue);
		this.productService = productService;
	}

	public getName(): string {
		return this.name;
	}

	public addProduct(productName: string, sku: string){
		if (this.products[productName]) {
			throw new Error("Product already exists: " + productName);
		}

		const product = new Product(this, productName, sku);
		this.productService.registerProductSku(sku);
		this.products[productName] = product;

		return product;
	}

	public getMinimumUnits(productItem: ProductItem): number {
		return this.minimumUnitsValue.getValue(productItem);
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

	public requireAttr(attributeClassRef: string, alias: string): void {
		if (this.requiredAttrs[alias]) {
			throw new Error("Attribute alias already required.");
		}

		if (this.supportedAttrs[alias]) {
			throw new Error("Attribute alias already supported.");
		}

		this.requiredAttrs[alias] = attributeClassRef;
	}

	public getRequiredAttrs(): Record<string, string> {
		return this.requiredAttrs;
	}

	public isRequired(alias: string): boolean {
		return this.requiredAttrs[alias] !== undefined;
	}

	public supportAttr(attributeClassRef: string, alias: string): void {
		if (this.requiredAttrs[alias]) {
			throw new Error("Attribute alias already required.");
		}

		if (this.supportedAttrs[alias]) {
			throw new Error("Attribute alias already supported.");
		}

		this.supportedAttrs[alias] = attributeClassRef;
	}

	public getSupportedAttrs(): Record<string, string> {
		return this.supportedAttrs;
	}

	public isSupported(alias: string): boolean {
		if (this.isRequired(alias)) {
			return true;
		}

		return this.supportedAttrs[alias] !== undefined;
	}

	public getAttributes(): Record<string, string> {
		return {...this.supportedAttrs, ...this.requiredAttrs};
	}

	public findAttrUIDByAlias(alias: string): string {
		if (this.requiredAttrs[alias]) {
			return this.requiredAttrs[alias];
		}

		if (this.supportedAttrs[alias]) {
			return this.supportedAttrs[alias];
		}

		throw new Error("Alias is not supported by product family: " + alias + " (" + this.getName() + ")");
	}

	public getProductService(): ProductService {
		return this.productService;
	}

	public setProductService(productService: ProductService): void {
		this.productService = productService;
	}

	public relateConstraintCollection(collectionName: string): void {
		this.attrConstraintCollectionName = collectionName;
	}

	public getConstraintsCollection(): ProductAttrConstraintCollection | null {
		return this.attrConstraintCollectionName ? this.getProductService().retrieveAttrConstraintCollection(this.attrConstraintCollectionName) : null;
	}

	public relateFilterCollection(collectionName: string): void {
		this.attrFilterCollectionName = collectionName;
	}

	public getFilterCollection(): ProductAttrFilterCollection | null {
		return this.attrFilterCollectionName ? this.getProductService().retrieveAttrFilterCollection(this.attrFilterCollectionName) : null;
	}

	public relateIconCollection(collectionName: string): void {
		this.attrIconCollectionName = collectionName;
	}

	public getIconsCollection(): ProductAttrIconCollection | null {
		return this.attrIconCollectionName ? this.getProductService().retrieveAttrIconCollection(this.attrIconCollectionName) : null;
	}

	public relateStockCollection(collectionName: string): void {
		this.attrStockCollectionName = collectionName;
	}

	public getStockCollection(): ProductAttrStockCollection | null {
		return this.attrStockCollectionName ? this.getProductService().retrieveAttrStockCollection(this.attrStockCollectionName) : null;
	}

	public relateProductPriceProvider(collectionName: string): void {
		this.priceProviderName = collectionName;
	}

	public getProductPriceProvider(): ProductPriceProvider | null {
		return this.priceProviderName ? this.getProductService().retrievePriceProvider(this.priceProviderName) : null;
	}

	public relateProductQuantityListCollection(collectionName: string): void {
		this.productQuantityListCollectionName = collectionName;
	}

	public getProductQuantityListCollection(): ProductQuantityListCollection | null {
		return this.productQuantityListCollectionName ? this.getProductService().retrieveQuantityListCollection(this.productQuantityListCollectionName) : null;
	}

	public validateUnits(productItem: ProductItem): void{
		productItem.setUnits(this.calculateUnits(productItem));
	}

	public abstract calculateUnits(productItem: ProductItem): number;

	public getMinimumQuantity(productItem: ProductItem): number {
		return 1;
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
