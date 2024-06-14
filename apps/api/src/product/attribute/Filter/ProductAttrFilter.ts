import { ConditionRelations } from "$/conditions/ConditionRelations";
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
	public mode: ProductAttrFilterMode;

	public constructor( attrAlias: string, mode: ProductAttrFilterMode = ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS ) {
		this.attributeName = attrAlias;
		this.mode = mode;
	}

	public createFilter( attrValues: AttributeValueMulti, conditionRelationMode: ConditionRelations = ConditionRelations.AND ): ProductAttrFilteredValues {
		let filter = new ProductAttrFilteredValues( attrValues, conditionRelationMode );
		this.filters.push( filter );
		return filter;
	}

	public getAllFilters(): ProductAttrFilteredValues[] {
		return this.filters;
	}

	public getAttributeName(): string {
		return this.attributeName;
	}
}
