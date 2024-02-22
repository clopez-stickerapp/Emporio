import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
import { ProductAttrConstraint } from "../../../../Core/Product/Attribute/Constraint/ProductAttrConstraint";
import { DeliveryRollSizeTypeAttribute } from "../../DeliveryRollSizeTypeAttribute";
import { DeliveryRollTopEdgeMarginAttribute } from "../../DeliveryRollTopEdgeMarginAttribute";
import { CutDirectionAttribute } from "../CutDirectionAttribute";

export class DeliveryRollSizeTypeConstraint extends ProductAttrConstraint {
	public constructor() {
		super( DeliveryRollSizeTypeAttribute.ALIAS );

		for ( const size of DeliveryRollSizeTypeAttribute.getSizes() ) {
			const conditions = this.createConditionsFor( size );
			
			const maxSize = size - ( 2 * DeliveryRollTopEdgeMarginAttribute.DEFAULT_VALUE );
			
			conditions.addSubGroup( ConditionRelations.OR )
				.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, maxSize )
				.addCondition( "item.attributes.cut_direction", ConditionOperators.IN, [
					CutDirectionAttribute.TOP_FIRST,
					CutDirectionAttribute.BOTTOM_FIRST,
				] );
			
			conditions.addSubGroup( ConditionRelations.OR )
				.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, maxSize )
				.addCondition( "item.attributes.cut_direction", ConditionOperators.IN, [
					CutDirectionAttribute.LEFT_FIRST,
					CutDirectionAttribute.RIGHT_FIRST,
				] );
		}
	}
}
