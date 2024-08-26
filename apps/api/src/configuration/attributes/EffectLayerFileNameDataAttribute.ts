import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const EffectLayerFileNameDataAttribute = new ProductAttr({
	name: "effect_layer_file_name",
	type: ProductAttrValueType.STRING,
	multivalue: true,
	dynamicvalue: true,
});