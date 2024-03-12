import { AttributeValueMulti, AttributeValueSingle } from "../../Helper/Condition/AttributeValue";
import { ProductPriceProvider } from "./Price/ProductPriceProvider";
import { ProductQuantityListCollection } from "./Price/ProductQuantityListCollection";
import { ProductAttrConstraintCollection } from "./Product/Attribute/Constraint/ProductAttrConstraintCollection";
import { ProductAttrFilterCollection } from "./Product/Attribute/Filter/ProductAttrFilterCollection";
import { ProductAttrIconCollection } from "./Product/Attribute/Icon/ProductAttrIconCollection";
import { ProductAttr } from "./Product/Attribute/ProductAttr";
import { ProductAttrValue } from "./Product/Attribute/ProductAttrValue";
import { ProductAttrStockCollection } from "./Product/Attribute/Stock/ProductAttrStockCollection";
import { ProductItem } from "./Product/Item/ProductItem";
import { Product } from "./Product/Product";
import { ProductFamily } from "./Product/ProductFamily";

export class ProductService {
	protected attributes: Record<string, ProductAttr> = {};
	protected productFamilies: Record<string, ProductFamily> = {};
	protected productSkus: string[] = [];

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

	public registerAttribute(attr: ProductAttr): void {
		if (this.attributes[attr.getUID()]) {
			throw new Error("Attribute already exists with UID " + attr.getUID());
		}

		this.attributes[attr.getUID()] = attr;
	}

	public retrieveAttribute(attrUID: string): ProductAttr {
		if (!this.attributes[attrUID]) {
			throw new Error("Attribute not found with UID " + attrUID);
		}

		return this.attributes[attrUID];
	}

	public registerProductFamily(productFamily: ProductFamily): void {
		if (this.productFamilies[productFamily.getName()]) {
			throw new Error("Product family already exists with name " + productFamily.getName());
		}

		this.productFamilies[productFamily.getName()] = productFamily;
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

	public retrieveAttributes(): ProductAttr[] {
		throw new Error("Where is this used, just curious to see if it's needed, should be called getAttributes")
		return Array.from(Object.values(this.attributes));
	}

	public retrieveProductFamilies(): ProductFamily[] {
		throw new Error("Where is this used, just curious to see if it's needed, should also just be named getProductFamilies")
		return Array.from(Object.values(this.productFamilies));
	}

	public findAttributeValue(attributeUID: string, attributeValue: AttributeValueSingle): ProductAttrValue | null {
		throw new Error("I don't think this function is needed.")
		if (this.attributes[attributeUID]) {
			return this.attributes[attributeUID].getAttrValue(attributeValue);
		}

		return null;
	}

	public findProduct(productFamilyName: string, productName: string): Product{
		if (this.productFamilies[productFamilyName]) {
			return this.productFamilies[productFamilyName].getProduct(productName);
		} else {
			throw new Error("Product family not found with name " + productFamilyName);
		}
	}

	public registerProductSku(sku: string): void {
		if (this.productSkus.includes(sku)) {
			throw new Error("SKU " + sku + " already exists. SKU value must be unique per product");
		}

		this.productSkus.push(sku);
	}

	public getAllAttributeValueOptionsForProduct( product: Product, attrAlias: string ): AttributeValueMulti
	{
		const attrUID = product.getProductFamily().findAttrUIDByAlias( attrAlias );
		const attrValues = this.getDefaultAttributeValueOptionsForProduct( product, attrAlias );

		if ( !product.isAttrStrictlyRequiredFor( attrAlias ) ) 
		{
			for ( const attrValue of this.retrieveAttribute( attrUID ).getValues() ) 
			{
				if ( !attrValues.includes( attrValue.getValue() ) ) 
				{
					attrValues.push( attrValue.getValue() );
				}
			}
		}

		return attrValues;
	}

	public getDefaultAttributeValueOptionsForProduct( product: Product, attrAlias: string ): AttributeValueMulti 
	{
		const attrValues: AttributeValueMulti = [];
		const attrUID = product.getProductFamily().findAttrUIDByAlias( attrAlias );
		const attr = product.getProductService().retrieveAttribute( attrUID );
		let withAttrValues = product.getAttrValue( attrAlias ) ?? [];

		if ( !Array.isArray( withAttrValues ) ) 
		{
			withAttrValues = [ withAttrValues ]
		}

		for ( const attrRawValue of withAttrValues ) 
		{
			if ( attr.isDynamicValue() ) 
			{
				attrValues.push( attrRawValue );
			} 
			else 
			{
				const attrValue = this.retrieveAttribute( attrUID ).getAttrValue( attrRawValue );
				
				if ( attrValue ) 
				{
					attrValues.push( attrValue.getValue() );
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
