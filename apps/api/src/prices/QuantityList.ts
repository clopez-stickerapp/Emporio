import { ConditionTestDataKeyNotFoundException } from "$/conditions/exceptions/ConditionTestDataKeyNotFoundException";
import { ProductConditionBuilder } from "$/product/condition/ProductConditionBuilder";
import { ProductItem } from "@stickerapp-org/nomisma";

/**
 * Contains a list of quantities in the form of an array
 * of integers. A maximum minimum quantity needs to be
 * set to decide if the list has the appropriate quantities
 * to be shown in the price list.
 */
export class QuantityList {
	protected name: string;
	protected minQuantity: number = Number.MAX_SAFE_INTEGER;
	protected quantities: number[];
	public conditions: ProductConditionBuilder;

	public constructor(name: string, quantities: number[]) {
		this.name = name;
		this.quantities = quantities;
		this.conditions = new ProductConditionBuilder();
	}

	public getName(): string {
		return this.name;
	}

	public setMinQuantity(minQuantity: number): QuantityList {
		if (minQuantity > Math.max(...this.quantities)) {
			throw new Error("Min quantity can't be higher than the highest quantity in the list");
		}

		if (minQuantity <= 0) {
			throw new Error("Min quantity can't be (lower than) zero");
		}

		this.minQuantity = minQuantity;
		return this;
	}

	public getQuantities(): number[] {
		return [...this.quantities];
	}

	public testOnItem(productItem: ProductItem): boolean {
		try {
			return this.conditions.testOnItem(productItem);
		} catch (error) {
			if (error instanceof ConditionTestDataKeyNotFoundException) {
				return false;
			}
			throw error;
		}
	}

	public test(minQuantity: number): boolean {
		return minQuantity >= this.minQuantity;
	}

	public static sortByMinQuantity(quantityLists: QuantityList[]): QuantityList[] {
		return quantityLists.sort((a, b) => b.minQuantity - a.minQuantity);
	}
}