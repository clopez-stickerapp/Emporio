import { Currencies } from "$/currency/Currency";
import { ProductItem } from "$/product/ProductItem";
import { Price } from "./Price";

export abstract class ProductPriceProvider {
	public constructor(protected name: string) {}

	public abstract calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Promise<Price>;

	public getName(): string {
		return this.name;
	}
}