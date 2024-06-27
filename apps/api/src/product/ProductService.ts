import { ProductPriceProvider } from "../prices/ProductPriceProvider";
import { ProductQuantityListCollection } from "../prices/ProductQuantityListCollection";
import { ProductAttrConstraintCollection } from "./attribute/Constraint/ProductAttrConstraintCollection";
import { ProductAttrFilterCollection } from "./attribute/Filter/ProductAttrFilterCollection";
import { ProductAttrIconCollection } from "./attribute/Icon/ProductAttrIconCollection";
import { ProductAttr } from "./attribute/ProductAttr";
import { ProductAttrStockCollection } from "./attribute/Stock/ProductAttrStockCollection";
import { ProductItem } from "./ProductItem";
import { Product } from "./Product";
import { ProductFamily } from "./ProductFamily";
import { AttributeValueMulti } from "./attribute/AttributeValue";
import { ServiceConfig } from "$/configuration/interface/ServiceConfig";
import { ProductDynamicValue } from "./value/ProductDynamicValue";
import { MinimumUnitsCollection } from "$/prices/MinimumUnitsCollection";

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
	 * Constraints are used to tell the product service which attributes can not be combined.
	 * In other words here we set rules for what is simply not possible to do.
	 *
	 * For instance: Laser materials are impossible to produce a sticker larger than 28cm.
	 */
	protected attrConstraintCollections: Record<string, ProductAttrConstraintCollection> = {};

	/**
	 * Filters are used to limit what attribute values are available / visible.
	 * For instance: only show a set of materials if a specific product is selected.
	 *
	 * We can then choose to ignore filters for admin / QT users.
	 */
	protected attrFilterCollections: Record<string, ProductAttrFilterCollection> = {};

	/**
	 * Icons are used to show icons in the wizard for attributes.
	 * For instance: show a material icon for the material attribute.
	 */
	protected attrIconCollections: Record<string, ProductAttrIconCollection> = {};

	/**
	 * Stock keeps track of which attribute values are available to filter on
	 * An product with no valid attribute values should be out of stock
	 *
	 * We can then choose to ignore filters for admin / QT users.
	 */
	protected attrStockCollections: Record<string, ProductAttrStockCollection> = {};

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

	public registerAttrFilterCollection(collection: ProductAttrFilterCollection): void {
		if (this.attrFilterCollections[collection.getCollectionName()]) {
			throw new Error("Filter collection already exists with name " + collection.getCollectionName());
		}

		this.attrFilterCollections[collection.getCollectionName()] = collection;
	}

	public retrieveAttrFilterCollection(collectionName: string): ProductAttrFilterCollection {
		if (!this.attrFilterCollections[collectionName]) {
			throw new Error("Filter collection not found with name " + collectionName);
		}

		return this.attrFilterCollections[collectionName];
	}

	public registerAttrIconCollection(collection: ProductAttrIconCollection): void {
		if (this.attrIconCollections[collection.getCollectionName()]) {
			throw new Error("Icon collection already exists with name " + collection.getCollectionName());
		}

		this.attrIconCollections[collection.getCollectionName()] = collection;
	}

	public retrieveAttrIconCollection(collectionName: string): ProductAttrIconCollection {
		if (!this.attrIconCollections[collectionName]) {
			throw new Error("Icon collection not found with name " + collectionName);
		}

		return this.attrIconCollections[collectionName];
	}

	public registerAttrConstraintCollection(collection: ProductAttrConstraintCollection): void {
		if (this.attrConstraintCollections[collection.getCollectionName()]) {
			throw new Error("Constraint collection already exists with name " + collection.getCollectionName());
		}

		this.attrConstraintCollections[collection.getCollectionName()] = collection;
	}

	public retrieveAttrConstraintCollection(collectionName: string): ProductAttrConstraintCollection {
		if (!this.attrConstraintCollections[collectionName]) {
			throw new Error("Constraint collection not found with name " + collectionName);
		}

		return this.attrConstraintCollections[collectionName];
	}

	public registerAttrStockCollection(collection: ProductAttrStockCollection): void {
		if (this.attrStockCollections[collection.getCollectionName()]) {
			throw new Error("Stock collection already exists with name " + collection.getCollectionName());
		}

		this.attrStockCollections[collection.getCollectionName()] = collection;
	}

	public retrieveAttrStockCollection(collectionName: string): ProductAttrStockCollection {
		if (!this.attrStockCollections[collectionName]) {
			throw new Error("Stock collection not found with name " + collectionName);
		}

		return this.attrStockCollections[collectionName];
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
		return Array.from(Object.values(this.attributes));
	}

	public getProductFamilies(): ProductFamily[] {
		return Array.from(Object.values(this.productFamilies));
	}

	public findProduct(productFamilyName: string, productName: string): Product{
		if (this.productFamilies[productFamilyName]) {
			return this.productFamilies[productFamilyName].getProduct(productName);
		} else {
			throw new Error("Product family not found with name " + productFamilyName);
		}
	}

	public getAllAttributeValueOptionsForProduct( product: Product, attrAlias: string ): AttributeValueMulti
	{
		const attribute = this.retrieveProductFamily( product.getProductFamilyName()).getAttribute( attrAlias );
		const attrValues = this.getDefaultAttributeValueOptionsForProduct( product, attrAlias );

		if ( !product.isAttrStrictlyRequiredFor( attrAlias ) ) 
		{
			for ( const attrValue of attribute.getValues() ) 
			{
				if ( !attrValues.includes( attrValue ) ) 
				{
					attrValues.push( attrValue );
				}
			}
		}

		return attrValues;
	}

	public getDefaultAttributeValueOptionsForProduct( product: Product, attrAlias: string ): AttributeValueMulti 
	{
		const attrValues: AttributeValueMulti = [];
		const attribute = this.retrieveProductFamily( product.getProductFamilyName()).getAttribute( attrAlias );

		let withAttrValues = product.getAttrValue( attrAlias ) ?? [];

		if ( !Array.isArray( withAttrValues ) ) 
		{
			withAttrValues = [ withAttrValues ]
		}

		for ( const attrRawValue of withAttrValues ) 
		{
			if ( attribute.isDynamicValue() ) 
			{
				attrValues.push( attrRawValue );
			} 
			else 
			{
				const attrValue = attribute.getAttrValue( attrRawValue );
				
				if ( attrValue ) 
				{
					attrValues.push( attrValue );
				}
			}
		}

		return attrValues;
	}

	public hasProductRecommendedValuesFor( productItem: ProductItem, attributeName: string ): boolean 
	{
		const productFamily = this.retrieveProductFamily( productItem.getProductFamilyName() );
		
		if ( productFamily.isRequired( attributeName ) ) 
		{
			return true;
		} 
		else if ( productFamily.isSupported( attributeName ) ) 
		{
			return this.findProduct( productItem.getProductFamilyName(), productItem.getProductName() ).isAttrRecommendedFor( attributeName );
		}

		return false;
	}
}
