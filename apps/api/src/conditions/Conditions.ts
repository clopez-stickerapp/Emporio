import { Condition } from "./Condition";
import { ConditionBuilder } from "./ConditionBuilder";

export type Conditions = Record<string, Condition|ConditionBuilder>;