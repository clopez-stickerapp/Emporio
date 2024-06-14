import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { FeatureAttribute } from "../FeatureAttribute";
import { MaxSizeAttribute } from "../MaxSizeAttribute";
import { ProductionLineAttribute } from "../ProductionLineAttribute";

export class ProductionLineConstraint extends ProductAttrConstraint {
	public constructor() {
		super( ProductionLineAttribute.ALIAS );

		this.createConditionsFor( ProductionLineAttribute.DIGITAL )
			.addCondition( "item.attributes.material", ConditionOperators.IN, ProductionLineAttribute.DIGITAL_MATERIALS )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, ProductionLineAttribute.DIGITAL_LAMINATES )
			.addCondition( "item.attributes.feature", ConditionOperators.NOT_IN, [
				FeatureAttribute.BACKPAPER_PRINT
			] );

		this.createConditionsFor( ProductionLineAttribute.LASER )
			.addCondition( "item.attributes.material", ConditionOperators.IN, ProductionLineAttribute.LASER_MATERIALS )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, ProductionLineAttribute.LASER_LAMINATES )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_ONE_SIDE_LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_ONE_SIDE_LASER )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizeAttribute.MAX_SIZE_LASER );
		
		this.createConditionsFor( ProductionLineAttribute.SPECIAL )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, "special" );
	}
}
