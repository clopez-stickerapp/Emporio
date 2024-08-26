import { ProductAttrFilterMode } from "@stickerapp-org/nomisma";
import { RuleConfig } from "./RuleConfig";

export interface FilterConfig<T = string[]> extends RuleConfig<T> {
	mode: ProductAttrFilterMode
};