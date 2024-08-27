import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";
import { MaterialValues } from "./MaterialAttribute";

export const ProductFeatures = {
	HANGTAGGING: "hangtagging",
	BACKPAPER_PRINT: "backpaper_print",
	EFFECT_LAYER: "effect_layer",
	TRANSFER_TAPE: "transfer_tape",
	VARIABLE_DATA: "variable_data",
	MANUAL_BACKSCORE: "manual_backscore",
	PACK_SET_AMOUNT: "pack_set_amount",
	PERFORATION: "perforation",
};

export const EffectLayerMaterials = [
	MaterialValues.PRISMATIC,
	MaterialValues.BRUSHED_ALLOY,
	MaterialValues.GLITTER,
	MaterialValues.MIRROR,
	MaterialValues.SILVER_THIN,
	MaterialValues.HOLOGRAPHIC,
	MaterialValues.KRAFT_PAPER,
	MaterialValues.KRAFT_THIN,
	MaterialValues.REFLECTIVE,
	MaterialValues.PIXIE_DUST,
	MaterialValues.GITD,
	MaterialValues.CLEAR,
	MaterialValues.CLEAR_THIN,
	MaterialValues.CLEAR_BACKSCORE,
]

export const FeatureAttribute = new ProductAttr({
	name: "feature",
	type: ProductAttrValueType.STRING,
	multivalue: true,
	values: Object.values( ProductFeatures ),
});