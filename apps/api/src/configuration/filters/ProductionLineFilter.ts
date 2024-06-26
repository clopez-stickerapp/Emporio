import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { MaterialValues } from "../attributes/MaterialAttribute";
import { MaxSizes } from "../attributes/MaxSizeAttribute";
import { ProductionLineAttribute, ProductionLines } from "../attributes/ProductionLineAttribute";

export class ProductionLineFilter extends ProductAttrFilter {
	public constructor() {
		super( ProductionLineAttribute.getName() );

		this.createFilter( [ 
			ProductionLines.LASER 
		] )
			.conditionBuilder
            .setBaseComplexityScore( 120 )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET,
				CustomStickerFamily.PRODUCT_SHEET_KISS_CUT,
				CustomStickerFamily.PRODUCT_WINDOW,
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL,
				CustomStickerFamily.PRODUCT_LABELS_ON_SHEET
			] );

		this.createFilter( [ 
			ProductionLines.LASER 
		] )
			.conditionBuilder
			.addCondition("item.attributes.material", ConditionOperators.IN, [
				MaterialValues.WHITE,
				MaterialValues.WHITE_REMOVABLE,
				MaterialValues.CLEAR
			] )
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_LIBRARY_DESIGN )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.ONE_SIDE_LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.ONE_SIDE_LASER )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.LASER );

		this.createFilter( [ 
			ProductionLines.DIGITAL 
		], ConditionRelations.OR )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_TRANSFER_DECAL
			] )
			.addSubGroup( ConditionRelations.AND )
			.addCondition( "item.attributes.width_mm", ConditionOperators.GREATER_THAN, MaxSizes.LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.GREATER_THAN, MaxSizes.LASER );
	}
}
