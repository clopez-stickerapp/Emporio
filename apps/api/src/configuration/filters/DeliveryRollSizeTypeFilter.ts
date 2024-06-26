import { ConditionOperators } from "$/conditions/ConditionOperators";
import { DeliveryRollSizeTypes, DeliveryRollSizeTypeAttribute } from "$/configuration/attributes/DeliveryRollSizeTypeAttribute";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { DeliveryTypes } from "../attributes/DeliveryAttribute";

export class DeliveryRollSizeTypeFilter extends ProductAttrFilter {
	public constructor() {
		super( DeliveryRollSizeTypeAttribute.getName() );
		
		this.createFilter( [ 
			DeliveryRollSizeTypes.SMALL,
			DeliveryRollSizeTypes.MEDIUM,
			DeliveryRollSizeTypes.LARGE,
			DeliveryRollSizeTypes.XLARGE,
			DeliveryRollSizeTypes.XXLARGE,
			DeliveryRollSizeTypes.MAX,
		] )
			.conditionBuilder
			.addCondition( "item.attributes.delivery", ConditionOperators.EQUAL, DeliveryTypes.ROLL );	
	}
}
