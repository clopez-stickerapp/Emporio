import { ProductItem } from "../Product/Item/ProductItem";
import { Currencies } from "../Currency/Currency";
import { Price } from "./Price";

export abstract class ProductPriceProvider {
	public constructor(protected name: string) {}

	public abstract calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Promise<Price>;

	public getName(): string {
		return this.name;
	}
}