import { ConditionTestDataKeyNotFoundException } from "../../../Helper/Condition/Exception/ConditionTestDataKeyNotFoundException";
import { ProductConditionBuilder } from "../Product/Condition/ProductConditionBuilder";
import { ProductItem } from "../Product/Item/ProductItem";

/**
 * Contains a list of quantities in the form of an array
 * of integers. A maximum minimum quantity needs to be
 * set to decide if the list has the appropriate quantities
 * to be shown in the price list.
 */
export class QuantityList {
	protected name: string;
	protected minQuantity: number;
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

		if (Math.min(...this.quantities) < minQuantity) {
			throw new Error("Min quantity can't be lower than the lowest quantity in the list");
		}

		this.minQuantity = minQuantity;
		return this;
	}

	public getQuantities(): number[] {
		return this.quantities;
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