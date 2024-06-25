import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { DeliveryRollSizeTypes, DeliveryRollSizeTypeAttribute } from "../../../attributes/DeliveryRollSizeTypeAttribute";
import { DeliveryRollTopEdgeMarginDefault } from "../../../attributes/DeliveryRollTopEdgeMarginAttribute";
import { CutDirectionAttributeValues } from "../../../attributes/CutDirectionAttribute";

export class DeliveryRollSizeTypeConstraint extends ProductAttrConstraint {
	public constructor() {
		super( DeliveryRollSizeTypeAttribute.getName() );

		for ( const size of Object.values( DeliveryRollSizeTypes) ) {
			const conditions = this.createConditionsFor( size );
			
			const maxSize = size - ( 2 * DeliveryRollTopEdgeMarginDefault );
			
			conditions.addSubGroup( ConditionRelations.OR )
				.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, maxSize )
				.addCondition( "item.attributes.cut_direction", ConditionOperators.IN, [
					CutDirectionAttributeValues.TOP_FIRST,
					CutDirectionAttributeValues.BOTTOM_FIRST,
				] );
			
			conditions.addSubGroup( ConditionRelations.OR )
				.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, maxSize )
				.addCondition( "item.attributes.cut_direction", ConditionOperators.IN, [
					CutDirectionAttributeValues.LEFT_FIRST,
					CutDirectionAttributeValues.RIGHT_FIRST,
				] );
		}
	}
}
