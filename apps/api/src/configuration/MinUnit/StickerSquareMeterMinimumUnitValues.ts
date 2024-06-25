import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";
import { ResellerValues } from "../attributes/ResellerAttribute";
import { LaminateValues } from "../attributes/LaminateAttribute";
import { MaterialValues } from "../attributes/MaterialAttribute";
import { CustomStickerFamily } from "../Family/CustomStickerFamily";

export class StickerSquareMeterMinimumUnitValues extends ProductDynamicValue {
	public constructor() {
		super(0.1407);

		// Special for StickersThatStick
		this.addConditionedValue(0.77)
			.conditionBuilder.setBaseComplexityScore(120).addCondition("item.attributes.reseller", ConditionOperators.IN, [ResellerValues.STICKERSTHATSTICK]);

		this.addConditionedValue(1.8)
			.conditionBuilder.setBaseComplexityScore(120).addCondition("item.attributes.reseller", ConditionOperators.IN, [ResellerValues.STICKIT]);

		this.addConditionedValue(5)
			.conditionBuilder
			.setBaseComplexityScore(120)
			.addCondition("item.attributes.reseller", ConditionOperators.IN, [ResellerValues.STICKERSTHATSTICK, ResellerValues.STICKIT])
			.addCondition("item.attributes.material", ConditionOperators.EQUAL, MaterialValues.WHITE_THIN);

		// Material specifics, for all
		this.addConditionedValue(0.1090)
			.conditionBuilder
			.setBaseComplexityScore(1)
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialValues.HOLOGRAPHIC, MaterialValues.GLITTER, MaterialValues.MIRROR, MaterialValues.PRISMATIC, MaterialValues.PIXIE_DUST]);

		this.addConditionedValue(0.1360)
			.conditionBuilder
			.setBaseComplexityScore(1)
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialValues.WHITE_HI_TACK]);

		this.addConditionedValue(0.1635)
			.conditionBuilder
			.setBaseComplexityScore(1)
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialValues.GITD]);

		this.addConditionedValue(0.1440)
			.conditionBuilder
			.setBaseComplexityScore(1)
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialValues.CLEAR])
			.addCondition("item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_LABELS_ON_SHEET);

		this.addConditionedValue(0.35)
			.conditionBuilder
			.setBaseComplexityScore(1)
			.addCondition("item.attributes.material", ConditionOperators.IN, [MaterialValues.WHITE_WALL]);

		// Laminate specifics
		this.addConditionedValue(0.058)
			.conditionBuilder
			.addCondition("item.attributes.laminate", ConditionOperators.EQUAL, LaminateValues.EPOXY);

		this.addConditionedValue(0.06)
			.conditionBuilder
			.addSubGroup(ConditionRelations.OR)
			.setBaseComplexityScore(10)
			.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET_LEGACY);
	}
}