import { ConditionValue } from "$/conditions/ConditionValue";

export class ProductItemConditionableParam {
	public columnName: string;
	public label: string;
	public canValueBeDynamic: boolean;
	public isMultiValue: boolean;
	public expectedValueType: string;
	public values: ConditionValue[];

	public constructor(columnName: string, label: string, canValueBeDynamic: boolean, isMultiValue: boolean, expectedValueType: string, values: ConditionValue[] = []) {
		this.label = label;
		this.columnName = columnName;
		this.canValueBeDynamic = canValueBeDynamic;
		this.isMultiValue = isMultiValue;
		this.expectedValueType = expectedValueType;
		this.values = values;
	}

	public jsonSerialize() {
		return {
			columnName: this.columnName,
			label: this.label,
			canValueBeDynamic: this.canValueBeDynamic,
			isMultiValue: this.isMultiValue,
			expectedValueType: this.expectedValueType,
			values: this.values
		};
	}
}