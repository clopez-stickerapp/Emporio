import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { ConditionConfig } from "$/configuration/interface/ConditionConfig";
import { Attributes } from "$/product/attribute/Attributes";
import { Condition } from "./Condition";
import { ConditionOperators } from "./ConditionOperators";
import { ConditionRelations } from "./ConditionRelations";
import { ConditionTestableInterface } from "./ConditionTestableInterface";
import { ConditionValue } from "./ConditionValue";
import { Conditions } from "./Conditions";
import { ConditionTestDataKeyNotFoundException } from "./exceptions/ConditionTestDataKeyNotFoundException";

export class ConditionBuilder implements ConditionTestableInterface {
	public relationMode: string;
	protected conditions: Conditions = [];
	protected baseComplexityScore: number = 0;

	public constructor(config: ConditionBuilderConfig = {}, resolve: (value: ConditionValue|null) => ConditionValue|null = (v) => v){
		this.relationMode = config.relationMode ?? ConditionRelations.AND;
		this.baseComplexityScore = config.baseComplexityScore ?? 0;		

		for (const condition of config.conditions ?? []) {
			this.conditions.push( "operator" in condition ? new Condition( condition, resolve ) : new ConditionBuilder( condition, resolve ) );
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

	/** @deprecated */
	public addSubGroup(relationMode: ConditionRelations = ConditionRelations.AND): ConditionBuilder {
		const subGroup = new ConditionBuilder({relationMode});
		this.conditions.push(subGroup);
		return subGroup;
	}

	/** @deprecated */
	public addCondition(columnName: string, operator: ConditionOperators, conditionValue: ConditionValue|null = null): ConditionBuilder {
		const condition = new Condition({attribute: columnName, operator, value: conditionValue ?? undefined});
		this.conditions.push(condition);
		return this;
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
