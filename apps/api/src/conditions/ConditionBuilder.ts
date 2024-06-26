import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { ConditionConfig } from "$/configuration/interface/ConditionConfig";
import { Attributes } from "$/product/attribute/Attributes";
import { Condition } from "./Condition";
import { ConditionOperators } from "./ConditionOperators";
import { ConditionRelations } from "./ConditionRelations";
import { ConditionTestableInterface } from "./ConditionTestableInterface";
import { ConditionValue } from "./ConditionValue";
import { Conditions } from "./Conditions";
import { ConditionSubGroupAlreadyExistsException } from "./exceptions/ConditionSubGroupAlreadyExistsException";
import { ConditionSubGroupNotFoundException } from "./exceptions/ConditionSubGroupNotFoundException";
import { ConditionTestDataKeyNotFoundException } from "./exceptions/ConditionTestDataKeyNotFoundException";

export class ConditionBuilder implements ConditionTestableInterface {
	public relationMode: string;
	protected conditions: Conditions = {};
	protected baseComplexityScore: number = 0;

	public constructor(config: ConditionBuilderConfig = {conditions: []}) {
		this.relationMode = config.relationMode ?? ConditionRelations.AND;
		this.baseComplexityScore = config.baseComplexityScore ?? 0;		

		for (const condition of config.conditions) {
			// Check if condition is a ConditionBuilderConfig or ConditionConfig
			if ((condition as ConditionBuilderConfig).relationMode !== undefined) {
				this.conditions[`${condition}`] = new ConditionBuilder( condition as ConditionBuilderConfig );
			} else {
				this.conditions[`${condition}`] = new Condition( condition as ConditionConfig );
			}
		}
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
		throw new Error("Adding subGroups this way is no longer supported.");
		// if (!alias) {
		// 	alias = `subgroup_${this.count()}`;
		// }

		// if (this.conditions[alias] !== undefined) {
		// 	throw new ConditionSubGroupAlreadyExistsException(`Sub group already exists with alias: ${alias}`);
		// }

		// const subGroup = new ConditionBuilder(mode);
		// this.conditions[alias] = subGroup;

		// return subGroup;
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
		throw new Error("Adding conditions in this way is no longer supported.");
		// const condition = new Condition(columnName, operator, conditionValue);

		// if (!this.hasCondition(condition)) {
		// 	this.conditions[`${condition}`] = condition;
		// }

		// return this;
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

	public toString(): string {
		const relation = this.relationMode === ConditionRelations.OR ? '||' : '&&';
		return Object.values( this.conditions ).map( condition => {
			return condition instanceof ConditionBuilder ? `(${ condition })` : `${ condition }`;
        } ).join( ` ${ relation } ` );
	}

	public toArray(): any[] {
		throw new Error("Method not implemented.");
	}
	public fromArray(data: any[]): void {
		throw new Error("Method not implemented.");
	}
}
