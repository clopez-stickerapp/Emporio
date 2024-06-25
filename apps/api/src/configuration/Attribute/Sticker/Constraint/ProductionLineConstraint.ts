import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { ProductFeatures } from "../../../attributes/FeatureAttribute";
import { MaxSizeAttribute, MaxSizes } from "../../../attributes/MaxSizeAttribute";
import { DigitalLaminates, DigitalMaterials, LaserLaminates, LaserMaterials, ProductionLineAttribute, ProductionLines } from "../../../attributes/ProductionLineAttribute";

export class ProductionLineConstraint extends ProductAttrConstraint {
	public constructor() {
		super( ProductionLineAttribute.getName() );

		this.createConditionsFor( ProductionLines.DIGITAL )
			.addCondition( "item.attributes.material", ConditionOperators.IN, DigitalMaterials )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, DigitalLaminates )
			.addCondition( "item.attributes.feature", ConditionOperators.NOT_IN, [
				ProductFeatures.BACKPAPER_PRINT
			] );

		this.createConditionsFor( ProductionLines.LASER )
			.addCondition( "item.attributes.material", ConditionOperators.IN, LaserMaterials )
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, LaserLaminates )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.ONE_SIDE_LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.ONE_SIDE_LASER )
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.width_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.LASER )
			.addCondition( "item.attributes.height_mm", ConditionOperators.LESS_THAN_OR_EQUAL, MaxSizes.LASER );
		
		this.createConditionsFor( ProductionLines.SPECIAL )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, "special" );
	}
}
