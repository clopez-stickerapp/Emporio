import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class EffectLayerFileNameDataAttribute extends ProductAttr {
    public static readonly ALIAS = "effect_layer_file_name";

    public constructor() {
        super( ProductAttrValueType.STRING, true, true );
    }
}
