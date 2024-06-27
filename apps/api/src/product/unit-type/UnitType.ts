import { ProductItem } from "../ProductItem";

export abstract class UnitType {
	public abstract calculateUnits(productItem: ProductItem): number;
}