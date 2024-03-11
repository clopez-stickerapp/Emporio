import { getCurrency } from "./Commerce/Core/Localization/Locale";
import { Price, excludeVATFromPrice, toMajorUnits } from "./Commerce/Core/Price/Price";
import { ProductItem } from "./Commerce/Core/Product/Item/ProductItem";
import { ProductService } from "./Commerce/Core/ProductService";
import { StickerAppProductService } from "./Commerce/Product/StickerAppProductService";
import { getVatPercentage } from "./Commerce/Tax/Vat";

export class Emporio {
	public productService: ProductService;

	public constructor() {
		this.productService = new StickerAppProductService();
	}

	public calculatePrice(productItem: ProductItem, units: number, lang: string, incVAT: boolean): Price {
		let productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		let currency = getCurrency(lang);

		let price = productFamily.getProductPriceProvider()?.calculatePrice(productItem, units, currency) ?? { total: 0, currency: currency };

		if (!incVAT) {
			let vat = getVatPercentage(lang);
			price = excludeVATFromPrice(price, vat);
		}

		price = toMajorUnits(price);

		return price;
	}

	public getPriceList(productItem: ProductItem, lang: string, inclVat: boolean): Price[] {
		let productFamily = this.productService.retrieveProductFamily(productItem.getProductFamilyName());
		let minQuantity = productFamily.getMinimumQuantity(productItem) ?? 1;
		let steps = productFamily.getProductQuantityListCollection()?.getQuantityStepsFor(productItem, minQuantity) ?? [];

		let units = productItem.getUnits() / (productItem.getAttribute<number>("quantity") ?? 1);

		steps = steps.map(step => {
			return step * units;
		});

		let prices = steps.map(step => {
			return this.calculatePrice(productItem, step, lang, inclVat);
		});

		return prices;
	}
}