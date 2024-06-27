import { RuleConfig } from "./RuleConfig";

export interface DynamicValueConfig extends RuleConfig<number>{
	defaultValue: number;
};
