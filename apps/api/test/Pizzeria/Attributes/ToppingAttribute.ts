import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const ToppingValues = {
	CHEESE: "cheese",
	MUSHROOM: "mushroom",
	HAM: "ham",
	ONION: "onion",
	GARLIC: "garlic",
	WALNUT: "walnut",
	PINEAPPLE: "pineapple"
};

export const ToppingAttribute = new ProductAttr( {
	name: "topping",
	type: ProductAttrValueType.STRING,
	multivalue: true,
	values: [
		ToppingValues.CHEESE,
		ToppingValues.MUSHROOM,
		ToppingValues.HAM,
		ToppingValues.ONION,
		ToppingValues.GARLIC,
		ToppingValues.WALNUT,
		ToppingValues.PINEAPPLE
	]
} );