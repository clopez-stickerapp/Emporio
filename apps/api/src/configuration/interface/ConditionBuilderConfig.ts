import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ConditionConfig } from "./ConditionConfig";

export interface ConditionBuilderConfig{
	relationMode: ConditionRelations;
	baseComplexityScore?: number;
	conditions: (ConditionConfig|ConditionBuilderConfig)[];
};
