import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { CustomStickerFamily } from "../../../Family/CustomStickerFamily";
import { FixedSizeAttribute } from "../../FixedSizeAttribute";
import { ResellerAttribute } from "../../ResellerAttribute";
import { LaminateAttribute } from "../LaminateAttribute";

export class FixedSizeFilter extends ProductAttrFilter {
	public constructor() {
		super( FixedSizeAttribute.ALIAS );

		this.createFilter( [
			true
		] )
			.conditionBuilder
			.addCondition( "item.attributes.reseller", ConditionOperators.NOT_IN, [ 
				ResellerAttribute.VALUE_STICKERSTHATSTICK, 
				ResellerAttribute.VALUE_STICKIT 
			] )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.productName", ConditionOperators.IN, [
				CustomStickerFamily.PRODUCT_3D_DOME,
				CustomStickerFamily.PRODUCT_SHEET_LEGACY,
			] )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, [
				LaminateAttribute.EPOXY
			] );
	}
}
