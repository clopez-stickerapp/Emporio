import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ConditionConfig } from "./ConditionConfig";

export interface ConditionBuilderConfig{
	relationMode: ConditionRelations;
	conditions: ConditionConfig[];
	baseComplexityScore: number;
};
