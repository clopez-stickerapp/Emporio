import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductQuantityListCollection } from "$/prices/ProductQuantityListCollection";
import { QuantityList } from "$/prices/QuantityList";
import { ProductItem } from "@stickerapp-org/nomisma";
import { beforeEach, describe, expect, test } from "vitest";

let quantityList: QuantityList;

describe("QuantityList", () => {
	// Extend the class to test protected attribute
	class QuantityListExtension extends QuantityList {
		public getMinQuantity(): number {
			return this.minQuantity;
		}
	}

	test("Test getName", () => {
		quantityList = new QuantityList("test", [1, 2, 3]);
		expect(quantityList.getName()).toBe("test");
	});

	test("Test setMinQuantity", () => {
		quantityList = new QuantityListExtension("test", [1, 2, 3]);
		quantityList.setMinQuantity(1);
		expect((quantityList as QuantityListExtension).getMinQuantity()).toBe(1);
	});

	test("Test getQuantities", () => {
		quantityList = new QuantityList("test", [1, 2, 3]);
		expect(quantityList.getQuantities()).toEqual([1, 2, 3]);
	});

	test("Test testOnItem", () => {
		quantityList = new QuantityList("test", [1, 2, 3]);
		quantityList.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "white"});

		const item = new ProductItem("foo", "bar");
		expect(quantityList.testOnItem(item)).toBe(false);

		item.setAttribute("material", "white");
		expect(quantityList.testOnItem(item)).toBe(true);
	});

	test("Test test", () => {
		quantityList = new QuantityList("test", [1, 2, 3]);
		quantityList.setMinQuantity(1);
		expect(quantityList.test(2)).toBe(true);
		expect(quantityList.test(1)).toBe(true);
		expect(quantityList.test(0)).toBe(false);
	});

	test("Test sortByMinQuantity", () => {
		const list1 = new QuantityList("test", [10, 20, 30]).setMinQuantity(3);
		const list2 = new QuantityList("test", [1, 2, 3]).setMinQuantity(1);
		const list3 = new QuantityList("test", [5, 10, 15]).setMinQuantity(2);

		const sorted = QuantityList.sortByMinQuantity([list1, list2, list3]);
		expect(sorted).toEqual([list1, list3, list2]);
	});
});

// Extend the class to test protected methods
class ProductQuantityListCollectionExtension extends ProductQuantityListCollection {
	public getConditionedQuantityLists(): Record<string, QuantityList> {
		return this.conditionedQuantityLists;
	}

	public getQuantityLists(): Record<string, QuantityList> {
		return this.quantityLists;
	}

	public findConditionedQuantityListFor(productItem: ProductItem): QuantityList | null {
		return super.findConditionedQuantityListFor(productItem);
	}

	public findDefaultQuantityListFor(minQuantity: number): QuantityList | null {
		return super.findDefaultQuantityListFor(minQuantity);
	}
}

let collection: ProductQuantityListCollectionExtension;

describe("ProductQuantityListCollection", () => {
	beforeEach(() => {
		collection = new ProductQuantityListCollectionExtension("test");
	});

	test("Test addQuantityList", () => {
		const list = new QuantityList("test", [1, 2, 3]);
		collection.addQuantityList(list);
		expect(collection.getQuantityLists()).toEqual({ test: list });
	});

	test("Test addConditionedQuantityList", () => {
		const list = new QuantityList("test", [1, 2, 3]);
		const result = collection.addConditionedQuantityList(list);
		expect(result).toBe(list);
		expect(collection.getConditionedQuantityLists()).toEqual({ test: list });
	});

	describe("should return the correct amount of steps", () => {
		test("with no list", () => {
			const item = new ProductItem("foo", "bar");
			expect(collection.getQuantityStepsFor(item, 1)).toEqual([1]);
		});

		test("with default list", () => {
			const list = new QuantityList("test", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
			collection.addQuantityList(list);

			const item = new ProductItem("foo", "bar");
			expect(collection.getQuantityStepsFor(item, 3)).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11]);
			expect(collection.getQuantityStepsFor(item, 4)).toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12]);
		});

		test("with conditioned list", () => {
			const list = new QuantityList("test", [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
			collection.addConditionedQuantityList(list);

			const item = new ProductItem("foo", "bar");
			// Min quantity is ignored for conditioned lists
			expect(collection.getQuantityStepsFor(item, 3)).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11]);
			expect(collection.getQuantityStepsFor(item, 4)).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11]);
		});
	});

	describe("Test findConditionedQuantityListFor", () => {
		test("with no list", () => {
			const item = new ProductItem("foo", "bar");
			expect(collection.findConditionedQuantityListFor(item)).toBe(null);
		});

		test("with no matching list", () => {
			const list = new QuantityList("test", [1, 2, 3]);
			list.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "white"});
			collection.addConditionedQuantityList(list);

			const item = new ProductItem("foo", "bar");
			expect(collection.findConditionedQuantityListFor(item)).toBe(null);
		});

		test("with matching list", () => {
			const list = new QuantityList("test", [1, 2, 3]);
			list.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "white"});
			collection.addConditionedQuantityList(list);

			const item = new ProductItem("foo", "bar");
			item.setAttribute("material", "white");
			expect(collection.findConditionedQuantityListFor(item)).toBe(list);
		});

		test("with multiple lists with one match", () => {
			const list1 = new QuantityList("test1", [1, 2, 3]);
			list1.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "white"});
			collection.addConditionedQuantityList(list1);

			const list2 = new QuantityList("test2", [1, 2, 3]);
			list2.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "black"});
			collection.addConditionedQuantityList(list2);

			const item = new ProductItem("foo", "bar");
			item.setAttribute("material", "white");
			expect(collection.findConditionedQuantityListFor(item)).toBe(list1);
		});

		// It should match the first list that was added that tests positive
		test("with multiple lists with two matches", () => {
			const list0 = new QuantityList("test0", [1, 2, 3]);
			list0.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "black"});
			collection.addConditionedQuantityList(list0);

			const list1 = new QuantityList("test1", [1, 2, 3]);
			list1.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "white"});
			collection.addConditionedQuantityList(list1);

			const list2 = new QuantityList("test2", [1, 2, 3]);
			list2.conditions.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.EQUAL, value: "glossy"});
			collection.addConditionedQuantityList(list2);

			const item = new ProductItem("foo", "bar");
			item.setAttribute("material", "white");
			item.setAttribute("laminate", "glossy");
			expect(collection.findConditionedQuantityListFor(item)).toBe(list1);
		});
	});

	describe("Test findDefaultQuantityListFor", () => {
		test("with no list", () => {
			expect(collection.findDefaultQuantityListFor(1)).toBe(null);
		});

		test("with no matching list", () => {
			const list = new QuantityList("test", [1, 2, 3]);
			collection.addQuantityList(list);
			expect(collection.findDefaultQuantityListFor(4)).toBe(null);
		});

		test("with matching list", () => {
			const list = new QuantityList("test", [1, 2, 3]);
			list.setMinQuantity(1);
			collection.addQuantityList(list);
			expect(collection.findDefaultQuantityListFor(2)).toBe(list);
		});

		test("with multiple lists with one match", () => {
			const list1 = new QuantityList("test1", [10, 20, 30]);
			list1.setMinQuantity(10);
			collection.addQuantityList(list1);

			const list2 = new QuantityList("test2", [1, 2, 3]);
			list2.setMinQuantity(1);
			collection.addQuantityList(list2);

			expect(collection.findDefaultQuantityListFor(2)).toBe(list2);
		});

		// It should match the first list that was added that tests positive
		test("with multiple lists with two matches", () => {
			const list1 = new QuantityList("test1", [10, 20, 30]);
			list1.setMinQuantity(10);
			collection.addQuantityList(list1);

			const list2 = new QuantityList("test2", [100, 200, 300]);
			list2.setMinQuantity(20);
			collection.addQuantityList(list2);

			const list3 = new QuantityList("test3", [1, 2, 3]);
			list3.setMinQuantity(1);
			collection.addQuantityList(list3);

			expect(collection.findDefaultQuantityListFor(10)).toBe(list1);
		});
	});

	describe("Test getQuantityStepsFor", () => {
		test("with only default lists", () => {
			const list1 = new QuantityList("test1", [10, 20, 30]);
			list1.setMinQuantity(10);
			collection.addQuantityList(list1);

			const list2 = new QuantityList("test2", [1, 2, 3]);
			list2.setMinQuantity(1);
			collection.addQuantityList(list2);

			const list3 = new QuantityList("test3", [100, 200, 300]);
			list3.setMinQuantity(20);
			collection.addQuantityList(list3);

			const item = new ProductItem("foo", "bar");
			expect(collection.getQuantityStepsFor(item, 15)).toEqual([15, 20, 30]);
		});

		test("with only conditioned lists", () => {
			const list1 = new QuantityList("test1", [1, 2, 3]);
			list1.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "black"});
			collection.addConditionedQuantityList(list1);
			
			const list2 = new QuantityList("test2", [10, 20, 30]);
			list2.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "white"});
			collection.addConditionedQuantityList(list2);

			const item = new ProductItem("foo", "bar");
			item.setAttribute("material", "white");
			expect(collection.getQuantityStepsFor(item, 10)).toEqual([10, 20, 30]);
		});

		test("with default and conditioned lists with matching conditioned list", () => {
			const list1 = new QuantityList("test1", [10, 20, 30]);
			list1.setMinQuantity(5);
			collection.addQuantityList(list1);

			const list2 = new QuantityList("test2", [1, 2, 3]);
			list2.setMinQuantity(1);
			collection.addQuantityList(list2);

			const list3 = new QuantityList("test3", [100, 200, 300]);
			list3.setMinQuantity(20);
			collection.addQuantityList(list3);

			const list4 = new QuantityList("test4", [15, 25, 35]);
			list4.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "white"});
			collection.addConditionedQuantityList(list4);

			const list5 = new QuantityList("test5", [1, 2, 3]);
			list5.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "black"});
			collection.addConditionedQuantityList(list5);

			const item = new ProductItem("foo", "bar");
			item.setAttribute("material", "white");
			expect(collection.getQuantityStepsFor(item, 10)).toEqual([15, 25, 35]);
		});

		test("with default and conditioned lists with no matching conditioned list", () => {
			const list1 = new QuantityList("test1", [10, 20, 30]);
			list1.setMinQuantity(5);
			collection.addQuantityList(list1);

			const list2 = new QuantityList("test2", [1, 2, 3]);
			list2.setMinQuantity(1);
			collection.addQuantityList(list2);

			const list3 = new QuantityList("test3", [100, 200, 300]);
			list3.setMinQuantity(20);
			collection.addQuantityList(list3);

			const list4 = new QuantityList("test4", [15, 25, 35]);
			list4.conditions.addCondition({ attribute: "item.attributes.material", operator: ConditionOperators.EQUAL, value: "black"});
			collection.addConditionedQuantityList(list4);

			const item = new ProductItem("foo", "bar");
			item.setAttribute("material", "white");
			expect(collection.getQuantityStepsFor(item, 10)).toEqual([10, 20, 30]);
		});
	});
});
