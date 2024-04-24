import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { CustomStickerFamily } from "../../../Family/CustomStickerFamily";
import { SkinProductFamily } from "../../../Family/SkinProductFamily";
import { ResellerAttribute } from "../../ResellerAttribute";
import { MaterialAttribute } from "../MaterialAttribute";

export class MaterialFilter extends ProductAttrFilter {
	public constructor() {
		super( MaterialAttribute.ALIAS );

		this.addStickerappFilters();
		this.addSTSFilters();
	}

	private addStickerappFilters() {
		this.createFilter( [
			MaterialAttribute.WHITE,
			MaterialAttribute.HOLOGRAPHIC,
			MaterialAttribute.GLITTER,
			MaterialAttribute.CLEAR,
			MaterialAttribute.MIRROR,
			MaterialAttribute.PRISMATIC,
			MaterialAttribute.BRUSHED_ALLOY,
			MaterialAttribute.WHITE_HI_TACK,
			MaterialAttribute.KRAFT_PAPER,
			MaterialAttribute.WHITE_REMOVABLE,
			MaterialAttribute.PIXIE_DUST,
			MaterialAttribute.GITD,
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET_LEGACY,
				CustomStickerFamily.PRODUCT_SHEET,
				CustomStickerFamily.PRODUCT_SHEET_KISS_CUT
			] );

		this.createFilter( [
			MaterialAttribute.WHITE,
			MaterialAttribute.HOLOGRAPHIC,
			MaterialAttribute.CLEAR,
			MaterialAttribute.GLITTER,
			MaterialAttribute.MIRROR,
			MaterialAttribute.PIXIE_DUST,
			MaterialAttribute.PRISMATIC,
			MaterialAttribute.BRUSHED_ALLOY,
			MaterialAttribute.KRAFT_PAPER,
			MaterialAttribute.WHITE_HI_TACK,
			MaterialAttribute.GITD,
			MaterialAttribute.WHITE_REMOVABLE,
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_DIE_CUT, 
				CustomStickerFamily.PRODUCT_SINGLE_ON_SHEET
			] );

		this.createFilter( [
			MaterialAttribute.WHITE,
			MaterialAttribute.WHITE_REMOVABLE,
			MaterialAttribute.CLEAR,
			MaterialAttribute.HOLOGRAPHIC,
			MaterialAttribute.MIRROR,
			MaterialAttribute.GLITTER,
			MaterialAttribute.BRUSHED_ALLOY,
			MaterialAttribute.GITD,
			MaterialAttribute.PRISMATIC,
			MaterialAttribute.KRAFT_PAPER,
			MaterialAttribute.PIXIE_DUST
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_HANG_TAG
			] );

		this.createFilter( [
			MaterialAttribute.WHITE_STURDY,
			// TODO: Will be released after Magnus template fix.
			// MaterialAttribute.HOLOGRAPHIC,
			// MaterialAttribute.MIRROR,
			// MaterialAttribute.BRUSHED_ALLOY,
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_3D_DOME
			] );

		this.createFilter( [
			MaterialAttribute.CLEAR
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_FRONT_ADHESIVE
			] );

		this.createFilter( [
			MaterialAttribute.WHITE_HI_TACK
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_HEAVY_DUTY
			] );

		this.createFilter( [
			MaterialAttribute.WHITE_REMOVABLE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_REMOVABLE
			] );

		this.createFilter( [
			MaterialAttribute.WHITE_WALL
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WALL
			] );

		this.createFilter( [
			MaterialAttribute.WHITE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_FLOOR
			] );

		const skinFilter = this.createFilter( [
			MaterialAttribute.SKIN
		], ConditionRelations.OR );

		skinFilter.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LAPTOP_SKIN
			] )
			.addCondition( "item.productFamilyName", ConditionOperators.IN, [
				SkinProductFamily.NAME
			] );

		this.createFilter( [
			MaterialAttribute.WHITE,
			MaterialAttribute.CLEAR
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_SHEET
			] );

		this.createFilter( MaterialAttribute.MATERIALS_LABELS_ON_ROLL )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createFilter( [
				MaterialAttribute.CLEAR
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_WINDOW
			] );

		this.createFilter( [
			MaterialAttribute.COLORED_VINYL,
			MaterialAttribute.WHITE,
			MaterialAttribute.FROSTED,
			MaterialAttribute.WHITE_HI_TACK,
			MaterialAttribute.METALLIC_GOLD,
			MaterialAttribute.METALLIC_SILVER,
			MaterialAttribute.BUBBLE_FREE
		] )
		.conditionBuilder
		.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_TRANSFER_DECAL );
	}

	private addSTSFilters() {
		this.createFilter( [
			MaterialAttribute.WHITE,
			MaterialAttribute.HOLOGRAPHIC,
			MaterialAttribute.GLITTER,
			MaterialAttribute.CLEAR,
			MaterialAttribute.MIRROR,
			MaterialAttribute.PRISMATIC,
			MaterialAttribute.BRUSHED_ALLOY,
			MaterialAttribute.WHITE_HI_TACK,
			MaterialAttribute.KRAFT_PAPER,
			MaterialAttribute.WHITE_REMOVABLE,
			MaterialAttribute.WHITE_WALL,
			MaterialAttribute.GITD,
			MaterialAttribute.REFLECTIVE,
		] )
			.conditionBuilder
			.setBaseComplexityScore( 120 )
			.addCondition( "item.attributes.reseller", ConditionOperators.IN, [ 
				ResellerAttribute.VALUE_STICKERSTHATSTICK, 
				ResellerAttribute.VALUE_STICKIT 
			] )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_DIE_CUT, 
				CustomStickerFamily.PRODUCT_SINGLE_ON_SHEET
			] );
	}
}
