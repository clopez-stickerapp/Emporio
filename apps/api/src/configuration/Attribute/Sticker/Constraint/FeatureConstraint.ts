import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { FeatureAttribute, ProductFeatures } from "../../../attributes/FeatureAttribute";
import { LaminateValues } from "../../../attributes/LaminateAttribute";
import { MaterialValues } from "../../../attributes/MaterialAttribute";
import { LaserMaterials, ProductionLines } from "../../../attributes/ProductionLineAttribute";

export class FeatureConstraint extends ProductAttrConstraint {
	public static readonly EFFECT_LAYER_MATERIALS = [
		MaterialValues.PRISMATIC,
		MaterialValues.BRUSHED_ALLOY,
		MaterialValues.GLITTER,
		MaterialValues.MIRROR,
		MaterialValues.SILVER_THIN,
		MaterialValues.HOLOGRAPHIC,
		MaterialValues.KRAFT_PAPER,
		MaterialValues.KRAFT_THIN,
		MaterialValues.REFLECTIVE,
		MaterialValues.PIXIE_DUST,
		MaterialValues.GITD,
		MaterialValues.CLEAR,
		MaterialValues.CLEAR_THIN,
		MaterialValues.CLEAR_BACKSCORE
	];

	public constructor() {
		super( FeatureAttribute.getName() );

		this.createConditionsFor( ProductFeatures.HANGTAGGING )
			.addCondition( "item.attributes.laminate", ConditionOperators.NOT_IN, [
				LaminateValues.EPOXY,
			] );

		const backPaperPrintConditions = this.createConditionsFor( ProductFeatures.BACKPAPER_PRINT, ConditionRelations.OR );
		backPaperPrintConditions.addSubGroup()
			.addCondition( "item.attributes.material", ConditionOperators.IN, LaserMaterials );

		this.createConditionsFor( ProductFeatures.EFFECT_LAYER )
			.addCondition( "item.attributes.material", ConditionOperators.IN, FeatureConstraint.EFFECT_LAYER_MATERIALS );

		this.createConditionsFor( ProductFeatures.TRANSFER_TAPE )
			.addCondition( "item.attributes.production_line", ConditionOperators.EQUAL, ProductionLines.DIGITAL );
	}
}
