import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const PortionValues = {
	MINI: 1,
	NORMAL: 2,
	BIG: 3,
	FAMILY: 4
};

export const PortionAttribute = new ProductAttr( {
	name: "portion",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
	values: [
		PortionValues.MINI,
		PortionValues.NORMAL,
		PortionValues.BIG,
		PortionValues.FAMILY
	]
} );