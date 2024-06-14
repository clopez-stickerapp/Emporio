import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class EffectLayerFileNameDataAttribute extends ProductAttr {
    public static readonly ALIAS = "effect_layer_file_name";

    public constructor() {
        super( ProductAttrValueType.STRING, true, true );
    }
}
