import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { CustomStickerFamily } from "../../../Family/CustomStickerFamily";
import { FixedQuantityAttribute } from "../../FixedQuantityAttribute";
import { ResellerAttribute } from "../../ResellerAttribute";
import { LaminateAttribute } from "../LaminateAttribute";

export class FixedQuantityFilter extends ProductAttrFilter {
	public constructor() {
		super( FixedQuantityAttribute.ALIAS );

		this.createFilter( [
			true
		] )
			.conditionBuilder
			.addCondition( "item.attributes.reseller", ConditionOperators.NOT_IN, [ 
				ResellerAttribute.VALUE_STICKERSTHATSTICK, 
				ResellerAttribute.VALUE_STICKIT 
			] )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, [
				LaminateAttribute.EPOXY
			] );
	}
}
