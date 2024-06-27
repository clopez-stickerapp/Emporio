import { RuleConfig } from "./RuleConfig";

export interface MinUnitsConfig extends RuleConfig<number>{
	defaultValue: number;
};
