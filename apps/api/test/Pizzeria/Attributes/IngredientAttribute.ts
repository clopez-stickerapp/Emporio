import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const IngredientValues = {
	CHEESE: "cheese",
	MUSHROOM: "mushroom",
	HAM: "ham",
	ONION: "onion",
	GARLIC: "garlic",
	WALNUT: "walnut",
	PINEAPPLE: "pineapple"
};

export const IngredientAttribute = new ProductAttr( {
	name: "ingredient",
	type: ProductAttrValueType.STRING,
	multivalue: true,
	values: [
		IngredientValues.CHEESE,
		IngredientValues.MUSHROOM,
		IngredientValues.HAM,
		IngredientValues.ONION,
		IngredientValues.GARLIC,
		IngredientValues.WALNUT,
		IngredientValues.PINEAPPLE
	]
} );