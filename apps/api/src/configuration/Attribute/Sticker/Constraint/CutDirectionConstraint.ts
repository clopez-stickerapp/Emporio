import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { CutDirectionAttribute } from "../CutDirectionAttribute";
import { MaxSizeOtherSideAttribute } from "../MaxSizeOtherSideAttribute";

export class CutDirectionConstraint extends ProductAttrConstraint {
	public constructor() {
		super( CutDirectionAttribute.ALIAS );

		this.createConditionsFor( CutDirectionAttribute.AUTO )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createConditionsFor( CutDirectionAttribute.TOP_FIRST, ConditionRelations.OR )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeOtherSideAttribute.MAX_SIZE_OTHER_SIDE_ROLL )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createConditionsFor( CutDirectionAttribute.BOTTOM_FIRST, ConditionRelations.OR )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeOtherSideAttribute.MAX_SIZE_OTHER_SIDE_ROLL )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createConditionsFor( CutDirectionAttribute.LEFT_FIRST, ConditionRelations.OR )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeOtherSideAttribute.MAX_SIZE_OTHER_SIDE_ROLL )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createConditionsFor( CutDirectionAttribute.RIGHT_FIRST, ConditionRelations.OR )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeOtherSideAttribute.MAX_SIZE_OTHER_SIDE_ROLL )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );
	}
}
