import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class EffectLayerFileAppIdAttribute extends ProductAttr {
    public static readonly ALIAS = "effect_layer_upload_fileapp_id";

    public constructor() {
        super( ProductAttrValueType.STRING, true, true );
    }
}
