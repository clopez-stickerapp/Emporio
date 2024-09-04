import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const WhiteLayerValues = {
	ALPHA: "alpha",
	MANUALLY: "manually",
};

export const WhiteLayerAttribute = new ProductAttr({
	name: "white_layer",
	type: ProductAttrValueType.STRING,
	values: Object.values( WhiteLayerValues ),
});