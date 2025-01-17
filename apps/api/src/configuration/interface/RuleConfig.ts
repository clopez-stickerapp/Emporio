import { NamedConfig } from "$data/NamedConfig";
import { ConditionBuilderConfig } from "./ConditionBuilderConfig";

export interface RuleConfig<T = string[]> extends NamedConfig{
	rules: { 
		name?: string;
		keys: T;
		conditions: ConditionBuilderConfig;
	}[];
};
