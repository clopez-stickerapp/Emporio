import { fetchGiftcardData } from "$/Atlas";
import { convertToMinorUnits, Currencies } from "$/currency/Currency";
import { ProductServiceException } from "$/product/exceptions/ProductServiceException";
import { Price } from "$/prices/Price";
import { ProductPriceProvider } from "$/prices/ProductPriceProvider";
import { FigureAttribute } from "../attributes/FigureAttribute";
import { PromoProductFamily } from "../Family/PromoProductFamily";
import { ProductItem } from "@stickerapp-org/nomisma";

export class PromoProductPriceProvider extends ProductPriceProvider {
	public static readonly NAME = "promo_price_provider";

	private stickerPackPrices: Record<string, Record<string, number>> = {
		[PromoProductFamily.PRODUCT_SAMPLE_STICKER_PACK]: {
			USD: 200,
			SEK: 1900,
			DKK: 1900,
			GBP: 200,
			NOK: 1900,
			EUR: 200,
			JPY: 250,
			PLN: 800
		},
		[PromoProductFamily.PRODUCT_MONSTER_PACK]: {
			USD: 1500,
			SEK: 13900,
			DKK: 9900,
			GBP: 1300,
			NOK: 13900,
			EUR: 1300,
			JPY: 1700,
			PLN: 6000
		},
		[PromoProductFamily.PRODUCT_CREEPY_HEAD_PACK]: {
			USD: 1900,
			SEK: 21000,
			DKK: 15000,
			GBP: 2100,
			NOK: 21000,
			EUR: 2100,
			JPY: 2600,
			PLN: 9500
		},
		[PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2021]: {
			USD: 1900,
			SEK: 21000,
			DKK: 15000,
			GBP: 2100,
			NOK: 21000,
			EUR: 2100,
			JPY: 2600,
			PLN: 9500
		},
		[PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2022]: {
			USD: 1900,
			SEK: 21000,
			DKK: 15000,
			GBP: 2100,
			NOK: 21000,
			EUR: 2100,
			JPY: 2600,
			PLN: 9500
		},
		[PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2023]: {
			USD: 1900,
			SEK: 21000,
			DKK: 15000,
			GBP: 2100,
			NOK: 21000,
			EUR: 2100,
			JPY: 2600,
			PLN: 9500
		},
		[PromoProductFamily.PRODUCT_SLAP_PACK]: {
			USD: 1500,
			SEK: 15000,
			DKK: 15000,
			GBP: 1500,
			NOK: 15000,
			EUR: 1500,
			JPY: 1500,
			PLN: 6400
		}
	};

	private stickerFreebiePrices: Record<string, number> = {
		SEK: 15000,
		USD: 1500,
		EUR: 1500,
		NOK: 15000,
		DKK: 15000,
		GBP: 1500,
		JPY: 1500,
		PLN: 6400
	};

	public constructor() {
		super(PromoProductPriceProvider.NAME);
	}

	public async calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Promise<Price>{
		let price: number | null = null;

		if (productItem.getProductName() in this.stickerPackPrices) {
			price = this.getStickerPackPrice(productItem.getProductName(), currency);
		} else {
			switch (productItem.getProductName()) {
				case PromoProductFamily.PRODUCT_UV_LAMP:
					price = 0;
					break;

				case PromoProductFamily.PRODUCT_STICKER_FREEBIE:
					price = this.stickerFreebiePrices[currency];
					break;

				case PromoProductFamily.PRODUCT_GIFTCARD:
					const giftcardId = productItem.getAttribute(FigureAttribute.getName()) as number;

					const [giftcardSetPrice, giftcardHasDiscount, giftcardDiscount] = await fetchGiftcardData(giftcardId);

					let giftcardPrice = giftcardSetPrice;

					if (giftcardHasDiscount) {
						giftcardPrice = giftcardSetPrice - giftcardDiscount;
					}

					// The giftcard price is in major units, we need to convert it to minor units
					// since it will be converted back to major units in the end
					giftcardPrice = convertToMinorUnits(giftcardPrice, currency)

					price = giftcardPrice;
					break;

				default:
					break;
			}
		}

		if (price === null) {
			throw new ProductServiceException(`No price set for ${JSON.stringify(productItem)}`);
		}

		return {
			total: price * units,
			currency: currency
		};
	}

	private getStickerPackPrice(productName: string, currency: Currencies): number {
		if (!this.stickerPackPrices[productName]) {
			throw new ProductServiceException(`No price set for sticker pack ${productName}`);
		}

		return this.stickerPackPrices[productName][currency];
	}
}