import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const ImperialUnitsAttribute = new ProductAttr({
	name: "imperial_units",
	type: ProductAttrValueType.BOOL,
	values: [false, true],
});