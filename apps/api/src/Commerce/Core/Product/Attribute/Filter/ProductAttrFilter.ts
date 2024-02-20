import { AttributeValueMulti } from "../../../../../Helper/Condition/AttributeValue";
import { ConditionRelations } from "../../../../../Helper/Condition/ConditionRelations";
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

	public constructor( attrAlias: string, public mode: ProductAttrFilterMode = ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS ) {
		this.attributeName = attrAlias;
	}

	public createFilter( attrValues: AttributeValueMulti, conditionRelationMode: string = ConditionRelations.AND ): ProductAttrFilteredValues {
		let filter = new ProductAttrFilteredValues( attrValues, conditionRelationMode );
		this.filters.push( filter );
		return filter;
	}

	// public function jsonSerialize()
	// {
	// 	$filters = array();
	// 	foreach ($this->filtersMap as $filteredValues)
	// 	{
	// 		$filter    = array(
	// 			"values"                    => $filteredValues->values,
	// 			"conditions"                => "$filteredValues->conditionBuilder",
	// 			"conditionsComplexityScore" => $filteredValues->conditionBuilder->calculateComplexityScore(),
	// 		);
	// 		$filters[] = $filter;
	// 	}

	// 	return $filters;
	// }

	public getAllFilters(): ProductAttrFilteredValues[] {
		return this.filters;
	}

	public getAttributeName(): string {
		return this.attributeName;
	}
}
