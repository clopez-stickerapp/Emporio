import { beforeEach, describe, expect, test } from "vitest";
import { QuantityList } from "../src/Commerce/Core/Price/QuantityList";
import { ProductItem } from "../src/Commerce/Core/Product/Item/ProductItem";
import { ConditionOperators } from "../src/Helper/Condition/ConditionOperators";

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
		quantityList.conditions.addCondition("item.attributes.material", ConditionOperators.EQUAL, "white");

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
		const list1 = new QuantityList("test", [1, 2, 3]).setMinQuantity(3);
		const list2 = new QuantityList("test", [1, 2, 3]).setMinQuantity(1);
		const list3 = new QuantityList("test", [1, 2, 3]).setMinQuantity(2);

		const sorted = QuantityList.sortByMinQuantity([list1, list2, list3]);
		expect(sorted).toEqual([list2, list3, list1]);
	});
});