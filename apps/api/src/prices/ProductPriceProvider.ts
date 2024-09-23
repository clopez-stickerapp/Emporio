import { Currencies } from "$/currency/Currency";
import { PriceT } from "@stickerapp-org/emporio-api-contract";
import { ProductItem } from "@stickerapp-org/nomisma";

export abstract class ProductPriceProvider {
	public constructor(protected name: string) {}

	public abstract calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Promise<PriceT>;

	public getName(): string {
		return this.name;
	}
}