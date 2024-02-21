import { ProductAttrFilter } from "./ProductAttrFilter";

export class ProductAttrFilterCollection {
	protected filters: Record<string, ProductAttrFilter> = {};

	public constructor( protected collectionName: string ) {}

	public addFilter( filter: ProductAttrFilter ): ProductAttrFilter {
		if ( filter.getAttributeName() in this.filters ) {
			throw new Error( `Filters for ${ filter.getAttributeName() } already exists.` );
		}

		return this.filters[ filter.getAttributeName() ] = filter;
	}

	public getFilterFor( attributeName: string ): ProductAttrFilter | null {
		return attributeName in this.filters ? this.filters[ attributeName ] : null;
	}

	public getFilters(): Record<string, ProductAttrFilter> {
		return this.filters;
	}

	public getCollectionName(): string {
		return this.collectionName;
	}
}
