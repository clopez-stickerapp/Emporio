import { getCurrency } from './localization/Locale';
import { excludeVATFromPrice, toMajorUnits } from './prices/Price';
import { ProductItemConditionableParam } from './product/condition/ProductItemConditionableParam';
import { FixedQuantityHelper } from './product/helpers/FixedQuantityHelper';
import { ProductItemBuilder } from './product/helpers/ProductItemBuilder';
import { ProductItemConditionablesMap } from './product/helpers/ProductItemConditionablesMap';
import { ProductItemValidator } from './product/helpers/ProductItemValidator';
import { ProductionHelper } from './product/helpers/ProductionHelper';
import { ProductService } from './product/ProductService';
import { getVatPercentage } from './tax/Vat';
import { StickerAppProductLegacySKUService } from './configuration/StickerAppProductLegacySKUService';
import { ProductNames } from '$data/ConditionValueResolver';
import { ProductAttrAsset } from './product/attribute/Asset/ProductAttrAsset';
import { CollectionType } from './configuration/interface/CollectionConfig';
import { ProductAttrComputer, SizeHelper, ProductItem, AttributeValueSingle } from '@stickerapp-org/nomisma';
import { ProductServiceException } from './product/exceptions/ProductServiceException';
import { throwIfError } from '$app/utils';
import { PriceDTO, PriceListT, PriceT } from '@stickerapp-org/emporio-api-contract';
import { toArray } from '../Util';

export class Emporio {
	protected productService: ProductService;
	protected builder: ProductItemBuilder;
	protected validator: ProductItemValidator;
	protected computer: ProductAttrComputer;
	protected stickerAppLegacySKU: StickerAppProductLegacySKUService;

	public constructor(service: ProductService) {
		this.productService = service;
		this.builder = new ProductItemBuilder();
		this.validator = new ProductItemValidator(service);
		this.computer = new ProductAttrComputer();
		this.stickerAppLegacySKU = new StickerAppProductLegacySKUService();
	}

	public calculateUnits(productItem: ProductItem): number {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		return productFamily.calculateUnits(productItem);
	}

	public async calculatePriceByUnits(productItem: ProductItem, units: number, lang: string, incVAT: boolean): Promise<PriceT> {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		const currency = throwIfError(() => getCurrency(lang), ProductServiceException);

		const minUnits = this.productService.retrieveMinimumUnitsCollection(productFamily.getMinimumUnitsCollectionName()).getValue(productItem);

		if (units < minUnits && productItem.getProductName() !== ProductNames.PRODUCT_LIBRARY_DESIGN) {
			units = minUnits;
		}

		let price = await this.productService.retrievePriceProvider(productFamily.getPriceProviderName()).calculatePrice(productItem, units, currency);

		if (!incVAT) {
			const vat = throwIfError(() => getVatPercentage(lang), ProductServiceException);
			price = excludeVATFromPrice(price, vat);
		}

		price = toMajorUnits(price);

		return price;
	}

	public async calculatePrice(productItem: ProductItem, quantity: number, lang: string, incVAT: boolean): Promise<PriceDTO> {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());

		let units = (productFamily.calculateUnits(productItem) / (productItem.getAttribute<number>('quantity') ?? 1)) * quantity;
		let price = await this.calculatePriceByUnits(productItem, units, lang, incVAT);

		let unitPrice = price.total / quantity;
		unitPrice = parseFloat(unitPrice.toFixed(8));

		return {
			price,
			unitPrice,
			quantity,
		};
	}

	public async getPriceList(productItem: ProductItem, lang: string, inclVat: boolean): Promise<PriceListT> {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		const minQuantity = this.getMinimumQuantity(productItem) ?? 1;
		const steps =
			this.productService.retrieveQuantityListCollection(productFamily.getQuantityCollectionName()).getQuantityStepsFor(productItem, minQuantity) ??
			[];

		const prices = await Promise.all(
			steps.map(async (step: number) => {
				return await this.calculatePrice(productItem, step, lang, inclVat);
			}),
		);

		return prices;
	}

	public getMinimumQuantity(productItem: ProductItem): number {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		const minUnitsCollection = this.productService.retrieveMinimumUnitsCollection(productFamily.getMinimumUnitsCollectionName());
		const units = productFamily.calculateUnits(productItem);
		const quantity = productItem.getAttribute<number>('quantity') ?? 1;

		return Math.ceil(minUnitsCollection.getValue(productItem) / (units / quantity));
	}

	public createItem(productFamilyName: string, productName: string, useFilters: boolean): ProductItem {
		const productFamily = this.productService.retrieveProductFamily(productFamilyName);
		const product = productFamily.getProduct(productName);
		const map = this.productService.getProductMap(productFamilyName, productName);

		return this.builder.createItem(productFamily, product, map, useFilters);
	}

	public getConditionableMap(productFamilyName: string): Record<string, ProductItemConditionableParam> {
		const productFamily = this.productService.retrieveProductFamily(productFamilyName);
		const conditionableMap = new ProductItemConditionablesMap(productFamily);
		return conditionableMap.map;
	}

	public validate(
		productItem: ProductItem,
		allowUnsupportedAttributeAliases: boolean,
		allowUnsuggestedAttributeValues: boolean,
		checkAgainstFilteredValues: boolean,
	): void {
		return this.validator.validate(productItem, allowUnsupportedAttributeAliases, allowUnsuggestedAttributeValues, checkAgainstFilteredValues);
	}

	public setProductionSettingsOnItem(productItem: ProductItem, useFilters: boolean): ProductItem {
		const map = this.productService.getProductMap(productItem.getProductFamilyName(), productItem.getProductName());
		this.computer.evaluate(productItem, map, useFilters);
		const productionHelper = new ProductionHelper(this.productService, this.computer, productItem);
		productionHelper.setSettingsAutomatically();
		return productItem;
	}

	public unsetProductionSettingsOnItem(productItem: ProductItem, useFilters: boolean): ProductItem {
		const map = this.productService.getProductMap(productItem.getProductFamilyName(), productItem.getProductName());
		this.computer.evaluate(productItem, map, useFilters);
		const productionHelper = new ProductionHelper(this.productService, this.computer, productItem);
		productionHelper.unsetSettingsAutomatically();
		return productItem;
	}

	public getSizeDetails(productItem: ProductItem, useFilters: boolean) {
		const map = this.productService.getProductMap(productItem.getProductFamilyName(), productItem.getProductName());
		this.computer.evaluate(productItem, map, useFilters);
		const sizeHelper = new SizeHelper(this.computer, productItem);
		sizeHelper.evaluate();

		return {
			fixedSize: sizeHelper.fixedSize,
			imperialUnits: sizeHelper.isImperialUnits(),
			abbreviation: sizeHelper.meassureDisplayAbbr,
			options: sizeHelper.getSizeOptions(),
			maxSizeOtherSide: sizeHelper.maxSizeOtherSide.toObject(),
			minSize: sizeHelper.minSize.toObject(),
			maxSize: sizeHelper.maxSize.toObject(),
			width: sizeHelper.width.toObject(),
			height: sizeHelper.height.toObject(),
		};
	}

	public isAttributeAvailable(productItem: ProductItem, attributeName: string, attributeValue: AttributeValueSingle, useFilters: boolean): boolean {
		const map = this.productService.getProductMap(productItem.getProductFamilyName(), productItem.getProductName());
		this.computer.evaluate(productItem, map, useFilters);
		const attributeValueParsed = this.computer.parseAttribute<AttributeValueSingle>(attributeName, attributeValue) ?? attributeValue;
		return this.computer.isAvailable(attributeName, attributeValueParsed);
	}

	public isAttributeRequired(productFamilyName: string, productName: string, attributeName: string): boolean {
		const family = this.productService.retrieveProductFamily(productFamilyName);

		if (family.attributes.get(attributeName)?.required) {
			return true;
		} else if (family.attributes.has(attributeName)) {
			const product = this.productService.retrieveProductFamily(productFamilyName).getProduct(productName);
			return product.attributes.has(attributeName);
		}

		return false;
	}

	public getFixedQuantityEvaluated(productItem: ProductItem, useFilters: boolean): boolean {
		const map = this.productService.getProductMap(productItem.getProductFamilyName(), productItem.getProductName());
		this.computer.evaluate(productItem, map, useFilters);
		const fixedQuantityHelper = new FixedQuantityHelper(this.computer, productItem);
		fixedQuantityHelper.evaluate();
		return fixedQuantityHelper.fixedQuantity;
	}

	public getProductService(): ProductService {
		return this.productService;
	}

	public getStickerAppLegacySKU(item: ProductItem): number {
		return this.stickerAppLegacySKU.getSKU(item);
	}

	public isProductAvailable(productFamilyName: string, productName: string): boolean {
		const productFamily = this.productService.retrieveProductFamily(productFamilyName);
		const product = productFamily.getProduct(productName);

		if (!product.isAvailable()) {
			return false;
		}

		const assetCollection = this.productService.retrieveCollection<ProductAttrAsset>(CollectionType.Asset, productFamily.getAssetCollectionName());

		if (!assetCollection) {
			return true;
		}

		for (const [attrName, attrValue] of Object.entries(product.attributes.getAllValues())) {
			if (attrValue !== undefined) {
				const attrAsset = assetCollection.get(attrName);
				if (attrAsset && toArray(attrValue).some((value) => !attrAsset.isAvailable(value))) {
					return false;
				}
			}
		}

		return true;
	}
}
