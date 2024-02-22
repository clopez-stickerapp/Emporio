import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { CustomStickerFamily } from "../../../Family/CustomStickerFamily";
import { MaterialAttribute } from "../MaterialAttribute";
import { MaxSizeAttribute } from "../MaxSizeAttribute";

export class MaxSizeFilter extends ProductAttrFilter {
	public constructor() {
		super( MaxSizeAttribute.ALIAS );

		this.createFilter( [ 
			MaxSizeAttribute.MAX_SIZE_LASER 
		] )
			.conditionBuilder
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.material", ConditionOperators.IN, [
				MaterialAttribute.CLEAR,
				MaterialAttribute.MIRROR,
				MaterialAttribute.BRUSHED_ALLOY,
				MaterialAttribute.WHITE_REMOVABLE
			] )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET,
				CustomStickerFamily.PRODUCT_SHEET_KISS_CUT
			] );

		this.createFilter( [
			MaxSizeAttribute.MAX_SIZE_SHEET_LEGACY
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_SHEET_LEGACY
			] );

		this.createFilter( [
			MaxSizeAttribute.MAX_SIZE_ROLL
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_LABELS_ON_ROLL
			] );
	}
}
