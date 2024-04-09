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
	public productService: ProductService;
	protected builder: ProductItemBuilder;
	protected validator: ProductItemValidator;
	protected computer: ProductAttrComputerExtended;

	public constructor(service: ProductService = new StickerAppProductService()) {
		this.productService = service;
		this.builder = new ProductItemBuilder( service );
		this.validator = new ProductItemValidator( service );
		this.computer = new ProductAttrComputerExtended( service );
	}

	public calculateUnits(productItem: ProductItem): number {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		return productFamily.calculateUnits(productItem);
	}

	public calculatePriceByUnits(productItem: ProductItem, units: number, lang: string, incVAT: boolean): Price {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		const currency = getCurrency(lang);

		const minUnits = productFamily.getMinimumUnits(productItem);

		if(units < minUnits) {
			units = minUnits;
		}		

		let price = productFamily.getProductPriceProvider()?.calculatePrice(productItem, units, currency) ?? { total: 0, currency: currency };

		if (!incVAT) {
			const vat = getVatPercentage(lang);
			price = excludeVATFromPrice(price, vat);
		}

		price = toMajorUnits(price);

		return price;
	}


	public calculatePrice(productItem: ProductItem, quantity: number, lang: string, incVAT: boolean): PriceDTO {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		
		let units = (productFamily.calculateUnits(productItem) / (productItem.getAttribute<number>("quantity") ?? 1)) * quantity;
		let price = this.calculatePriceByUnits(productItem, units, lang, incVAT);

		let unitPrice = price.total / quantity;
		unitPrice = parseFloat(unitPrice.toFixed(8));

		return {
			price,
			unitPrice,
			quantity,
		};
	}

	public getPriceList(productItem: ProductItem, lang: string, inclVat: boolean): PriceList {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		const minQuantity = productFamily.getMinimumQuantity(productItem) ?? 1;
		const steps = productFamily.getProductQuantityListCollection()?.getQuantityStepsFor(productItem, minQuantity) ?? [];

		const prices = steps.map(step => {
			return this.calculatePrice(productItem, step, lang, inclVat);
		});

		return prices;
	}

	public createItem( productFamilyName: string, productName: string, useFilters: boolean ): ProductItem {
		return this.builder.createItem( productFamilyName, productName, useFilters );
	}

	public getAttributeMap( productFamilyName: string, productName: string ): TProductAttrMap {
		const product = this.productService.findProduct( productFamilyName, productName );
		return ( new ProductAttrMap( this.productService, product ) ).getMap();
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

	public getFixedQuantityEvaluated( productItem: ProductItem, useFilters: boolean ): boolean {
		this.computer.prepare( productItem, useFilters );
		const fixedQuantityHelper = new FixedQuantityHelper( this.computer, productItem );
		fixedQuantityHelper.evaluate();
		return fixedQuantityHelper.fixedQuantity;
	}
}