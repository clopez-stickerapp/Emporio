import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { InkValues } from "../attributes/InkAttribute";
import { LaminateAttribute, LaminateValues } from "../attributes/LaminateAttribute";
import { MaterialValues } from "../attributes/MaterialAttribute";
import { ResellerValues } from "../attributes/ResellerAttribute";

export class LaminateFilter extends ProductAttrFilter {
	public constructor() {
		super( LaminateAttribute.getName() );

		this.addStickerappFilters();
		this.addSTSFilters();
	}
		
	private addStickerappFilters() {
		this.createFilter( [
			LaminateValues.GLOSSY_UV
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.GLITTER,
				MaterialValues.BRUSHED_ALLOY,
				MaterialValues.PRISMATIC,
				MaterialValues.GITD,
				MaterialValues.PIXIE_DUST,
			] );

		this.createFilter( [
			LaminateValues.GLOSSY_UV,
			LaminateValues.SOFT_TOUCH,
			LaminateValues.CRACKED_ICE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.WHITE,
				MaterialValues.CLEAR
			] );

		this.createFilter( [
			LaminateValues.GLOSSY_UV,
			LaminateValues.SATIN_MATTE,
			LaminateValues.CRACKED_ICE
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.HOLOGRAPHIC
			] );

		this.createFilter( [
			LaminateValues.GLOSSY_UV,
			LaminateValues.SOFT_TOUCH
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.MIRROR,
				MaterialValues.WHITE_REMOVABLE
			] );

		const inkFilter = this.createFilter( [
			LaminateValues.GLOSSY_NO_UV,
			LaminateValues.UNCOATED,
		], ConditionRelations.OR );

		inkFilter.conditionBuilder.setBaseComplexityScore( 100 );

		inkFilter.conditionBuilder
			.addCondition( "item.attributes.ink", ConditionOperators.IN, [
				InkValues.INVISIBLE_INK,
				InkValues.PINK_INK,
			] );

		this.createFilter( [
			LaminateValues.GLOSSY_UV_12_MIL_HEAVY_DUTY
		] )
			.conditionBuilder
			.addCondition("item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.WHITE_HI_TACK
			] );

		this.createFilter( [
			LaminateValues.UNCOATED
		], ConditionRelations.OR )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_TRANSFER_DECAL,
				CustomStickerFamily.PRODUCT_WALL
			] )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.KRAFT_PAPER,
				MaterialValues.SATIN_MATTE,
				MaterialValues.COLORED_VINYL,
				MaterialValues.WHITE_WALL
			] );

		this.createFilter( [
			LaminateValues.SANDY
		] )
			.conditionBuilder
			.setBaseComplexityScore( 1000 )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_FLOOR )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.SKIN );

		this.createFilter( [
			LaminateValues.EPOXY
		] )
			.conditionBuilder
			.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_3D_DOME );

		this.createFilter( [
			LaminateValues.GLOSSY_THIN_NO_UV
		] )
			.conditionBuilder
			.setBaseComplexityScore( 1000 )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_SHEET
			] );

		this.createFilter( [
			LaminateValues.GLOSSY_THIN_NO_UV,
			LaminateValues.UNCOATED,
			LaminateValues.SATIN_MATTE
		] )
			.conditionBuilder
			// The complexity of this filter needs to be lower than the one below
			// To ensure that kraft_thin doesn't get the glossy option
			.setBaseComplexityScore( 1000 )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );

		this.createFilter( [
			LaminateValues.UNCOATED,
		] )
			.conditionBuilder
			// The complexity of this filter needs to be higher than the one above
			// To ensure that kraft_thin doesn't get the glossy option
			.setBaseComplexityScore( 1001 )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.KRAFT_THIN)
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );


		this.createFilter( [
			LaminateValues.GLOSSY_UV
		], ConditionRelations.OR )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.COLORED_VINYL )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET_LEGACY );

		this.createFilter( [
			LaminateValues.UNCOATED
		] )
			.conditionBuilder
			.setBaseComplexityScore( 1000 )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_TRANSFER_DECAL );		
	}

	private addSTSFilters() {
		this.createFilter( [
			LaminateValues.GLOSSY_UV_12_MIL_HEAVY_DUTY,
			LaminateValues.GLOSSY_UV,
			LaminateValues.SANDY
		] )
			.conditionBuilder
			.setBaseComplexityScore( 120 )
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.reseller", ConditionOperators.IN, [ 
				ResellerValues.STICKERSTHATSTICK, 
				ResellerValues.STICKIT 
			] )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.WHITE_HI_TACK
			] );
	}
}
