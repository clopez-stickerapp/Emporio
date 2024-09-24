import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { FilterConfig } from "$/configuration/interface/FilterConfig";
import { AttributeValueMulti, ProductAttrFilterMode } from "@stickerapp-org/nomisma";
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

	public constructor( config: FilterConfig ) {
		this.attributeName = config.name;
		this.mode = config.mode;

		config.rules.forEach( ( rule, i ) => {
			this.addFilter( rule.name ?? `${ config.name }_filter_${ i }`, rule.keys, rule.conditions );
		} );
	}

	public addFilter( name: string, attrValues: AttributeValueMulti, config: ConditionBuilderConfig ): ProductAttrFilteredValues {
		const filter = new ProductAttrFilteredValues( name, attrValues, config );
		this.filters.push( filter );
		return filter;
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