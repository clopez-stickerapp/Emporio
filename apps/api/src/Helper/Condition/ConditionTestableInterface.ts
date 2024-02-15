export interface ConditionTestableInterface {
	test(data: Map<string, any>): boolean;

	toArray(): any[];

	fromArray(data: any[]): void;
}
