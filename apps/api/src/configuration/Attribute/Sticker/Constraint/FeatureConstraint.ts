import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { FeatureAttribute } from "../FeatureAttribute";
import { LaminateAttribute } from "../LaminateAttribute";
import { MaterialAttribute } from "../MaterialAttribute";
import { ProductionLineAttribute } from "../ProductionLineAttribute";

export class FeatureConstraint extends ProductAttrConstraint {
	public static readonly EFFECT_LAYER_MATERIALS = [
		MaterialAttribute.PRISMATIC,
		MaterialAttribute.BRUSHED_ALLOY,
		MaterialAttribute.GLITTER,
		MaterialAttribute.MIRROR,
		MaterialAttribute.SILVER_THIN,
		MaterialAttribute.HOLOGRAPHIC,
		MaterialAttribute.KRAFT_PAPER,
		MaterialAttribute.KRAFT_THIN,
		MaterialAttribute.REFLECTIVE,
		MaterialAttribute.PIXIE_DUST,
		MaterialAttribute.GITD,
		MaterialAttribute.CLEAR,
		MaterialAttribute.CLEAR_THIN,
		MaterialAttribute.CLEAR_BACKSCORE
	];

	public constructor() {
		super( FeatureAttribute.ALIAS );

		this.createConditionsFor( FeatureAttribute.HANGTAGGING )
			.addCondition( "item.attributes.laminate", ConditionOperators.NOT_IN, [
				LaminateAttribute.EPOXY,
			] );

		const backPaperPrintConditions = this.createConditionsFor( FeatureAttribute.BACKPAPER_PRINT, ConditionRelations.OR );
		backPaperPrintConditions.addSubGroup()
			.addCondition( "item.attributes.material", ConditionOperators.IN, ProductionLineAttribute.LASER_MATERIALS );

		this.createConditionsFor( FeatureAttribute.EFFECT_LAYER )
			.addCondition( "item.attributes.material", ConditionOperators.IN, FeatureConstraint.EFFECT_LAYER_MATERIALS );

		this.createConditionsFor( FeatureAttribute.TRANSFER_TAPE )
			.addCondition( "item.attributes.production_line", ConditionOperators.EQUAL, ProductionLineAttribute.DIGITAL );
	}
}
