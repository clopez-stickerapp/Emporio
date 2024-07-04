import { ConditionRelations } from "$/conditions/ConditionRelations";
import { RuleConfig } from "$/configuration/interface/RuleConfig";
import { AttributeValueMulti } from "../AttributeValue";
import { ProductAttrFilterMode } from "./ProductAttrFilterMode";
import { ProductAttrFilteredValues } from "./ProductAttrFilteredValues";

/**
 * This is a way to be able to filter the attribute values and say
 * "these attribute values are available if these conditions are met".
 * The order of the values will be presented as you put them.
 *
 * This is NOT used for telling which attribute values are disabled,
 * just to tell which values should be shown and in what order.
 */
export class ProductAttrFilter {
	private attributeName: string;
	protected filters: ProductAttrFilteredValues[] = [];
	protected mode: ProductAttrFilterMode;

	public constructor( config: RuleConfig ) {
		this.attributeName = config.name;
		// TODO: Add mode to config
		this.mode = ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS;

		for ( const rule of config.rules ) {
			this.filters.push( new ProductAttrFilteredValues( rule.keys, rule.conditions ) );
		}
	}

	public createFilter( attrValues: AttributeValueMulti, conditionRelationMode: ConditionRelations = ConditionRelations.AND ): ProductAttrFilteredValues {
		throw new Error("Create filters this way is no longer supported.");
		// let filter = new ProductAttrFilteredValues( attrValues, conditionRelationMode );
		// this.filters.push( filter );
		// return filter;
	}

	public getFilters(): ProductAttrFilteredValues[] {
		return this.filters;
	}

	public getMode(): ProductAttrFilterMode {
		return this.mode;
	}

	public getAttributeName(): string {
		return this.attributeName;
	}
}
