import { ProductItem } from "@stickerapp-org/nomisma";

export abstract class UnitType {
	public abstract calculateUnits(productItem: ProductItem): number;
}