export enum RateType {
	ADDITIVE = "additive",
	MULTIPLICATIVE = "multiplicative"
}

export class Rate {
	protected value: number;
	protected minValue: number;
	protected percentage: boolean;
	protected threshold: number|undefined;
	protected type: string = RateType.ADDITIVE;

	public constructor(value: number, isPercentage: boolean = false, minValue: number = 0) {
		if (!isPercentage && minValue !== 0) {
			throw new Error("Rate cannot have a minimum value when isPercentage is set to false.");
		}

		this.value = value;
		this.minValue = minValue;
		this.percentage = isPercentage;
	}

	// This behaviour might not be as expected
	// might want to change this later
	public getValue(): number {
		if (this.percentage) {
			return this.value / 100;
		} else {
			return this.value;
		}
	}

	public getMinValue(): number {
		return this.minValue;
	}

	public isPercentage(): boolean {
		return this.percentage;
	}

	public getUnitThreshold(): number {
		if(!this.threshold){
			throw new Error("Rate threshold has not been set.");
		}

		return this.threshold;
	}

	public setUnitThreshold(threshold: number): void {
		this.threshold = threshold;
	}

	public getType(): string {
		return this.type;
	}

	public setType(type: string): void {
		this.type = type;
	}
}