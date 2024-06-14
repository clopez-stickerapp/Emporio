import { ProductItem } from "$/product/ProductItem";
import { QuantityList } from "./QuantityList";

export class ProductQuantityListCollection {
	protected collectionName: string;
	protected quantityLists: Record<string, QuantityList> = {};

	/**
	 * OBS!! These lists are iterated over, and it returns the
	 * first list that tests positive. So add them in order of
	 * importance: most important first.
	 */
	protected conditionedQuantityLists: Record<string, QuantityList> = {};

	public constructor(name: string) {
		this.collectionName = name;
	}

	public addQuantityList(quantityList: QuantityList): void {
		if (this.quantityLists[quantityList.getName()]) {
			throw new Error("Cannot add quantity list. Quantity list '" + quantityList.getName() + "' already exists.");
		}

		this.quantityLists[quantityList.getName()] = quantityList;
	}

	public addConditionedQuantityList(quantityList: QuantityList): QuantityList {
		if (this.conditionedQuantityLists[quantityList.getName()]) {
			throw new Error("Cannot add conditioned quantity list. Quantity list '" + quantityList.getName() + "' already exists.");
		}

		this.conditionedQuantityLists[quantityList.getName()] = quantityList;
		return quantityList;
	}

	public getQuantityStepsFor(productItem: ProductItem, minQuantity: number = 1): number[] {
		// // Check if a conditioned list matches
		let quantityList = this.findConditionedQuantityListFor(productItem);

		if (quantityList) {
			return quantityList.getQuantities().slice(0, 9);
		}

		// If no conditioned list matched, use default ones
		quantityList = this.findDefaultQuantityListFor(minQuantity);
		let steps: number[]|undefined;

		if (quantityList) {
			steps = quantityList.getQuantities();

			// Add the minimum quantity as step if it's not present
			if (!steps.includes(minQuantity)) {
				steps.push(minQuantity);
			}
		}

		// If no default one matched, set to last list
		if(!steps){
			steps = Object.values(this.quantityLists).pop()?.getQuantities() ?? [];
		}

		steps = steps.sort((a: number, b: number) => a - b);

		let i = 0;
		for (let step of steps) {
			if (step >= minQuantity) {
				return steps.slice(i, i + 9);
			}
			i++;
		}

		return [minQuantity];
	}

	protected findConditionedQuantityListFor(productItem: ProductItem): QuantityList | null {
		for (let list of Object.values(this.conditionedQuantityLists)) {
			if (list.testOnItem(productItem)) {
				return list;
			}
		}

		return null;
	}

	protected findDefaultQuantityListFor(minQuantity: number): QuantityList | null {
		// If no conditioned list matched, use default ones
		let sortedLists = QuantityList.sortByMinQuantity(Object.values(this.quantityLists));
		for (let list of sortedLists) {
			if (list.test(minQuantity)) {
				return list;
			}
		}

		return null;
	}

	public getCollectionName(): string {
		return this.collectionName;
	}
}
