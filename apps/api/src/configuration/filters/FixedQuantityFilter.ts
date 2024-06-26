import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { FixedQuantityAttribute } from "../../../attributes/FixedQuantityAttribute";
import { ResellerValues } from "../../../attributes/ResellerAttribute";
import { LaminateValues } from "../../../attributes/LaminateAttribute";

export class FixedQuantityFilter extends ProductAttrFilter {
	public constructor() {
		super( FixedQuantityAttribute.getName() );

		this.createFilter( [
			true
		] )
			.conditionBuilder
			.addCondition( "item.attributes.reseller", ConditionOperators.NOT_IN, [ 
				ResellerValues.STICKERSTHATSTICK, 
				ResellerValues.STICKIT 
			] )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_3D_DOME )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, [
				LaminateValues.EPOXY
			] );
	}
}
