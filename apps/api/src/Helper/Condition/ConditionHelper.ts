import { ConditionOperators } from "./ConditionOperators";

export class ConditionHelper {
	static allowedOperators: string[] = [
		ConditionOperators.EQUAL,
		ConditionOperators.IDENTICAL,
		ConditionOperators.NOT_EQUAL,
		ConditionOperators.NOT_IDENTICAL,
		ConditionOperators.LESS_THAN,
		ConditionOperators.GREATER_THAN,
		ConditionOperators.LESS_THAN_OR_EQUAL,
		ConditionOperators.GREATER_THAN_OR_EQUAL,
		ConditionOperators.IN,
		ConditionOperators.NOT_IN,
		ConditionOperators.IS_EMPTY,
		ConditionOperators.IS_NOT_EMPTY,
	];

	static isOperatorAllowed(operator: string): boolean {
		return ConditionHelper.allowedOperators.includes(operator);
	}
}