import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductItem } from "$/product/ProductItem";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";
import { ProductNames } from "$data/ConditionValueResolver";
import { LaminateValues } from "./attributes/LaminateAttribute";
import { MaterialValues } from "./attributes/MaterialAttribute";

export class StickerAppProductLegacySKUService {
	protected skuValue: ProductDynamicValue;

	public constructor() {
		this.skuValue = new ProductDynamicValue({ name: "ProductLegacySKU", defaultValue: 0, rules: [] });

		this.skuValue.addConditionedValue(101)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.HOLOGRAPHIC
			});

		this.skuValue.addConditionedValue(102)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.WHITE
			});

		this.skuValue.addConditionedValue(103)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.WHITE_HI_TACK
			});

		this.skuValue.addConditionedValue(104)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.MIRROR
			});

		this.skuValue.addConditionedValue(105)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.KRAFT_PAPER
			});

		this.skuValue.addConditionedValue(106)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.BRUSHED_ALLOY
			});

		this.skuValue.addConditionedValue(107)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.PRISMATIC
			});

		this.skuValue.addConditionedValue(108)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.CLEAR
			});

		this.skuValue.addConditionedValue(109)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.laminate",
				operator: ConditionOperators.EQUAL,
				value: LaminateValues.SOFT_TOUCH
			});

		this.skuValue.addConditionedValue(110)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.GLITTER
			});

		this.skuValue.addConditionedValue(112)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.laminate",
				operator: ConditionOperators.EQUAL,
				value: LaminateValues.EPOXY
			})
			.setBaseComplexityScore(1000);


		this.skuValue.addConditionedValue(113)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.WHITE_REMOVABLE
			});

		this.skuValue.addConditionedValue(114)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.WHITE_WALL
			});

		this.skuValue.addConditionedValue(115)
			.conditionBuilder
			.addCondition({
				attribute: "item.productName",
				operator: ConditionOperators.EQUAL,
				value: ProductNames.PRODUCT_FLOOR
			});

		this.skuValue.addConditionedValue(116)
			.conditionBuilder
			.addCondition({
				attribute: "item.productName",
				operator: ConditionOperators.EQUAL,
				value: ProductNames.PRODUCT_LABELS_ON_SHEET
			})
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.WHITE
			});

		this.skuValue.addConditionedValue(117)
			.conditionBuilder
			.addCondition({
				attribute: "item.productName",
				operator: ConditionOperators.EQUAL,
				value: ProductNames.PRODUCT_LABELS_ON_SHEET
			})
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.CLEAR
			});

		this.skuValue.addConditionedValue(124)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.GITD
			});

		this.skuValue.addConditionedValue(127)
			.conditionBuilder
			.addCondition({
				attribute: "item.attributes.material",
				operator: ConditionOperators.EQUAL,
				value: MaterialValues.PIXIE_DUST
			});
	}

	public getSKU(productItem: ProductItem): number {
		return this.skuValue.getValue(productItem);
	}
}
