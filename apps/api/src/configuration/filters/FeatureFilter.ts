import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ProductAttrFilterMode } from "$/product/attribute/Filter/ProductAttrFilterMode";
import { FeatureAttribute, ProductFeatures } from "../../../attributes/FeatureAttribute";
import { LaminateAttribute, LaminateValues } from "../../../attributes/LaminateAttribute";
import { MaterialAttribute, MaterialValues } from "../../../attributes/MaterialAttribute";
import { MaxSizeAttribute, MaxSizes } from "../../../attributes/MaxSizeAttribute";

export class FeatureFilter extends ProductAttrFilter {
	public constructor() {
		super( FeatureAttribute.getName(), ProductAttrFilterMode.MODE_MERGE_ALL_WINNERS );

		// Default filter contains all features that doesn't have any conditions binding, or else they wont show up.
		this.createFilter( [
			ProductFeatures.EFFECT_LAYER,
			ProductFeatures.HANGTAGGING,
			ProductFeatures.MANUAL_BACKSCORE,
			ProductFeatures.PACK_SET_AMOUNT,
			ProductFeatures.PERFORATION,
			ProductFeatures.VARIABLE_DATA,
		] );

		let backpaperPrinting = this.createFilter( [ 
			ProductFeatures.BACKPAPER_PRINT 
		], ConditionRelations.AND );

		backpaperPrinting.conditionBuilder.addSubGroup()
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.WHITE,
				MaterialValues.HOLOGRAPHIC,
				MaterialValues.MIRROR,
				MaterialValues.CLEAR,
				MaterialValues.PIXIE_DUST,
			] )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, [
				LaminateValues.GLOSSY_UV,
				LaminateValues.SOFT_TOUCH,
				LaminateValues.SATIN_MATTE,
			] )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LIBRARY_DESIGN
			] );

		backpaperPrinting.conditionBuilder.addSubGroup()
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, 270 )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, 270 );

		// This is a fix for ProductAttrMap to include the option in the "valuesAndConstraints" array.
		backpaperPrinting = this.createFilter( [ 
			ProductFeatures.BACKPAPER_PRINT 
		], ConditionRelations.AND );

		backpaperPrinting.conditionBuilder.addSubGroup()
			.addCondition( "item.attributes.material", ConditionOperators.IS_EMPTY )
			.addCondition( "item.attributes.laminate", ConditionOperators.IS_EMPTY );

		this.createFilter( [ 
			ProductFeatures.TRANSFER_TAPE 
		] )
			.conditionBuilder
			.addCondition( "item.attributes.delivery_sheet_width", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.TRANSFER_TAPE )
			.addCondition( "item.attributes.delivery_sheet_height", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.TRANSFER_TAPE );
	}
}
