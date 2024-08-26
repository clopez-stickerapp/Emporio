import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const EffectLayerFileAppIdAttribute = new ProductAttr({
	name: "effect_layer_upload_fileapp_id",
	type: ProductAttrValueType.STRING,
	multivalue: true,
	dynamicvalue: true,
});