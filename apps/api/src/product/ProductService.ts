import { ProductPriceProvider } from '../prices/ProductPriceProvider';
import { ProductQuantityListCollection } from '../prices/ProductQuantityListCollection';
import { ProductAttr } from './attribute/ProductAttr';
import { ProductFamily } from './ProductFamily';
import { ProductDynamicValue } from './value/ProductDynamicValue';
import { MinimumUnitsCollection } from '$/prices/MinimumUnitsCollection';
import { Collection, CollectionItem } from './Collection';
import { CollectionType } from '$/configuration/interface/CollectionConfig';
import { AttributesMap } from '@stickerapp-org/nomisma';
import { ProductAttrAsset } from './attribute/Asset/ProductAttrAsset';
import { ProductAttrConstraint } from './attribute/Constraint/ProductAttrConstraint';
import { ProductAttrFilter } from './attribute/Filter/ProductAttrFilter';

export class ProductService {
	protected attributes: Record<string, ProductAttr> = {};
	protected productFamilies: Record<string, ProductFamily> = {};

	/**
	 * Collections are used to store a set of values, such as filters and constraints.
	 */
	protected collections: Record<CollectionType, Record<string, Collection<any>>> = {
		filter: {},
		constraint: {},
		asset: {},
	};

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
		const type = collection.getType();

		if (!this.collections[type]) {
			throw new Error('Collection type not found with name ' + type);
		}

		if (this.collections[type][collection.getCollectionName()]) {
			throw new Error('Collection already exists with name ' + collection.getCollectionName());
		}

		this.collections[type][collection.getCollectionName()] = collection;
	}

	public retrieveCollection<T extends CollectionItem>(type: CollectionType, collectionName: string): Collection<T> | null {
		// if (!this.collections[type]) {
		// 	throw new Error("Collection type not found with name " + type);
		// }

		// if (!this.collections[type][collectionName]) {
		// 	throw new Error("Collection not found with name " + collectionName);
		// }

		return this.collections?.[type]?.[collectionName] ?? null;
	}

	public registerMinimumUnitsCollection(collection: MinimumUnitsCollection): void {
		if (this.minimumUnitsCollections[collection.getCollectionName()]) {
			throw new Error('Minimum units collection already exists with name ' + collection.getCollectionName());
		}

		this.minimumUnitsCollections[collection.getCollectionName()] = collection;
	}

	public retrieveMinimumUnitsCollection(collectionName: string): ProductDynamicValue {
		if (!this.minimumUnitsCollections[collectionName]) {
			throw new Error('Minimum units collection not found with name ' + collectionName);
		}

		return this.minimumUnitsCollections[collectionName];
	}

	public registerAttribute(name: string, attr: ProductAttr): void {
		if (this.attributes[name]) {
			throw new Error('Attribute already exists with name ' + attr.getName());
		}

		this.attributes[name] = attr;
	}

	public retrieveAttribute(attrName: string): ProductAttr {
		if (!this.attributes[attrName]) {
			/** Start tempory compatibility code */
			/** This code allows MaterialAttribute to resolve to material, the new name */
			/** TODO: remove when no longer needed */
			const lowerAttrName = attrName.toLowerCase().replace('attribute', '');

			if (this.attributes[lowerAttrName]) {
				return this.attributes[lowerAttrName];
			}
			/** End of temporary code */

			throw new Error('Attribute not found with name ' + attrName);
		}

		return this.attributes[attrName];
	}

	public registerProductFamily(name: string, instance: ProductFamily): void {
		if (this.productFamilies[name]) {
			throw new Error('Product family already exists with name ' + instance.getName());
		}

		this.productFamilies[name] = instance;
	}

	public retrieveProductFamily(productFamilyName: string): ProductFamily {
		if (!this.productFamilies[productFamilyName]) {
			throw new Error('Product family not found with name ' + productFamilyName);
		}

		return this.productFamilies[productFamilyName];
	}

	public registerPriceProvider(provider: ProductPriceProvider): void {
		if (this.priceProviders[provider.getName()]) {
			throw new Error('PriceProvider already exists with name ' + provider.getName());
		}

		this.priceProviders[provider.getName()] = provider;
	}

	public retrievePriceProvider(providerName: string): ProductPriceProvider {
		if (!this.priceProviders[providerName]) {
			throw new Error('PriceProvider not found with name ' + providerName);
		}

		return this.priceProviders[providerName];
	}

	public registerQuantityListCollection(collection: ProductQuantityListCollection): void {
		if (this.quantityListCollections[collection.getCollectionName()]) {
			throw new Error('QuantityList collection already exists with name ' + collection.getCollectionName());
		}

		this.quantityListCollections[collection.getCollectionName()] = collection;
	}

	public retrieveQuantityListCollection(collectionName: string): ProductQuantityListCollection {
		if (!this.quantityListCollections[collectionName]) {
			throw new Error('QuantityList collection not found with name ' + collectionName);
		}

		return this.quantityListCollections[collectionName];
	}

	public getAttributes(): ProductAttr[] {
		return Object.values(this.attributes);
	}

	public getProductFamilies(): ProductFamily[] {
		return Object.values(this.productFamilies);
	}

	public getProductMap(familyName: string, productName?: string): AttributesMap {
		let map: AttributesMap = {};

		const family = this.retrieveProductFamily(familyName);
		const asset = this.retrieveCollection<ProductAttrAsset>(CollectionType.Asset, family.getAssetCollectionName());
		const filter = this.retrieveCollection<ProductAttrFilter>(CollectionType.Filter, family.getFilterCollectionName());
		const constraint = this.retrieveCollection<ProductAttrConstraint>(CollectionType.Constraint, family.getConstraintsCollectionName());

		for (const [attrName, { instance: attr }] of Object.entries(family.attributes.getAll())) {
			const attrValues: Record<string, string | null> = {};

			const attrConstraint = constraint?.get(attrName);
			const attrFilter = filter?.get(attrName);
			const attrAsset = asset?.get(attrName);

			const attrValueOptions = family.getAttributeValueOptions(attr, productName ? family.getProduct(productName) : undefined);

			let icons: Record<string, string> = {};

			for (const attrValue of attrValueOptions) {
				const conditionsBuilder = attrConstraint?.getConstraint(attrValue) ?? null;

				if (typeof attrValue === 'string') {
					const iconBuilder = attrAsset?.getWizardIcon(attrValue) ?? null;

					if (iconBuilder) {
						icons[attrValue] = iconBuilder;
					}
				}

				attrValues[attrValue.toString()] = conditionsBuilder ? `${conditionsBuilder}` : null;
			}

			const filters =
				attrFilter?.getFilters().map((filteredValues) => ({
					name: filteredValues.getName(),
					values: filteredValues.getValues(),
					conditions: `${filteredValues.conditionBuilder}`,
					conditionsComplexityScore: filteredValues.conditionBuilder.calculateComplexityScore(),
				})) ?? [];

			map[attrName] = {
				alias: attrName,
				isDynamicValue: attr.isDynamicValue(),
				isMultiValue: attr.isMultiValue(),
				valueType: attr.getValueType(),
				isRequired: family.attributes.get(attrName)?.required === true,
				valuesAndConstraints: attrValues,
				icons: icons,
				filters: filters,
				filterMode: attrFilter?.getMode() ?? null,
				outOfStockValues: attrAsset?.getUnavailableValues() ?? [],
			};
		}

		return map;
	}
}
