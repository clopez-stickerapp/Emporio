import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class EffectLayerFileAppIdAttribute extends ProductAttr {
    public static readonly ALIAS = "effect_layer_upload_fileapp_id";

    public constructor() {
        super( ProductAttrValueType.STRING, true, true );
    }
}
