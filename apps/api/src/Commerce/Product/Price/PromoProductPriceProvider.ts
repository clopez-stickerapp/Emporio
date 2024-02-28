import { fetchGiftcardData } from "../../../Atlas";
import { Currencies } from "../../Core/Currency/Currency";
import { ProductServiceException } from "../../Core/Exception/ProductServiceException";
import { Price } from "../../Core/Price/Price";
import { ProductPriceProvider } from "../../Core/Price/ProductPriceProvider";
import { ProductItem } from "../../Core/Product/Item/ProductItem";
import { FigureAttribute } from "../Attribute/FigureAttribute";
import { SheetTypeAttribute } from "../Attribute/Sticker/SheetTypeAttribute";
import { PromoProductFamily } from "../Family/PromoProductFamily";

export class PromoProductPriceProvider extends ProductPriceProvider {
	public static readonly NAME = "promo_price_provider";

	private stickerPackPrices: Record<string, Record<string, number>> = {
		[PromoProductFamily.PRODUCT_SAMPLE_STICKER_PACK]: {
			USD: 2,
			SEK: 19,
			DKK: 19,
			GBP: 2,
			NOK: 19,
			EUR: 2,
			JPY: 250,
			PLN: 8
		},
		[PromoProductFamily.PRODUCT_MONSTER_PACK]: {
			USD: 15,
			SEK: 139,
			DKK: 99,
			GBP: 13,
			NOK: 139,
			EUR: 13,
			JPY: 1700,
			PLN: 60
		},
		[PromoProductFamily.PRODUCT_CREEPY_HEAD_PACK]: {
			USD: 19,
			SEK: 210,
			DKK: 150,
			GBP: 21,
			NOK: 210,
			EUR: 21,
			JPY: 2600,
			PLN: 95
		},
		[PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2021]: {
			USD: 19,
			SEK: 210,
			DKK: 150,
			GBP: 21,
			NOK: 210,
			EUR: 21,
			JPY: 2600,
			PLN: 95
		},
		[PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2022]: {
			USD: 19,
			SEK: 210,
			DKK: 150,
			GBP: 21,
			NOK: 210,
			EUR: 21,
			JPY: 2600,
			PLN: 95
		},
		[PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2023]: {
			USD: 19,
			SEK: 210,
			DKK: 150,
			GBP: 21,
			NOK: 210,
			EUR: 21,
			JPY: 2600,
			PLN: 95
		},
		[PromoProductFamily.PRODUCT_SLAP_PACK]: {
			USD: 15,
			SEK: 150,
			DKK: 150,
			GBP: 15,
			NOK: 150,
			EUR: 15,
			JPY: 1500,
			PLN: 64
		}
	};

	public constructor() {
		super(PromoProductPriceProvider.NAME);
	}

	public calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Price{
		let price: number | null = null;

		if (productItem.getAttribute(SheetTypeAttribute.ALIAS) === SheetTypeAttribute.STICKER_PACK) {
			price = this.getStickerPackPrice(productItem.getProductName(), currency);
		} else {
			switch (productItem.getProductName()) {
				case PromoProductFamily.PRODUCT_UV_LAMP:
					price = 0;
					break;

				case PromoProductFamily.PRODUCT_GIFTCARD:
					const giftcardId = productItem.getAttribute(FigureAttribute.ALIAS) as number;

					const [giftcardSetPrice, giftcardHasDiscount, giftcardDiscount] = fetchGiftcardData(giftcardId);

					let giftcardPrice = giftcardSetPrice;

					if (giftcardHasDiscount) {
						giftcardPrice = giftcardSetPrice - giftcardDiscount;
					}

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
			total: price,
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