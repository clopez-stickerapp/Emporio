import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const CrustValues = {
	THIN: "thin",
	THICK: "thick",
	STUFFED: "stuffed"
};

export const CrustAttribute = new ProductAttr( {
	name: "crust",
	type: ProductAttrValueType.STRING,
	values: [ 
		CrustValues.THIN,
		CrustValues.THICK,
		CrustValues.STUFFED
	]
} );