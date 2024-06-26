import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { CutDirectionAttribute, CutDirectionAttributeValues } from "../attributes/CutDirectionAttribute";
import { MaxSizeOtherSideValues } from "../attributes/MaxSizeOtherSideAttribute";

export class CutDirectionConstraint extends ProductAttrConstraint {
	public constructor() {
		super( CutDirectionAttribute.getName() );

		this.createConditionsFor( CutDirectionAttributeValues.AUTO )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createConditionsFor( CutDirectionAttributeValues.TOP_FIRST, ConditionRelations.OR )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeOtherSideValues.ROLL )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createConditionsFor( CutDirectionAttributeValues.BOTTOM_FIRST, ConditionRelations.OR )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeOtherSideValues.ROLL )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createConditionsFor( CutDirectionAttributeValues.LEFT_FIRST, ConditionRelations.OR )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeOtherSideValues.ROLL )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createConditionsFor( CutDirectionAttributeValues.RIGHT_FIRST, ConditionRelations.OR )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeOtherSideValues.ROLL )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );
	}
}
