import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const MaxSizeOtherSideValues = {
	ROLL: 275,
	WALL: 1100,
};

export const MaxSizeOtherSideAttribute = new ProductAttr({
	name: "max_size_other_side_mm",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [MaxSizeOtherSideValues.ROLL, MaxSizeOtherSideValues.WALL],
});