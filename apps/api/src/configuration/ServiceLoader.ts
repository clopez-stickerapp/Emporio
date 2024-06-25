import { readFolder, readYaml, removeExtension } from "$/helpers/FileSystem";
import { ProductFamily } from "$/product/ProductFamily";
import { ProductService } from "$/product/ProductService";
import { NamedConfig } from "$data/NamedConfig";
import { AttributeConfig } from "./interface/AttributeConfig";
import { FamilyConfig } from "./interface/FamilyConfig";
import { ProductConfig } from "./interface/ProductConfig";
import { ServiceConfig } from "./interface/ServiceConfig";
import { ProductAttr } from "$/product/attribute/ProductAttr";

const servicePathFolder = "config/services";
const familyConfigFolder = "config/families";
const productConfigFolder = "config/products";
const attributeConfigFolder = "config/attributes";

class ServiceLoader {
	protected serviceConfigs: Record<string, ServiceConfig> = {};
	protected services: Record<string, ProductService> = {};
	protected familyConfigs: Record<string, FamilyConfig> = {};
	protected families: Record<string, ProductFamily> = {};
	protected productConfigs: Record<string, ProductConfig> = {};
	protected attributeConfigs: Record<string, AttributeConfig> = {};
	protected attributes: Record<string, ProductAttr> = {};

	public constructor() {
		this.loadConfigs();
		this.loadServices();
		this.registerAttributes();
		this.registerFamilies();
		this.registerProducts();
	}

	protected loadConfigs(): void {
		// Load all service configs
		this.serviceConfigs = this.readConfigs<ServiceConfig>(servicePathFolder);
		// Load all family configs
		this.familyConfigs = this.readConfigs<FamilyConfig>(familyConfigFolder);
		// Load all product configs
		this.productConfigs = this.readConfigs<ProductConfig>(productConfigFolder);
		// Load all attribute configs
		this.attributeConfigs = this.readConfigs<AttributeConfig>(attributeConfigFolder);
	}

	protected loadServices(): void {
		// Instantiate all services
		this.services = this.instantiateFromConfig<ServiceConfig, ProductService>(this.serviceConfigs, (config) => new ProductService(config));

		// Instantiate all families
		this.families = this.instantiateFromConfig<FamilyConfig, ProductFamily>(this.familyConfigs, (config) => new ProductFamily(config));

		// Instantiate all attributes
		this.attributes = this.instantiateFromConfig<AttributeConfig, ProductAttr>(this.attributeConfigs, (config) => new ProductAttr(config))
	}

	protected registerAttributes(): void {
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
				const familyInstance = this.families[family];
				this.services[name].registerProductFamily(family, familyInstance);

				// Require all attributes for all families		
				const familyConfig = this.familyConfigs[family];
				for(const attribute of familyConfig.rules?.attributes?.required?? []) {
					const attributeInstance = service.retrieveAttribute(attribute);
					familyInstance.requireAttr(attribute, attributeInstance);
				}
			}	
		}
	}

	protected registerProducts(): void {
		// Register all products to families
		for(const [name, familyConfig] of Object.entries(this.familyConfigs)) {
			for(const product of familyConfig.products) {
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