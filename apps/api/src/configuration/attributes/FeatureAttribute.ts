import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const ProductFeatures = {
	BACKPAPER_PRINT: "backpaper_print",
	HANGTAGGING: "hangtagging",
	TRANSFER_TAPE: "transfer_tape",
	EFFECT_LAYER: "effect_layer",
	VARIABLE_DATA: "variable_data",
	MANUAL_BACKSCORE: "manual_backscore",
	PACK_SET_AMOUNT: "pack_set_amount",
	PERFORATION: "perforation",
};

export const ProductFeaturesOOS: string[] = [];

export const FeatureAttribute = new ProductAttr({
	name: "feature",
	type: ProductAttrValueType.STRING,
	multivalue: true,
	values: Object.values( ProductFeatures ),
});