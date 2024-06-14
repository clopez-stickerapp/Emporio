import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { MaterialAttribute } from "../MaterialAttribute";
import { MaxSizeAttribute } from "../MaxSizeAttribute";
import { ProductionLineAttribute } from "../ProductionLineAttribute";

export class ProductionLineFilter extends ProductAttrFilter {
	public constructor() {
		super( ProductionLineAttribute.ALIAS );

		this.createFilter( [ 
			ProductionLineAttribute.LASER 
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
			ProductionLineAttribute.LASER 
		] )
			.conditionBuilder
			.addCondition("item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.WHITE,
				MaterialAttribute.WHITE_REMOVABLE,
				MaterialAttribute.CLEAR
			] )
			.addCondition( "item.productName", ConditionOperators.NOT_EQUAL, CustomStickerFamily.PRODUCT_LIBRARY_DESIGN )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_ONE_SIDE_LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_ONE_SIDE_LASER )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_LASER );

		this.createFilter( [ 
			ProductionLineAttribute.DIGITAL 
		], ConditionRelations.OR )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_TRANSFER_DECAL
			] )
			.addSubGroup( ConditionRelations.AND )
			.addCondition( "item.attributes.width_mm", ConditionOperators.GREATER_THAN, MaxSizeAttribute.MAX_SIZE_LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.GREATER_THAN, MaxSizeAttribute.MAX_SIZE_LASER );
	}
}
