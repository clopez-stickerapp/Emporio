import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ResellerValues } from "../../../attributes/ResellerAttribute";
import { MaterialAttribute, MaterialValues, MaterialsLabelsOnRollValues } from "../../../attributes/MaterialAttribute";

export class MaterialFilter extends ProductAttrFilter {
	public constructor() {
		super( MaterialAttribute.getName() );

		this.addStickerappFilters();
		this.addSTSFilters();
	}

	private addStickerappFilters() {
		this.createFilter( [
			MaterialValues.WHITE,
			MaterialValues.HOLOGRAPHIC,
			MaterialValues.GLITTER,
			MaterialValues.CLEAR,
			MaterialValues.MIRROR,
			MaterialValues.PRISMATIC,
			MaterialValues.BRUSHED_ALLOY,
			MaterialValues.WHITE_HI_TACK,
			MaterialValues.KRAFT_PAPER,
			MaterialValues.WHITE_REMOVABLE,
			MaterialValues.PIXIE_DUST,
			MaterialValues.GITD,
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET_LEGACY,
				CustomStickerFamily.PRODUCT_SHEET,
				CustomStickerFamily.PRODUCT_SHEET_KISS_CUT
			] );

		this.createFilter( [
			MaterialValues.WHITE,
			MaterialValues.HOLOGRAPHIC,
			MaterialValues.CLEAR,
			MaterialValues.GLITTER,
			MaterialValues.MIRROR,
			MaterialValues.PIXIE_DUST,
			MaterialValues.PRISMATIC,
			MaterialValues.BRUSHED_ALLOY,
			MaterialValues.KRAFT_PAPER,
			MaterialValues.WHITE_HI_TACK,
			MaterialValues.GITD,
			MaterialValues.WHITE_REMOVABLE,
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_DIE_CUT, 
				CustomStickerFamily.PRODUCT_SINGLE_ON_SHEET
			] );

		this.createFilter( [
			MaterialValues.WHITE,
			MaterialValues.WHITE_REMOVABLE,
			MaterialValues.CLEAR,
			MaterialValues.HOLOGRAPHIC,
			MaterialValues.MIRROR,
			MaterialValues.GLITTER,
			MaterialValues.BRUSHED_ALLOY,
			MaterialValues.GITD,
			MaterialValues.PRISMATIC,
			MaterialValues.KRAFT_PAPER,
			MaterialValues.PIXIE_DUST
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_HANG_TAG
			] );

		this.createFilter( [
			MaterialValues.WHITE_STURDY,
			// TODO: Will be released after Magnus template fix.
			// MaterialValues.HOLOGRAPHIC,
			// MaterialValues.MIRROR,
			// MaterialValues.BRUSHED_ALLOY,
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_3D_DOME
			] );

		this.createFilter( [
			MaterialValues.CLEAR
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_FRONT_ADHESIVE
			] );

		this.createFilter( [
			MaterialValues.WHITE_HI_TACK
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_HEAVY_DUTY
			] );

		this.createFilter( [
			MaterialValues.WHITE_REMOVABLE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_REMOVABLE
			] );

		this.createFilter( [
			MaterialValues.WHITE_WALL
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WALL
			] );

		this.createFilter( [
			MaterialValues.WHITE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_FLOOR
			] );

		this.createFilter( [
			MaterialValues.WHITE,
			MaterialValues.CLEAR
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_SHEET
			] );

		this.createFilter( MaterialsLabelsOnRollValues )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createFilter( [
				MaterialValues.CLEAR
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WINDOW
			] );

		this.createFilter( [
			MaterialValues.COLORED_VINYL,
			MaterialValues.WHITE,
			MaterialValues.FROSTED,
			MaterialValues.WHITE_HI_TACK,
			MaterialValues.METALLIC_GOLD,
			MaterialValues.METALLIC_SILVER,
			MaterialValues.BUBBLE_FREE
		] )
		.conditionBuilder
		.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_TRANSFER_DECAL );
	}

	private addSTSFilters() {
		this.createFilter( [
			MaterialValues.WHITE,
			MaterialValues.HOLOGRAPHIC,
			MaterialValues.GLITTER,
			MaterialValues.CLEAR,
			MaterialValues.MIRROR,
			MaterialValues.PRISMATIC,
			MaterialValues.BRUSHED_ALLOY,
			MaterialValues.WHITE_HI_TACK,
			MaterialValues.KRAFT_PAPER,
			MaterialValues.WHITE_REMOVABLE,
			MaterialValues.WHITE_WALL,
			MaterialValues.GITD,
			MaterialValues.REFLECTIVE,
		] )
			.conditionBuilder
			.setBaseComplexityScore( 120 )
			.addCondition( "item.attributes.reseller", ConditionOperators.IN, [ 
				ResellerValues.STICKERSTHATSTICK, 
				ResellerValues.STICKIT 
			] )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_DIE_CUT, 
				CustomStickerFamily.PRODUCT_SINGLE_ON_SHEET
			] );
	}
}
