import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const SauceBaseValues = {
	TOMATO: "tomato",
	CREME_FRAICHE: "creme_fraiche"
};

export const SauceBaseAttribute = new ProductAttr( {
	name: "sauce_base",
	type: ProductAttrValueType.STRING,
	values: [
		SauceBaseValues.TOMATO,
		SauceBaseValues.CREME_FRAICHE
	]
} );