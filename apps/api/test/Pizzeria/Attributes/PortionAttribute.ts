import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const PortionValues = {
	SMALL: 1,
	MEDIUM: 2,
	LARGE: 3,
	XLARGE: 4
};

export const PortionAttribute = new ProductAttr( {
	name: "portion",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [
		PortionValues.SMALL,
		PortionValues.MEDIUM,
		PortionValues.LARGE,
		PortionValues.XLARGE
	]
} );