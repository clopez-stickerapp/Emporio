import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const InkValues = {
	PINK_INK: "pink_ink",
	INVISIBLE_INK: "invisible_ink"
};

export const InkAttribute = new ProductAttr({
	name: "ink",
	type: ProductAttrValueType.STRING,
	values: [InkValues.PINK_INK, InkValues.INVISIBLE_INK],
});