import { NamedConfig } from "$data/NamedConfig";
import { ConditionBuilderConfig } from "./ConditionBuilderConfig";
import { ConditionConfig } from "./ConditionConfig";

export interface RuleConfig extends NamedConfig{
	rules: { 
		keys: string[];
		conditions: (ConditionConfig|ConditionBuilderConfig)[];
	}[];
};
