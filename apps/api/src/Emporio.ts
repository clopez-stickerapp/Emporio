import { Static, Type } from "@sinclair/typebox";
import { getCurrency } from "./Commerce/Core/Localization/Locale";
import { FormattedPrice, Price, excludeVATFromPrice, toMajorUnits } from "./Commerce/Core/Price/Price";
import { ProductItem } from "./Commerce/Core/Product/Item/ProductItem";
import { ProductService } from "./Commerce/Core/ProductService";
import { StickerAppProductService } from "./Commerce/Product/StickerAppProductService";
import { getVatPercentage } from "./Commerce/Tax/Vat";
import { ProductItemBuilder } from "./Commerce/Core/Product/Helper/ProductItemBuilder";
import { ProductItemValidator } from "./Commerce/Core/Product/Helper/ProductItemValidator";
import { ProductionHelper } from "./Commerce/Core/Product/Helper/ProductionHelper";
import { FeatureHelper } from "./Commerce/Core/Product/Helper/FeatureHelper";
import { ProductAttrComputerExtended } from "./Commerce/Core/Product/Helper/ProductAttrComputerExtended";
import { ProductAttrMap, TProductAttrMap } from "./Commerce/Core/Product/Helper/ProductAttrMap";
import { SizeHelper } from "./Commerce/Core/Product/Helper/SizeHelper";
import { AttributeValueSingle } from "./Helper/Condition/AttributeValue";
import { FixedQuantityHelper } from "./Commerce/Core/Product/Helper/FixedQuantityHelper";
import { ProductFamily } from "./Commerce/Core/Product/ProductFamily";
import { ProductAttr } from "./Commerce/Core/Product/Attribute/ProductAttr";
import { ProductItemConditionablesMap } from "./Commerce/Core/Product/Helper/ProductItemConditionablesMap";
import { ProductItemConditionableParam } from "./Commerce/Core/Product/Condition/ProductItemConditionableParam";
import { StickerAppProductLegacySKUService } from "./Commerce/Product/SKU/StickerAppProductLegacySKUService";
import { CustomStickerFamily } from "./Commerce/Product/Family/CustomStickerFamily";

export const PriceDTO = Type.Object({
	price: Price,
	unitPrice: Type.Number(),
	quantity: Type.Number(),
});
export type PriceDTO = Static<typeof PriceDTO>;

export const PriceList = Type.Array(PriceDTO);
export type PriceList = Static<typeof PriceList>;

export const FormattedPriceStep = Type.Object({
	price: FormattedPrice,
	unitPrice: Type.Number(),
	quantity: Type.Number(),
});
export type FormattedPriceStep = Static<typeof FormattedPriceStep>;

export const FormattedPriceList = Type.Array(FormattedPriceStep);
export type FormattedPriceList = Static<typeof FormattedPriceList>;

export class Emporio {
	protected productService: ProductService;
	protected builder: ProductItemBuilder;
	protected validator: ProductItemValidator;
	protected computer: ProductAttrComputerExtended;
	protected stickerAppLegacySKU: StickerAppProductLegacySKUService;

	public constructor(service: ProductService = new StickerAppProductService()) {
		this.productService = service;
		this.builder = new ProductItemBuilder( service );
		this.validator = new ProductItemValidator( service );
		this.computer = new ProductAttrComputerExtended( service );
		this.stickerAppLegacySKU = new StickerAppProductLegacySKUService();
	}

	public calculateUnits(productItem: ProductItem): number {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		return productFamily.calculateUnits(productItem);
	}

	public async calculatePriceByUnits(productItem: ProductItem, units: number, lang: string, incVAT: boolean): Promise<Price> {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		const currency = getCurrency(lang);

		const minUnits = productFamily.getMinimumUnits(productItem);

		if(units < minUnits && productItem.getProductName() !== CustomStickerFamily.PRODUCT_LIBRARY_DESIGN) {
			units = minUnits;
		}

		let price = await productFamily.getProductPriceProvider()?.calculatePrice(productItem, units, currency);

		if (!price) {
			throw new Error("Price provider not found for product family: " + productItem.getProductFamilyName());
		}

		if (!incVAT) {
			const vat = getVatPercentage(lang);
			price = excludeVATFromPrice(price, vat);
		}

		price = toMajorUnits(price);

		return price;
	}


	public async calculatePrice(productItem: ProductItem, quantity: number, lang: string, incVAT: boolean): Promise<PriceDTO> {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		
		let units = (productFamily.calculateUnits(productItem) / (productItem.getAttribute<number>("quantity") ?? 1)) * quantity;
		let price = await this.calculatePriceByUnits(productItem, units, lang, incVAT);

		let unitPrice = price.total / quantity;
		unitPrice = parseFloat(unitPrice.toFixed(8));

		return {
			price,
			unitPrice,
			quantity,
		};
	}

	public async getPriceList(productItem: ProductItem, lang: string, inclVat: boolean): Promise<PriceList> {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		const minQuantity = productFamily.getMinimumQuantity(productItem) ?? 1;
		const steps = productFamily.getProductQuantityListCollection()?.getQuantityStepsFor(productItem, minQuantity) ?? [];

		const prices = await Promise.all(steps.map(async step => {
			return await this.calculatePrice(productItem, step, lang, inclVat);
		}));

		return prices;
	}

	public getMinimumQuantity( productItem: ProductItem ): number {
		const productFamily = this.productService.retrieveProductFamily( productItem.getProductFamilyName() );
		return productFamily.getMinimumQuantity( productItem );
	}

	public createItem( productFamilyName: string, productName: string, useFilters: boolean ): ProductItem {
		return this.builder.createItem( productFamilyName, productName, useFilters );
	}

	public getAttributeMap( productFamilyName: string, productName: string ): TProductAttrMap {
		const product = this.productService.findProduct( productFamilyName, productName );
		return ( new ProductAttrMap( this.productService, product ) ).getMap();
	}

	public getConditionableMap( productFamilyName: string ): Record<string, ProductItemConditionableParam> {
		const productFamily = this.productService.retrieveProductFamily( productFamilyName );
		const conditionableMap = new ProductItemConditionablesMap( this.productService, productFamily );
		return conditionableMap.map;
	}

	public validate( productItem: ProductItem, allowUnsupportedAttributeAliases: boolean, allowUnsuggestedAttributeValues: boolean, checkAgainstFilteredValues: boolean ): void {
		return this.validator.validate( productItem, allowUnsupportedAttributeAliases, allowUnsuggestedAttributeValues, checkAgainstFilteredValues );
	}

	public setProductionSettingsOnItem( productItem: ProductItem, useFilters: boolean ): ProductItem {
		this.computer.prepare( productItem, useFilters );
		const productionHelper = new ProductionHelper( this.productService, this.computer, productItem, new FeatureHelper( this.computer, productItem ) );
		productionHelper.setSettingsAutomatically();
		return productItem;
	}

	public unsetProductionSettingsOnItem( productItem: ProductItem, useFilters: boolean ): ProductItem {
		this.computer.prepare( productItem, useFilters );
		const productionHelper = new ProductionHelper( this.productService, this.computer, productItem, new FeatureHelper( this.computer, productItem ) );
		productionHelper.unsetSettingsAutomatically();
		return productItem;
	}

	public getSizeDetails( productItem: ProductItem, useFilters: boolean ) {
		this.computer.prepare( productItem, useFilters );
		const sizeHelper = new SizeHelper( this.computer, productItem );
		sizeHelper.evaluate();

		return {
			fixedSize:        sizeHelper.fixedSize,
			imperialUnits:    sizeHelper.isImperialUnits(),
			abbreviation:     sizeHelper.meassureDisplayAbbr,
			options:          sizeHelper.getSizeOptions(),
			maxSizeOtherSide: sizeHelper.maxSizeOtherSide.toObject(),
			minSize:          sizeHelper.minSize.toObject(),
			maxSize:          sizeHelper.maxSize.toObject(),
			maxWidth:         sizeHelper.maxWidth.toObject(),
			maxHeight:        sizeHelper.maxHeight.toObject(),
			width:            sizeHelper.width.toObject(),
			height:           sizeHelper.height.toObject()
		}
	}

	public isAttributeAvailable( productItem: ProductItem, attributeName: string, attributeValue: AttributeValueSingle, useFilters: boolean ): boolean {
		this.computer.prepare( productItem, useFilters );
		const attributeValueParsed = this.computer.parseAttributeValue( attributeName, attributeValue ) ?? attributeValue;
		return this.computer.isAvailable( attributeName, attributeValueParsed );
	}

	public isAttributeRequired( productFamilyName: string, productName: string, attributeName: string ): boolean {
		const family = this.productService.retrieveProductFamily( productFamilyName );

		if ( family.isRequired( attributeName ) ) {
			return true;
		} else if ( family.isSupported( attributeName ) ) {
			const product = this.productService.findProduct( productFamilyName, productName );
			return product.isAttrStrictlyRequiredFor( attributeName );
		}

		return false;
	}

	public getFixedQuantityEvaluated( productItem: ProductItem, useFilters: boolean ): boolean {
		this.computer.prepare( productItem, useFilters );
		const fixedQuantityHelper = new FixedQuantityHelper( this.computer, productItem );
		fixedQuantityHelper.evaluate();
		return fixedQuantityHelper.fixedQuantity;
	}

	public getFamilies(): ProductFamily[] {
		return this.productService.getProductFamilies();
	}

	public getFamily( name: string ): ProductFamily {
		return this.productService.retrieveProductFamily( name );
	}

	public getAttributes(): ProductAttr[] {
		return this.productService.getAttributes();
	}

	public getAttribute( name: string ): ProductAttr {
		return this.productService.retrieveAttribute( name );
	}

	public getStickerAppLegacySKU( item: ProductItem ): number {
		return this.stickerAppLegacySKU.getSKU( item );
	} 
}