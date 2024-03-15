import { Static, Type } from "@sinclair/typebox";
import { getCurrency } from "./Commerce/Core/Localization/Locale";
import { FormattedPrice, Price, excludeVATFromPrice, toMajorUnits } from "./Commerce/Core/Price/Price";
import { ProductItem } from "./Commerce/Core/Product/Item/ProductItem";
import { ProductService } from "./Commerce/Core/ProductService";
import { StickerAppProductService } from "./Commerce/Product/StickerAppProductService";
import { getVatPercentage } from "./Commerce/Tax/Vat";

export const PriceStep = Type.Object({
	price: Price,
	unitPrice: Type.Number(),
	quantity: Type.Number(),
});
export type PriceStep = Static<typeof PriceStep>;

export const PriceList = Type.Array(PriceStep);
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

	public constructor(service: ProductService = new StickerAppProductService()) {
		this.productService = service;
	}

	public calculateUnits(productItem: ProductItem): number {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		return productFamily.calculateUnits(productItem);
	}

	public calculatePrice(productItem: ProductItem, units: number, lang: string, incVAT: boolean): Price {
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

	public getPriceList(productItem: ProductItem, lang: string, inclVat: boolean): PriceList {
		const productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		const minQuantity = productFamily.getMinimumQuantity(productItem) ?? 1;
		const steps = productFamily.getProductQuantityListCollection()?.getQuantityStepsFor(productItem, minQuantity) ?? [];

		const units = productItem.getUnits() / (productItem.getAttribute<number>("quantity") ?? 1);

		const prices = steps.map(step => {
			let price = this.calculatePrice(productItem, step * units, lang, inclVat);

			return {
				price,
				unitPrice: price.total / step,
				quantity: step
			}
		});

		return prices;
	}
}