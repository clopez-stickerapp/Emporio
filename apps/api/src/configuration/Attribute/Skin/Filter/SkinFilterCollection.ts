import { ProductAttrFilterCollection } from "$/product/attribute/Filter/ProductAttrFilterCollection";
import { LaminateFilter } from "../../Sticker/Filter/LaminateFilter";
import { MaterialFilter } from "../../Sticker/Filter/MaterialFilter";

export class SkinFilterCollection extends ProductAttrFilterCollection {
	public static readonly NAME = "skin_filter";

	public constructor() {
		super( SkinFilterCollection.NAME );

		// Reuse the filters that is used for stickers
		this.addFilter( new MaterialFilter() );
		this.addFilter( new LaminateFilter() );
	}
}
