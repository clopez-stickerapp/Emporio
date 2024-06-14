import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ResellerAttribute } from "../../ResellerAttribute";
import { MaterialAttribute } from "../MaterialAttribute";
import { MinSizeAttribute } from "../MinSizeAttribute";

export class MinSizeFilter extends ProductAttrFilter {
	public constructor() {
		super( MinSizeAttribute.ALIAS );

		this.createFilter( [
			MinSizeAttribute.MIN_SIZE_DEFAULT
		] );

		this.createFilter( [
			MinSizeAttribute.MIN_SIZE_SPECIAL_STS
		] )
			.conditionBuilder
			.addCondition( "item.attributes.reseller", ConditionOperators.EQUAL, ResellerAttribute.VALUE_STICKERSTHATSTICK );

		this.createFilter( [
			MinSizeAttribute.MIN_SIZE_BIGGER
		], ConditionRelations.OR )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.WHITE_WALL,
			] )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WALL,
				CustomStickerFamily.PRODUCT_FLOOR
			] );

		this.createFilter( [ 
			MinSizeAttribute.MIN_SIZE_SHEET_CUSTOMIZABLE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET,
				CustomStickerFamily.PRODUCT_SHEET_KISS_CUT
			] );

		this.createFilter( [
			MinSizeAttribute.MIN_SIZE_SHEET_LEGACY
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET_LEGACY
			] );

		this.createFilter( [
			MinSizeAttribute.MIN_SIZE_STICKER_ON_SHEET
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_SHEET,
				CustomStickerFamily.PRODUCT_SINGLE_ON_SHEET,
			] );
	}
}
