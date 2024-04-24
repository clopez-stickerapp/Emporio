import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { CustomStickerFamily } from "../../../Family/CustomStickerFamily";
import { ResellerAttribute } from "../../ResellerAttribute";
import { InkAttribute } from "../InkAttribute";
import { LaminateAttribute } from "../LaminateAttribute";
import { MaterialAttribute } from "../MaterialAttribute";

export class LaminateFilter extends ProductAttrFilter {
	public constructor() {
		super( LaminateAttribute.ALIAS );

		this.addStickerappFilters();
		this.addSTSFilters();
	}
		
	private addStickerappFilters() {
		this.createFilter( [
			LaminateAttribute.GLOSSY_UV
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.GLITTER,
				MaterialAttribute.BRUSHED_ALLOY,
				MaterialAttribute.PRISMATIC,
				MaterialAttribute.GITD,
				MaterialAttribute.PIXIE_DUST,
			] );

		this.createFilter( [
			LaminateAttribute.GLOSSY_UV,
			LaminateAttribute.SOFT_TOUCH,
			LaminateAttribute.CRACKED_ICE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.WHITE,
				MaterialAttribute.CLEAR
			] );

		this.createFilter( [
			LaminateAttribute.GLOSSY_UV,
			LaminateAttribute.SATIN_MATTE,
			LaminateAttribute.CRACKED_ICE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.HOLOGRAPHIC
			] );

		this.createFilter( [
			LaminateAttribute.GLOSSY_UV,
			LaminateAttribute.SOFT_TOUCH
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.MIRROR,
				MaterialAttribute.WHITE_REMOVABLE
			] );

		const inkFilter = this.createFilter( [
			LaminateAttribute.GLOSSY_NO_UV,
			LaminateAttribute.UNCOATED,
		], ConditionRelations.OR );

		inkFilter.conditionBuilder.setBaseComplexityScore( 100 );

		inkFilter.conditionBuilder
			.addCondition( "item.attributes.ink", ConditionOperators.IN, [
				InkAttribute.INVISIBLE_INK,
				InkAttribute.PINK_INK,
			] );

		this.createFilter( [
			LaminateAttribute.GLOSSY_UV_12_MIL_HEAVY_DUTY
		] )
			.conditionBuilder
			.addCondition("item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.WHITE_HI_TACK
			] );

		this.createFilter( [
			LaminateAttribute.UNCOATED
		], ConditionRelations.OR )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_TRANSFER_DECAL,
				CustomStickerFamily.PRODUCT_WALL
			] )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.KRAFT_PAPER,
				MaterialAttribute.SATIN_MATTE,
				MaterialAttribute.COLORED_VINYL,
				MaterialAttribute.WHITE_WALL
			] );

		this.createFilter( [
			LaminateAttribute.SANDY
		] )
			.conditionBuilder
			.setBaseComplexityScore( 1000 )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_FLOOR )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.SKIN );

		this.createFilter( [
			LaminateAttribute.EPOXY
		] )
			.conditionBuilder
			.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_3D_DOME );

		this.createFilter( [
			LaminateAttribute.GLOSSY_THIN_NO_UV
		] )
			.conditionBuilder
			.setBaseComplexityScore( 1000 )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_SHEET
			] );

		this.createFilter( [
			LaminateAttribute.GLOSSY_THIN_NO_UV,
			LaminateAttribute.UNCOATED
		] )
			.conditionBuilder
			// The complexity of this filter needs to be lower than the one below
			// To ensure that kraft_thin doesn't get the glossy option
			.setBaseComplexityScore( 1000 )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createFilter( [
			LaminateAttribute.UNCOATED,
		] )
			.conditionBuilder
			// The complexity of this filter needs to be higher than the one above
			// To ensure that kraft_thin doesn't get the glossy option
			.setBaseComplexityScore( 1001 )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.KRAFT_THIN)
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );


		this.createFilter( [
			LaminateAttribute.GLOSSY_UV
		], ConditionRelations.OR )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.COLORED_VINYL )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET_LEGACY );

		this.createFilter( [
			LaminateAttribute.UNCOATED
		] )
			.conditionBuilder
			.setBaseComplexityScore( 1000 )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_TRANSFER_DECAL );		
	}

	private addSTSFilters() {
		this.createFilter( [
			LaminateAttribute.GLOSSY_UV_12_MIL_HEAVY_DUTY,
			LaminateAttribute.GLOSSY_UV,
			LaminateAttribute.SANDY
		] )
			.conditionBuilder
			.setBaseComplexityScore( 120 )
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.reseller", ConditionOperators.IN, [ 
				ResellerAttribute.VALUE_STICKERSTHATSTICK, 
				ResellerAttribute.VALUE_STICKIT 
			] )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.WHITE_HI_TACK
			] );
	}
}
