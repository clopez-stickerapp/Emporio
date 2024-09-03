import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const ImperialUnitsAttribute = new ProductAttr({
	name: "imperial_units",
	type: ProductAttrValueType.BOOL,
	values: [false, true],
});