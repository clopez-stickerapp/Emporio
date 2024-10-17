import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const OpacityLayerValues = {
	NONE: "none",
	MASK: "mask",
};

export const OpacityLayerAttribute = new ProductAttr({
	name: "opacity_layer",
	type: ProductAttrValueType.STRING,
	values: Object.values( OpacityLayerValues ),
});