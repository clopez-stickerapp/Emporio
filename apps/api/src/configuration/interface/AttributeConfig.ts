import { ProductAttrValueType, AttributeValueSingle } from "@stickerapp-org/nomisma";
import { NamedConfig } from "../../data/NamedConfig";

export interface AttributeConfig extends NamedConfig{
	type: ProductAttrValueType;
	multivalue?: boolean;
	dynamicvalue?: boolean;
	values?: AttributeValueSingle[];
}