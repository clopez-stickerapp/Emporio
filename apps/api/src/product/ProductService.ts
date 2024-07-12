import { ProductPriceProvider } from "../prices/ProductPriceProvider";
import { ProductQuantityListCollection } from "../prices/ProductQuantityListCollection";
import { ProductAttr } from "./attribute/ProductAttr";
import { Product } from "./Product";
import { ProductFamily } from "./ProductFamily";
import { ServiceConfig } from "$/configuration/interface/ServiceConfig";
import { ProductDynamicValue } from "./value/ProductDynamicValue";
import { MinimumUnitsCollection } from "$/prices/MinimumUnitsCollection";
import { Collection, CollectionItem } from "./Collection";

export class ProductService {
	protected attributes: Record<string, ProductAttr> = {};
	protected productFamilies: Record<string, ProductFamily> = {};

	public constructor(config: ServiceConfig) {
		// this.name = config.name;
		// this.families = config.families ?? [];
		// this.attributes = config.attributes ?? [];
		// this.pricingModels = config.pricing_models ?? [];
	}

	/**
	 * Collections are used to store a set of values, such as filters and constraints.
	 */
	protected collections: Record<string, Collection<any>> = {};

	/**
	 * Quantity lists are used to tell the product service which quantity lists are available.
	 * For instance: only show a set of quantity lists if a specific product is selected.
	 */
	protected quantityListCollections: Record<string, ProductQuantityListCollection> = {};

	/**
	 * Price providers are used to calculate the price for a product.
	 * For instance: calculate the price for a product based on the quantity and the material.
	 */
	protected priceProviders: Record<string, ProductPriceProvider> = {};

	/**
	 * Minimum units are used to tell the product service which are the minimum units 
	 * for a product. No less than the minimum units can be ordered.
	 */
	protected minimumUnitsCollections: Record<string, ProductDynamicValue> = {};

	public registerCollection(collection: Collection<any>): void {
		if (this.collections[collection.getCollectionName()]) {
			throw new Error("Collection already exists with name " + collection.getCollectionName());
		}

		this.collections[collection.getCollectionName()] = collection;
	}

	public retrieveCollection<T extends CollectionItem>(collectionName: string): Collection<T> {
		if (!this.collections[collectionName]) {
			throw new Error("Collection not found with name " + collectionName);
		}

		return this.collections[collectionName];	
	}

	public registerMinimumUnitsCollection(collection: MinimumUnitsCollection): void {
		if (this.minimumUnitsCollections[collection.getCollectionName()]) {
			throw new Error("Minimum units collection already exists with name " + collection.getCollectionName());
		}

		this.minimumUnitsCollections[collection.getCollectionName()] = collection;
	}

	public retrieveMinimumUnitsCollection(collectionName: string): ProductDynamicValue {
		if (!this.minimumUnitsCollections[collectionName]) {
			throw new Error("Minimum units collection not found with name " + collectionName);
		}

		return this.minimumUnitsCollections[collectionName];
	}

	public registerAttribute(name: string, attr: ProductAttr): void {
		if (this.attributes[name]) {
			throw new Error("Attribute already exists with UID " + attr.getUID());
		}

		this.attributes[name] = attr;
	}

	public retrieveAttribute(attrUID: string): ProductAttr {
		if (!this.attributes[attrUID]) {
			throw new Error("Attribute not found with UID " + attrUID);
		}

		return this.attributes[attrUID];
	}

	public registerProductFamily(name: string, instance: ProductFamily): void {
		if (this.productFamilies[name]) {
			throw new Error("Product family already exists with name " + instance.getName());
		}

		this.productFamilies[name] = instance;
	}

	public retrieveProductFamily(productFamilyName: string): ProductFamily {
		if (!this.productFamilies[productFamilyName]) {
			throw new Error("Product family not found with name " + productFamilyName);
		}

		return this.productFamilies[productFamilyName];
	}

	public registerPriceProvider(provider: ProductPriceProvider): void {
		if (this.priceProviders[provider.getName()]) {
			throw new Error("PriceProvider already exists with name " + provider.getName());
		}

		this.priceProviders[provider.getName()] = provider;
	}

	public retrievePriceProvider(providerName: string): ProductPriceProvider {
		if (!this.priceProviders[providerName]) {
			throw new Error("PriceProvider not found with name " + providerName);
		}

		return this.priceProviders[providerName];
	}

	public registerQuantityListCollection(collection: ProductQuantityListCollection): void {
		if (this.quantityListCollections[collection.getCollectionName()]) {
			throw new Error("QuantityList collection already exists with name " + collection.getCollectionName());
		}

		this.quantityListCollections[collection.getCollectionName()] = collection;
	}

	public retrieveQuantityListCollection(collectionName: string): ProductQuantityListCollection {
		if (!this.quantityListCollections[collectionName]) {
			throw new Error("QuantityList collection not found with name " + collectionName);
		}

		return this.quantityListCollections[collectionName];
	}

	public getAttributes(): ProductAttr[] {
		return Object.values(this.attributes);
	}

	public getProductFamilies(): ProductFamily[] {
		return Object.values(this.productFamilies);
	}

	public findProduct(productFamilyName: string, productName: string): Product{
		if (this.productFamilies[productFamilyName]) {
			return this.productFamilies[productFamilyName].getProduct(productName);
		} else {
			throw new Error("Product family not found with name " + productFamilyName);
		}
	}
}
