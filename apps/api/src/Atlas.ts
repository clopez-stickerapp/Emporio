import { ProductServiceException } from "./product/exceptions/ProductServiceException";

const baseUrl = process.env.ATLAS_API_URL || 'http://api.testing.stickerapp.com';

/**
 * Fetches the gift card data for a given gift card ID.
 * 
 * @param giftcardId - The ID of the gift card.
 * @returns An array containing the gift card price, whether it has a discount, and the discount amount.
 * @throws Error if unable to fetch the data.
 */
export async function fetchGiftcardData(giftcardId: number): Promise<[number, boolean, number]> {
	try {
		const response = await fetch(`${baseUrl}/giftcards/data/${giftcardId}`);
		const data = await response.json();
		return [data.giftcardSetPrice, data.giftcardHasDiscount, data.giftcardDiscount];
	} catch (error) {
		throw new ProductServiceException("Emporio can't connect to Atlas to fetch gift card data for gift card ID: " + giftcardId);
	}
}
