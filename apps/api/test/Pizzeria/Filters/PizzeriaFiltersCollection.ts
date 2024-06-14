import { ProductAttrFilterCollection } from "$/product/attribute/Filter/ProductAttrFilterCollection";
import { CrustFilter } from "./CrustFilter";

export class PizzeriaFilterCollection extends ProductAttrFilterCollection {
	public static readonly NAME = "pizzeria_filter";

	public constructor() {
		super( PizzeriaFilterCollection.NAME );

		this.addFilter( new CrustFilter() );
	}
}
