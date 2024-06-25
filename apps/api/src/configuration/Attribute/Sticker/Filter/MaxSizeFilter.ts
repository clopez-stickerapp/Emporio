import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { MaterialAttribute, MaterialValues } from "../../../attributes/MaterialAttribute";
import { MaxSizeAttribute, MaxSizes } from "../../../attributes/MaxSizeAttribute";

export class MaxSizeFilter extends ProductAttrFilter {
	public constructor() {
		super( MaxSizeAttribute.getName() );

		this.createFilter( [ 
			MaxSizes.LASER 
		] )
			.conditionBuilder
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialValues.CLEAR,
				MaterialValues.MIRROR,
				MaterialValues.BRUSHED_ALLOY,
				MaterialValues.WHITE_REMOVABLE
			] )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET,
				CustomStickerFamily.PRODUCT_SHEET_KISS_CUT
			] );

		this.createFilter( [
			MaxSizes.SHEET_LEGACY
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET_LEGACY
			] );

		this.createFilter( [
			MaxSizes.ROLL
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );
	}
}
