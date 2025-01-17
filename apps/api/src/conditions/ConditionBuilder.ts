import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { ConditionConfig } from "$/configuration/interface/ConditionConfig";
import { Attributes } from "@stickerapp-org/nomisma";
import { Condition } from "./Condition";
import { ConditionRelations } from "./ConditionRelations";
import { ConditionValue } from "./ConditionValue";
import { Conditions } from "./Conditions";
import { ConditionTestDataKeyNotFoundException } from "./exceptions/ConditionTestDataKeyNotFoundException";

export class ConditionBuilder {
	public relationMode: string;
	protected conditions: Conditions = [];
	protected baseComplexityScore: number = 0;

	public constructor(config: ConditionBuilderConfig = {}, resolve: (value: ConditionValue|null) => ConditionValue|null = (v) => v){
		this.relationMode = config.relationMode ?? ConditionRelations.AND;
		this.baseComplexityScore = config.baseComplexityScore ?? 0;		

		for (const condition of config.conditions ?? []) {
			if( "operator" in condition ){
				this.addCondition( condition, resolve );
			} else {
				this.addSubGroup( condition, resolve );
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

	public addSubGroup(config: ConditionBuilderConfig = {}, resolve: (value: ConditionValue|null) => ConditionValue|null = (v) => v): ConditionBuilder {
		const subGroup = new ConditionBuilder(config, resolve);
		this.conditions.push(subGroup);
		return subGroup;
	}

	public addCondition(condition: ConditionConfig, resolve: (value: ConditionValue|null) => ConditionValue|null = (v) => v): ConditionBuilder {
		this.conditions.push(new Condition(condition, resolve));
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
}
