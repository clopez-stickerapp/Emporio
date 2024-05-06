const baseUrl = "https://api.danjan.dev.stickerapp.com";

/**
 * Fetches the price margin percentage for a given figure ID.
 * 
 * @param figureId - The ID of the figure.
 * @returns The price margin percentage.
 * @throws Error if unable to fetch the data.
 */
export async function fetchPriceMarginPercentage(figureId: number): Promise<number> {
	try {
		const response = await fetch(`${baseUrl}/figures/priceMarginPercentage/${figureId}/price-margin`);
		const data = await response.json();
		return data.priceMarginPercentage;
	} catch (error) {
		throw new Error("Emporio can't connect to Atlas to fetch price margin percentage for figure ID: " + figureId);
	}
}

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
		throw new Error("Emporio can't connect to Atlas to fetch gift card data for gift card ID: " + giftcardId);
	}
}
