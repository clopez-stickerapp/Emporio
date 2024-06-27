import { readFolder, readYaml, removeExtension } from "$/helpers/FileSystem";
import { ProductFamily } from "$/product/ProductFamily";
import { ProductService } from "$/product/ProductService";
import { ProductAttr } from "$/product/attribute/ProductAttr";
import { NamedConfig } from "$data/NamedConfig";
import { allAttributes } from "./attributes/attributes";
import { RuleConfig } from "./interface/RuleConfig";
import { FamilyConfig } from "./interface/FamilyConfig";
import { MinUnitsConfig } from "./interface/MinUnitsConfig";
import { PriceProviderConfig } from "./interface/PriceProviderConfig";
import { ProductConfig } from "./interface/ProductConfig";
import { QuantityProviderConfig } from "./interface/QuantityProviderConfig";
import { ServiceConfig } from "./interface/ServiceConfig";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";

const servicePathFolder = "src/configuration/services";
const familyConfigFolder = "src/configuration/families";
const productConfigFolder = "src/configuration/products";
const constraintPathFolder = "src/configuration/constraints";
const filterPathFolder = "src/configuration/filters";
// const iconPathFolder = "src/configuration/icons";
const minUnitPathFolder = "src/configuration/min-units";
const pricePathFolder = "src/configuration/price-providers";
const quantityPathFolder = "src/configuration/quantity-providers";

class ServiceLoader {
	protected serviceConfigs: Record<string, ServiceConfig> = {};
	protected services: Record<string, ProductService> = {};
	protected familyConfigs: Record<string, FamilyConfig> = {};
	protected families: Record<string, ProductFamily> = {};
	protected productConfigs: Record<string, ProductConfig> = {};
	protected attributes: Record<string, ProductAttr> = {};

	protected constraintConfigs: Record<string, RuleConfig> = {};
	protected constraints: Record<string, ProductAttrConstraint> = {};
	protected filterConfigs: Record<string, RuleConfig> = {};
	protected filters: Record<string, ProductAttrFilter> = {};
	// protected iconConfigs: Record<string, NamedConfig> = {};
	protected minUnitsConfigs: Record<string, MinUnitsConfig> = {};
	protected minUnits: Record<string, ProductDynamicValue> = {};
	protected priceProviderConfigs: Record<string, PriceProviderConfig> = {};
	protected quantityProviderConfigs: Record<string, QuantityProviderConfig> = {};

	public constructor() {
		this.load();
		this.instantiate();
		this.registerAttributes();
		this.registerFamilies();
		this.registerProducts();
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
		this.filterConfigs = this.readConfigs<RuleConfig>(filterPathFolder);

		// Load icons
		// console.debug("Loading icon configs...");
		// this.iconConfigs = this.readConfigs<IconConfig>(iconPathFolder);

		// Load min units
		console.debug("Loading min units configs...");
		this.minUnitsConfigs = this.readConfigs<MinUnitsConfig>(minUnitPathFolder);

		// Load price providers
		// console.debug("Loading price provider configs...");
		// this.priceProviderConfigs = this.readConfigs<PriceProviderConfig>(pricePathFolder);

		// Load quantity providers
		// console.debug("Loading quantity provider configs...");
		// this.quantityProviderConfigs = this.readConfigs<QuantityProviderConfig>(quantityPathFolder);
	}

	protected instantiate(): void {
		console.debug("Instantiating services...");

		// Instantiate all services
		console.debug("Instantiating service instances...");
		this.services = this.instantiateFromConfig<ServiceConfig, ProductService>(this.serviceConfigs, (config) => new ProductService(config));

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
		this.filters = this.instantiateFromConfig<RuleConfig, ProductAttrFilter>(this.filterConfigs, (config) => new ProductAttrFilter(config));

		// console.dir(this.filters["SizeFilter"], { depth: null });

		// Instantiate all min units
		console.debug("Instantiating min units instances...");
		this.minUnits = this.instantiateFromConfig<MinUnitsConfig, ProductDynamicValue>(this.minUnitsConfigs, (config) => new ProductDynamicValue(config));
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
			}	
		}
	}

	protected registerProducts(): void {
		console.debug("Registering products...");

		// Register all products to families
		for(const [name, familyConfig] of Object.entries(this.familyConfigs)) {
			for(const product of familyConfig.products) {
				console.debug(`Registering product '${product}' for family '${name}'...`);
				this.families[name].addProduct(product, this.productConfigs[product].overrides);
			}
		}
	}

	protected readConfigs<T extends NamedConfig>(folder: string): Record<string, T> {
		const configs: Record<string, T> = {};
	
		for(const configPath of readFolder(folder)) {
			const config = readYaml<T>(folder + "/" + configPath);
			const configName = removeExtension(configPath);
	
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