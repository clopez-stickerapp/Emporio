import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const CuisineValues = {
	SWEDISH: "swedish",
	NEOPOLITAN: "neopolitan"
};

export const CuisineAttribute = new ProductAttr( {
	name: "cuisine",
	type: ProductAttrValueType.STRING,
	values: [
		CuisineValues.SWEDISH,
		CuisineValues.NEOPOLITAN
	]
} );