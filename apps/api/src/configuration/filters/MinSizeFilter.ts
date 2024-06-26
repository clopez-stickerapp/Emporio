import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { MaterialValues } from "../attributes/MaterialAttribute";
import { MinSizeAttribute, MinSizes } from "../attributes/MinSizeAttribute";
import { ResellerValues } from "../attributes/ResellerAttribute";

export class MinSizeFilter extends ProductAttrFilter {
	public constructor() {
		super( MinSizeAttribute.getName() );

		this.createFilter( [
			MinSizes.DEFAULT
		] );

		this.createFilter( [
			MinSizes.SPECIAL_STS
		] )
			.conditionBuilder
			.addCondition( "item.attributes.reseller", ConditionOperators.EQUAL, ResellerValues.STICKERSTHATSTICK );

		this.createFilter( [
			MinSizes.BIGGER
		], ConditionRelations.OR )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.WHITE_WALL,
			] )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WALL,
				CustomStickerFamily.PRODUCT_FLOOR
			] );

		this.createFilter( [ 
			MinSizes.SHEET_CUSTOMIZABLE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET,
				CustomStickerFamily.PRODUCT_SHEET_KISS_CUT
			] );

		this.createFilter( [
			MinSizes.SHEET_LEGACY
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET_LEGACY
			] );

		this.createFilter( [
			MinSizes.STICKER_ON_SHEET
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_SHEET,
				CustomStickerFamily.PRODUCT_SINGLE_ON_SHEET,
			] );
	}
}
