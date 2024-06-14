import { Attributes } from "$/product/attribute/Attributes";

export interface ConditionTestableInterface {
	test(data: Attributes): boolean;

	toArray(): any[];

	fromArray(data: any[]): void;
}
