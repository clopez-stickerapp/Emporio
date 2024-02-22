import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { DeliveryRollSizeTypeAttribute } from "../../DeliveryRollSizeTypeAttribute";
import { DeliveryAttribute } from "../DeliveryAttribute";

export class DeliveryRollSizeTypeFilter extends ProductAttrFilter {
	public constructor() {
		super( DeliveryRollSizeTypeAttribute.ALIAS );
		
		this.createFilter( [ 
			DeliveryRollSizeTypeAttribute.ROLL_SIZE_SMALL,
			DeliveryRollSizeTypeAttribute.ROLL_SIZE_MEDIUM,
			DeliveryRollSizeTypeAttribute.ROLL_SIZE_LARGE,
			DeliveryRollSizeTypeAttribute.ROLL_SIZE_XLARGE,
			DeliveryRollSizeTypeAttribute.ROLL_SIZE_XXLARGE,
			DeliveryRollSizeTypeAttribute.ROLL_SIZE_MAX,
		] )
			.conditionBuilder
			.addCondition( "item.attributes.delivery", ConditionOperators.EQUAL, DeliveryAttribute.DELIVERY_ROLL );	
	}
}
