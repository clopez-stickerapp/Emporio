import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { ProductAttrFilterMode } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilterMode";
import { CustomStickerFamily } from "../../../Family/CustomStickerFamily";
import { FeatureAttribute } from "../FeatureAttribute";
import { LaminateAttribute } from "../LaminateAttribute";
import { MaterialAttribute } from "../MaterialAttribute";
import { MaxSizeAttribute } from "../MaxSizeAttribute";

export class FeatureFilter extends ProductAttrFilter {
	public constructor() {
		super( FeatureAttribute.ALIAS, ProductAttrFilterMode.MODE_MERGE_ALL_WINNERS );

		// Default filter contains all features that doesn't have any conditions binding, or else they wont show up.
		this.createFilter( [
			FeatureAttribute.EFFECT_LAYER,
			FeatureAttribute.HANGTAGGING,
			FeatureAttribute.MANUAL_BACKSCORE,
			FeatureAttribute.PACK_SET_AMOUNT,
			FeatureAttribute.PERFORATION,
			FeatureAttribute.VARIABLE_DATA,
		] );

		let backpaperPrinting = this.createFilter( [ 
			FeatureAttribute.BACKPAPER_PRINT 
		], ConditionRelations.AND );

		backpaperPrinting.conditionBuilder.addSubGroup()
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.WHITE,
				MaterialAttribute.HOLOGRAPHIC,
				MaterialAttribute.MIRROR,
				MaterialAttribute.CLEAR,
			] )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, [
				LaminateAttribute.GLOSSY_UV,
				LaminateAttribute.SOFT_TOUCH,
				LaminateAttribute.SATIN_MATTE,
			] )
			.addCondition( "item.productName", ConditionOperators.NOT_IN, [
				CustomStickerFamily.PRODUCT_LIBRARY_DESIGN
			] );

		backpaperPrinting.conditionBuilder.addSubGroup()
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, 270 )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, 270 );

		// This is a fix for ProductAttrMap to include the option in the "valuesAndConstraints" array.
		backpaperPrinting = this.createFilter( [ 
			FeatureAttribute.BACKPAPER_PRINT 
		], ConditionRelations.AND );

		backpaperPrinting.conditionBuilder.addSubGroup()
			.addCondition( "item.attributes.material", ConditionOperators.IS_EMPTY )
			.addCondition( "item.attributes.laminate", ConditionOperators.IS_EMPTY );

		this.createFilter( [ 
			FeatureAttribute.TRANSFER_TAPE 
		] )
			.conditionBuilder
			.addCondition( "item.attributes.delivery_sheet_width", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_TRANSFER_TAPE )
			.addCondition( "item.attributes.delivery_sheet_height", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_TRANSFER_TAPE );
	}
}