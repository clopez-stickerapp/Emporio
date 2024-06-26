import { NamedConfig } from "$data/NamedConfig";
import { ConditionBuilderConfig } from "./ConditionBuilderConfig";

export interface RuleConfig extends NamedConfig{
	rules: { 
		keys: string[];
		conditions: ConditionBuilderConfig;
	}[];
};
