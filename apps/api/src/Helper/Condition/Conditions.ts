import { Condition } from "./Condition";
import { ConditionBuilder } from "./ConditionBuilder";

export type Conditions = { [key: string]: Condition|ConditionBuilder };