import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionValue } from "$/conditions/ConditionValue";

export interface ConditionConfig{
	attribute: string;
	operator: ConditionOperators;
	value?: ConditionValue;
};
