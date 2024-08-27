import { readFolder, readYaml, extractFileName } from "$/helpers/FileSystem";
import { ProductFamily } from "$/product/ProductFamily";
import { ProductService } from "$/product/ProductService";
import { ProductAttr } from "$/product/attribute/ProductAttr";
import { NamedConfig } from "$data/NamedConfig";
import { allAttributes } from "./attributes/attributes";
import { RuleConfig } from "./interface/RuleConfig";
import { FamilyConfig } from "./interface/FamilyConfig";
import { PriceProviderConfig } from "./interface/PriceProviderConfig";
import { ProductConfig } from "./interface/ProductConfig";
import { QuantityProviderConfig } from "./interface/QuantityProviderConfig";
import { ServiceConfig } from "./interface/ServiceConfig";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";
import { DynamicValueConfig } from "./interface/DynamicValueConfig";
import { ProductPriceProvider } from "$/prices/ProductPriceProvider";
import { StickerPriceProvider } from "./price-providers/StickerPriceProvider";
import { PromoProductPriceProvider } from "./price-providers/PromoProductPriceProvider";
import { MinimumUnitsCollection } from "$/prices/MinimumUnitsCollection";
import { StickerQuantityListCollection } from "./quantity-providers/StickerQuantityListCollection";
import { ProductQuantityListCollection } from "$/prices/ProductQuantityListCollection";
import { Collection } from "$/product/Collection";
import { CollectionConfig, CollectionType } from "./interface/CollectionConfig";
import { ProductAttrAsset } from "$/product/attribute/Asset/ProductAttrAsset";
import { AssetConfig } from "./interface/AssetConfig";
import { FilterConfig } from "./interface/FilterConfig";

const servicePathFolder = "src/configuration/services";
const familyConfigFolder = "src/configuration/families";
const productConfigFolder = "src/configuration/products";
const constraintPathFolder = "src/configuration/constraints";
const filterPathFolder = "src/configuration/filters";
// const iconPathFolder = "src/configuration/icons";
const minUnitPathFolder = "src/configuration/min-units";
const pricePathFolder = "src/configuration/price-providers";
const quantityPathFolder = "src/configuration/quantity-providers";
const collectionPathFolder = "src/configuration/collections";
const assetPathFolder = "src/configuration/assets";

class ServiceLoader {
	protected serviceConfigs: Record<string, ServiceConfig> = {};
	protected services: Record<string, ProductService> = {};
	protected familyConfigs: Record<string, FamilyConfig> = {};
	protected families: Record<string, ProductFamily> = {};
	protected productConfigs: Record<string, ProductConfig> = {};
	protected attributes: Record<string, ProductAttr> = {};

	protected constraintConfigs: Record<string, RuleConfig> = {};
	protected constraints: Record<string, ProductAttrConstraint> = {};
	protected filterConfigs: Record<string, FilterConfig> = {};
	protected filters: Record<string, ProductAttrFilter> = {};
	// protected iconConfigs: Record<string, NamedConfig> = {};
	protected minUnitsConfigs: Record<string, DynamicValueConfig> = {};
	protected minUnits: Record<string, MinimumUnitsCollection> = {};
	protected priceProviderConfigs: Record<string, PriceProviderConfig> = {};
	protected priceProviders: Record<string, ProductPriceProvider> = {};
	protected quantityProviderConfigs: Record<string, QuantityProviderConfig> = {};
	protected quantityProviders: Record<string, ProductQuantityListCollection> = {};
	protected collectionConfigs: Record<string, CollectionConfig> = {};
	protected collections: Record<string, Collection<any>> = {};
	protected assetConfigs: Record<string, AssetConfig> = {};
	protected assets: Record<string, ProductAttrAsset> = {};

	public constructor() {
		this.load();
		this.instantiate();
		this.registerAttributes();
		this.registerFamilies();
		this.registerProducts();
		this.registerMinUnits();
		this.registerPriceProviders();
		this.registerQuantityLists();
		this.registerCollections();
	}

	protected load(): void {
		console.debug("Loading services...");

		// Load all service configs
		console.debug("Loading service configs...");
		this.serviceConfigs = this.readConfigs<ServiceConfig>(servicePathFolder);

		// Load all family configs
		console.debug("Loading family configs...");
		this.familyConfigs = this.readConfigs<FamilyConfig>(familyConfigFolder);

		// Load all product configs
		console.debug("Loading product configs...");
		this.productConfigs = this.readConfigs<ProductConfig>(productConfigFolder);

		// Load constraints
		console.debug("Loading constraint configs...");
		this.constraintConfigs = this.readConfigs<RuleConfig>(constraintPathFolder);

		// Load filters
		console.debug("Loading filter configs...");
		this.filterConfigs = this.readConfigs<FilterConfig>(filterPathFolder);

		// Load assets
		console.debug("Loading asset configs...");
		this.assetConfigs = this.readConfigs<AssetConfig>(assetPathFolder);

		// Load icons
		// console.debug("Loading icon configs...");
		// this.iconConfigs = this.readConfigs<IconConfig>(iconPathFolder);

		// Load min units
		console.debug("Loading min units configs...");
		this.minUnitsConfigs = this.readConfigs<DynamicValueConfig>(minUnitPathFolder);

		// Load price providers
		// console.debug("Loading price provider configs...");
		// this.priceProviderConfigs = this.readConfigs<PriceProviderConfig>(pricePathFolder);

		// Load quantity providers
		// console.debug("Loading quantity provider configs...");
		// this.quantityProviderConfigs = this.readConfigs<QuantityProviderConfig>(quantityPathFolder);

		// Load collections
		console.debug("Loading collection configs...");
		this.collectionConfigs = this.readConfigs<CollectionConfig>(collectionPathFolder);
	}

	protected instantiate(): void {
		console.debug("Instantiating services...");

		// Instantiate all services
		console.debug("Instantiating service instances...");
		this.services = this.instantiateFromConfig<ServiceConfig, ProductService>(this.serviceConfigs, () => new ProductService());

		// Instantiate all families
		console.debug("Instantiating family instances...");
		this.families = this.instantiateFromConfig<FamilyConfig, ProductFamily>(this.familyConfigs, (config) => new ProductFamily(config));

		// Instantiate all attributes
		console.debug("Instantiating attribute instances...");
		this.attributes = Object.fromEntries(allAttributes.map((attribute) => [ attribute.getName(), attribute ]));

		// Instantiate all constraints
		console.debug("Instantiating constraint instances...");
		this.constraints = this.instantiateFromConfig<RuleConfig, ProductAttrConstraint>(this.constraintConfigs, (config) => new ProductAttrConstraint(config));

		// Instantiate all filters
		console.debug("Instantiating filter instances...");
		this.filters = this.instantiateFromConfig<FilterConfig, ProductAttrFilter>(this.filterConfigs, (config) => new ProductAttrFilter(config));

		// Instantiate all assets
		console.debug("Instantiating asset instances...");
		this.assets = this.instantiateFromConfig<AssetConfig, ProductAttrAsset>(this.assetConfigs, (config) => new ProductAttrAsset(config));

		// Instantiate all min units
		console.debug("Instantiating min units instances...");
		this.minUnits = this.instantiateFromConfig<DynamicValueConfig, MinimumUnitsCollection>(this.minUnitsConfigs, (config) => new MinimumUnitsCollection(config));

		// Instantiate all price providers
		console.debug("Instantiating price provider instances...");
		// this.priceProviders = this.instantiateFromConfig<PriceProviderConfig, PriceProvider>(this.priceProviderConfigs, (config) => new PriceProvider(config));
		this.priceProviders[StickerPriceProvider.NAME] = new StickerPriceProvider();
		this.priceProviders[PromoProductPriceProvider.NAME] = new PromoProductPriceProvider();

		// Instantiate all quantity providers
		console.debug("Instantiating quantity provider instances...");
		// this.quantityProviders = this.instantiateFromConfig<QuantityProviderConfig, QuantityProvider>(this.quantityProviderConfigs, (config) => new QuantityProvider(config));
		this.quantityProviders["sticker_quantity_lists"] = new StickerQuantityListCollection();

		// Instantiate all collections
		console.debug("Instantiating collection instances...");
		this.collections = this.instantiateFromConfig<CollectionConfig, Collection<any>>(this.collectionConfigs, (config) => new Collection(config));
	}

	protected registerAttributes(): void {
		console.debug("Registering attributes...");

		// Register all attributes to services
		for(const [name, attribute] of Object.entries(this.attributes)) {
			for(const service of Object.values(this.services)) {
				service.registerAttribute(name, attribute);
			}
		}
	}

	protected registerFamilies(): void {
		// Register all families to services
		for(const [name, serviceConfig] of Object.entries(this.serviceConfigs)) {
			const service = this.services[name];

			for(const family of serviceConfig.families?? []) {
				console.debug(`Registering family '${family}' for service '${name}'...`);
				const familyInstance = this.families[family];
				this.services[name].registerProductFamily(family, familyInstance);

				// Require all attributes for all families		
				const familyConfig = this.familyConfigs[family];
				for(const attribute of familyConfig.rules.attributes?.required?? []) {
					console.debug(`Requiring attribute '${attribute}' for family '${family}'...`);
					const attributeInstance = service.retrieveAttribute(attribute);
					familyInstance.requireAttr(attribute, attributeInstance);
				}

				// Support optional attributes for all families
				for(const attribute of familyConfig.rules.attributes?.optional ?? []) {
					console.debug(`Supporting attribute '${attribute}' for family '${family}'...`);
					const attributeInstance = service.retrieveAttribute(attribute);
					familyInstance.supportAttr(attribute, attributeInstance);
				}
			}	
		}
	}

	protected registerProducts(): void {
		console.debug("Registering products...");

		// Register all products to families
		for(const [name, familyConfig] of Object.entries(this.familyConfigs)) {
			for(const product of familyConfig.products) {
				console.debug(`Registering product '${product}' for family '${name}'...`);
				this.families[name].addProduct(this.productConfigs[product]);
			}
		}
	}

	protected registerMinUnits(): void {
		console.debug("Registering min units...");

		for(const [serviceName, service] of Object.entries(this.services)) {
			for(const [name, minUnit] of Object.entries(this.minUnits)) {
				console.debug(`Registering min unit '${name}' for service '${serviceName}'...`);
				service.registerMinimumUnitsCollection(minUnit);
			}
		}
	}

	protected registerPriceProviders(): void {
		console.debug("Registering price providers...");

		for(const [serviceName, service] of Object.entries(this.services)) {
			for(const [name, priceProvider] of Object.entries(this.priceProviders)) {
				console.debug(`Registering price provider '${name}' for service '${serviceName}'...`);
				service.registerPriceProvider(priceProvider);
			}
		}
	}

	protected registerQuantityLists(): void {
		console.debug("Registering quantity lists...");

		for(const [serviceName, service] of Object.entries(this.services)) {
			for(const [name, quantityProvider] of Object.entries(this.quantityProviders)) {
				console.debug(`Registering quantity provider '${name}' for service '${serviceName}'...`);
				service.registerQuantityListCollection(quantityProvider);
			}
		}
	}

	protected registerCollections(): void {
		console.debug( "Registering collections..." );
		const collectionValues: Record<CollectionType, any> = { 
			[CollectionType.Constraint]: this.constraints, 
			[CollectionType.Filter]: this.filters,
			[CollectionType.Asset]: this.assets,
		};

		for ( const config of Object.values( this.collectionConfigs ) ) {
			for ( const value of config.values ) {
				console.log( `Adding ${config.type} for '${value}' attribute to collection '${config.name}'...` );
				this.collections[ config.name ].add( collectionValues[ config.type ][value]  );
			}
		}

		for ( const [ serviceName, serviceConfig ] of Object.entries( this.serviceConfigs ) ) {
			for (const [type, collectionNames] of Object.entries(serviceConfig.collections)) {
				for ( const collectionName of collectionNames ) {
					console.debug( `Registering collection '${collectionName}' of type '${type}' for service '${serviceName}'...` );
					this.services[ serviceName ].registerCollection( this.collections[ collectionName ] );
				}
			}
		}
	}

	protected readConfigs<T extends NamedConfig>(folder: string): Record<string, T> {
		const configs: Record<string, T> = {};
	
		for(const configPath of readFolder(folder)) {
			const config = readYaml<T>(folder + "/" + configPath);
			const configName = extractFileName(configPath);
	
			// Check if config name matches file name
			if(config.name !== configName){
				throw new Error(`Config name '${config.name}' does not match file name '${configName}'`);
			}
	
			// Check for duplicate config names
			if(configs[configName]){
				throw new Error(`Config with name '${configName}' already exists`);
			}
	
			configs[configName] = config;
		}
	
		return configs;
	}
	
	protected instantiateFromConfig<T, V>(configs: Record<string, T>, constructor: (config: T) => V): Record<string, V> {
		const instances: Record<string, any> = {};
	
		for(const [name, config] of Object.entries(configs)) {
			instances[name] = constructor(config);
		}
	
		return instances;
	}

	public getServices(): Record<string, ProductService> {
		return this.services;
	}
}

export const services = new ServiceLoader().getServices();