import { Attributes } from "./Attributes";
import { ConditionHelper } from "./ConditionHelper";
import { ConditionOperators } from "./ConditionOperators";
import { ConditionTestableInterface } from "./ConditionTestableInterface";
import { ConditionValue } from "./ConditionValue";
import { ConditionOperatorNotAllowedException } from "./Exception/ConditionOperatorNotAllowedException";
import { ConditionTestDataKeyNotFoundException } from "./Exception/ConditionTestDataKeyNotFoundException";
import { ConditionTestFailedException } from "./Exception/ConditionTestFailedException";

export class Condition implements ConditionTestableInterface {
	public columnName: string;
	public operator: string;
	public conditionValue: ConditionValue|null;

	public constructor(columnName: string, operator: string, conditionValue: ConditionValue|null = null) {
		this.columnName = columnName;
		this.operator = operator;
		this.conditionValue = conditionValue;

		if (!ConditionHelper.isOperatorAllowed(operator)) {
			throw new ConditionOperatorNotAllowedException("Operator is not allowed: $operator");
		}
	}

	/**
	 * @throws ConditionTestFailedException
	 */
	public test(data: Attributes): boolean {
		let result = false;

		if (data[this.columnName] == undefined) {
			if (this.operator != ConditionOperators.IS_EMPTY &&
				this.operator != ConditionOperators.NOT_IN) {
				throw new ConditionTestDataKeyNotFoundException("Couldn't perform test because test data doesn't contain conditioned key: " + this.columnName);
			}
		}

		const columnValue = data[this.columnName] ?? null;

		if (this.operator == ConditionOperators.IS_EMPTY) {
			return columnValue === null || columnValue === undefined || columnValue === "" || (Array.isArray(columnValue) && columnValue.length === 0);

		} else if (this.operator == ConditionOperators.IS_NOT_EMPTY) {
			return columnValue !== null && columnValue !== undefined && columnValue !== "" && (Array.isArray(columnValue) ? columnValue.length > 0 : true);

		} else if (this.operator == ConditionOperators.IN || this.operator == ConditionOperators.NOT_IN) {
			if (Array.isArray(columnValue) && !Array.isArray(this.conditionValue)) {
				result = this.operator == ConditionOperators.NOT_IN ? !columnValue.includes(this.conditionValue!) : columnValue.includes(this.conditionValue!);
			} else if (Array.isArray(this.conditionValue) && !Array.isArray(columnValue)) {
				result = this.operator == ConditionOperators.NOT_IN ? !this.conditionValue.includes(columnValue!.toString()) : this.conditionValue.includes(columnValue!.toString());
			} else if (Array.isArray(columnValue) && Array.isArray(this.conditionValue)) {
				const totals = this.conditionValue.length;
				const diff = this.conditionValue.filter((value) => !columnValue.includes(value));
				const diffCount = diff.length;
				if (this.operator == ConditionOperators.NOT_IN) {
					return totals == diffCount;
				} else if (this.operator == ConditionOperators.IN) {
					return diffCount < totals;
				}
			} else if (typeof columnValue === "string" && typeof this.conditionValue === "string") {
				result = this.operator == ConditionOperators.NOT_IN ? !columnValue.includes(this.conditionValue) : columnValue.includes(this.conditionValue);
			} else if (this.operator == ConditionOperators.NOT_IN && columnValue === null) {
				return true;
			} else if (this.operator == ConditionOperators.IN && columnValue === null) {
				return false;
			} else {
				throw new ConditionTestFailedException("Trying to do CONTAINS in a special case that is not yet supported. $this ({$this->columnName} is " + columnValue + ")");
			}
		}
		else {
			if (ConditionHelper.isOperatorAllowed(this.operator)) {
				let result: any;
				const evalString = `return ${JSON.stringify(columnValue)} ${this.operator} ${JSON.stringify(this.conditionValue)};`;
				try {
					result = Function(evalString)();
				} catch (error) {
					console.error('Error occurred during evaluation:', error);
					return false;
				}
				return result;
			}
			return false;
		}
		return result;
	}

	public toString(): string {
		const valueToString = JSON.stringify(this.conditionValue);

		switch (this.operator) {
			case ConditionOperators.IS_EMPTY:
				return "!\${" + this.columnName + "}";
			case ConditionOperators.IS_NOT_EMPTY:
				return "!!\${" + this.columnName + "}";
			case ConditionOperators.NOT_IN:
				return "this.isNotIn(\${" + this.columnName + "}, " + valueToString + ")";
			case ConditionOperators.IN:
				return "this.isIn(\${" + this.columnName + "}, " + valueToString + ")";
			default:
				return "\${" + this.columnName + "} " + this.operator + " " + valueToString;
		}
	}

	toArray(): any[] {
		throw new Error("Method not implemented.");
	}

	fromArray(data: any[]): void {
		throw new Error("Method not implemented.");
	}
}
