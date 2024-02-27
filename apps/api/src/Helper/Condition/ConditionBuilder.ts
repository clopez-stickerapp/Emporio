import { Attributes } from "./Attributes";
import { Condition } from "./Condition";
import { ConditionOperators } from "./ConditionOperators";
import { ConditionRelations } from "./ConditionRelations";
import { ConditionTestableInterface } from "./ConditionTestableInterface";
import { ConditionValue } from "./ConditionValue";
import { Conditions } from "./Conditions";
import { ConditionSubGroupAlreadyExistsException } from "./Exception/ConditionSubGroupAlreadyExistsException";
import { ConditionSubGroupNotFoundException } from "./Exception/ConditionSubGroupNotFoundException";
import { ConditionTestDataKeyNotFoundException } from "./Exception/ConditionTestDataKeyNotFoundException";

export class ConditionBuilder implements ConditionTestableInterface {
	public relationMode: string;
	protected conditions: Conditions = {};
	protected baseComplexityScore: number = 0;

	public constructor(relationMode: string = ConditionRelations.AND) {
		this.relationMode = relationMode;
	}

	public calculateComplexityScore(): number {
		let score = this.baseComplexityScore;

		if (this.relationMode == ConditionRelations.AND && this.count() >= 2) {
			score += 5;
		}

		for (const condition of Object.values(this.conditions)) {
			if (condition instanceof ConditionBuilder) {
				score += 100;
				score += condition.calculateComplexityScore();
			} else {
				score += 10;
			}
		}

		return score;
	}

	public count(): number {
		return Object.keys(this.conditions).length;
	}

	public addSubGroup(mode: ConditionRelations = ConditionRelations.AND, alias: string|null = null): ConditionBuilder {
		if (!alias) {
			alias = `subgroup_${this.count()}`;
		}

		if (this.conditions[alias] !== undefined) {
			throw new ConditionSubGroupAlreadyExistsException(`Sub group already exists with alias: ${alias}`);
		}

		const subGroup = new ConditionBuilder(mode);
		this.conditions[alias] = subGroup;

		return subGroup;
	}

	/**
	 * @throws ConditionSubGroupNotFoundException
	 */
	public getSubGroup(alias: string): ConditionBuilder {
		if (this.conditions[alias] === undefined) {
			throw new ConditionSubGroupNotFoundException(`Sub group doesn't exists with alias: ${alias}`);
		}

		const subGroup = this.conditions[alias];

		if (!(subGroup instanceof ConditionBuilder)) {
			throw new Error(`${alias} is not a subgroup!`);	//this wasn't there before
		}

		return subGroup;
	}

	public removeSubGroup(alias: string): void {
		delete this.conditions[alias];
	}

	public addCondition(columnName: string, operator: ConditionOperators, conditionValue: ConditionValue|null = null): ConditionBuilder {
		const condition = new Condition(columnName, operator, conditionValue);

		if (!this.hasCondition(condition)) {
			this.conditions[`${condition}`] = condition;
		}

		return this;
	}

	public hasCondition(condition: Condition): boolean {
		return this.conditions[`${condition}`] !== undefined;
	}

	public test(data: Attributes): boolean {
		let exception: ConditionTestDataKeyNotFoundException|undefined;

		for (const condition of Object.values(this.conditions)) {
			let result: boolean|null = null;
			try {
				result = condition.test(data);
			} catch (error: unknown) {
				if (error instanceof ConditionTestDataKeyNotFoundException) {
					exception = error;
				} else {
					throw error;
				}
			}
			if (result !== null) {
				switch (this.relationMode) {
					case ConditionRelations.AND:
						if (result === false) {
							return false;
						}
						break;
					case ConditionRelations.OR:
						if (result === true) {
							return true;
						}
						break;
				}
			}
		}

		if (exception) {
			throw exception;
		}

		if (this.relationMode == ConditionRelations.OR && this.count() > 0) {
			return false;
		}
		return true;
	}

	public getBaseComplexityScore(): number {
		return this.baseComplexityScore;
	}

	public setBaseComplexityScore(baseComplexityScore: number): ConditionBuilder {
		this.baseComplexityScore = baseComplexityScore;
		return this;
	}

	public getConditions(): Conditions {
		return this.conditions;
	}

	public toArray(): any[] {
		throw new Error("Method not implemented.");
	}
	public fromArray(data: any[]): void {
		throw new Error("Method not implemented.");
	}
}
