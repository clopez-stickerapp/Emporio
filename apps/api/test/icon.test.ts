import { ProductAttrIcon } from "$/product/attribute/Icon/ProductAttrIcon";
import { ProductAttrIconCollection } from "$/product/attribute/Icon/ProductAttrIconCollection";
import { beforeEach, describe, expect, test } from "vitest";

let icon: ProductAttrIcon;
let collection: ProductAttrIconCollection;

describe("ProductAttrIconCollection", () => {
	beforeEach(() => {
		collection = new ProductAttrIconCollection("foo");
	});

	test("should return the collection name", () => {
		expect(collection.getCollectionName()).toBe("foo");
	});

	test("should return the icons", () => {
		expect(collection.getIcons()).toEqual({});
	});

	test("should add an icon", () => {
		icon = new ProductAttrIcon("foo", "bar", "baz");
		collection.addIcon(icon);
	});

	test("should find an icon", () => {
		icon = new ProductAttrIcon("foo", "bar", "baz");
		collection.addIcon(icon);
		expect(collection.findIconFor("foo", "bar")).toBe("baz");
	});

	test("should return null if no icon is found", () => {
		expect(collection.findIconFor("foo", "bar")).toBe(null);
	});

	test("should throw an error if an icon already exists", () => {
		icon = new ProductAttrIcon("foo", "bar", "baz");
		collection.addIcon(icon);
		expect(() => collection.addIcon(icon)).toThrow("Icon for foo bar already exists.");
	});
});
