import { Condition } from "./Condition";
import { ConditionRelations } from "./ConditionRelations";
import { ConditionTestableInterface } from "./ConditionTestableInterface";
import { ConditionValue } from "./ConditionValue";
import { ConditionSubGroupAlreadyExistsException } from "./Exception/ConditionSubGroupAlreadyExistsException";
import { ConditionSubGroupNotFoundException } from "./Exception/ConditionSubGroupNotFoundException";
import { ConditionTestDataKeyNotFoundException } from "./Exception/ConditionTestDataKeyNotFoundException";

export class ConditionBuilder implements ConditionTestableInterface {
	public relationMode: string;
	protected conditions: Map<string, Condition|ConditionBuilder> = new Map();
	protected baseComplexityScore: number = 0;

	public constructor(relationMode: string = ConditionRelations.AND) {
		this.relationMode = relationMode;
	}

	toArray(): any[] {
		throw new Error("Method not implemented.");
	}
	fromArray(data: any[]): void {
		throw new Error("Method not implemented.");
	}

	public calculateComplexityScore(): number {
		let score = this.baseComplexityScore;

		if (this.relationMode == ConditionRelations.AND && this.conditions.size > 0) {
			score += 5;
		}

		for (const condition of this.conditions.values()) {
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
		return this.conditions.size;
	}

	public addSubGroup(mode: string = ConditionRelations.AND, alias: string|null = null): ConditionBuilder {
		if (!alias) {
			alias = `subgroup_${this.count()}`;
		}

		if (this.conditions.has(alias)) {
			throw new ConditionSubGroupAlreadyExistsException(`Sub group already exists with alias: ${alias}`);
		}

		const subGroup = new ConditionBuilder(mode);
		this.conditions.set(alias, subGroup);

		return subGroup;
	}

	/**
	 * @throws ConditionSubGroupNotFoundException
	 */
	public getSubGroup(alias: string): ConditionBuilder {
		if (!this.conditions.has(alias)) {
			throw new ConditionSubGroupNotFoundException(`Sub group doesn't exists with alias: ${alias}`);
		}

		const subGroup = this.conditions.get(alias)!;

		if (!(subGroup instanceof ConditionBuilder)) {
			throw new Error(`${alias} is not a subgroup!`);	//this wasn't there before
		}

		return subGroup;
	}

	public removeSubGroup(alias: string): void {
		this.conditions.delete(alias);
	}

	public addCondition(columnName: string, operator: string, conditionValue: ConditionValue = null): ConditionBuilder {
		const condition = new Condition(columnName, operator, conditionValue);

		if (!this.hasCondition(condition)) {
			this.conditions.set(`${condition}`, condition);
		}

		return this;
	}

	public hasCondition(condition: Condition): boolean {
		return this.conditions.has(`${condition}`);
	}

	public test(data: Map<string,any>): boolean {
		let exception;

		for (const condition of this.conditions.values()) {
			let result = null;
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

		if (this.relationMode == ConditionRelations.OR && this.conditions.size > 0) {
			return false;
		}
		return true;
	}

	// /**
	//  * @return Condition[]|ConditionBuilder[]
	//  */
	// public function getConditions(): array {
	// 	return $this -> conditions;
	// }

	// public function toArray(): array {
	// 	$conditions = [];
	// 	foreach($this -> conditions as $condition)
	// 	{
	// 		$conditions[] = $condition -> toArray();
	// 	}

	// 	return [
	// 		"conditions"   => $conditions,
	// 		"relationMode" => $this -> relationMode,
	// 		"score"        => $this -> baseComplexityScore
	// 	];
	// }

	// public function fromArray(array $data): void {
	// 	$this -> relationMode = $data['relationMode'];
	// 	$this -> setBaseComplexityScore($data['score']);
	// 	$this -> conditions =[];
	// 	foreach($data['conditions'] as $condition)
	// 	{
	// 		if (array_key_exists("conditions", $condition)) {
	// 			$group = $this -> addSubGroup($condition['relationMode']);
	// 			$group -> fromArray($condition);
	// 		}
	// 		else {
	// 			$this -> addCondition($condition['columnName'], $condition['operator'], $condition['conditionValue']);
	// 		}
	// 	}
	// }

	// public function __toString() {
	// 	$string = "";
	// 	$relation = "&&";
	// 	if ($this -> relationMode == ConditionRelations::OR )
	// 	{
	// 		$relation = "||";
	// 	}

	// 	$i = 0;
	// 	foreach($this -> conditions as $key => $condition)
	// 	{
	// 		$conditionAsString = "$condition";
	// 		if ($condition instanceof ConditionBuilder) {
	// 			$conditionAsString = "($conditionAsString)";
	// 		}
	// 		if ($i > 0) {
	// 			$conditionAsString = " $relation $conditionAsString";
	// 		}

	// 		$string.= $conditionAsString;

	// 		$i++;
	// 	}

	// 	return $string;
	// }

	// public function getBaseComplexityScore(): int {
	// 	return $this -> baseComplexityScore;
	// }

	public setBaseComplexityScore(baseComplexityScore: number): ConditionBuilder {
		this.baseComplexityScore = baseComplexityScore;
		return this;
	}
}
