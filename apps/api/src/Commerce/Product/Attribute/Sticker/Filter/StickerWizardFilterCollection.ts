import { ProductAttrFilterCollection } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilterCollection";
import { DeliveryFilter } from "./DeliveryFilter";
import { DeliveryRollSizeTypeFilter } from "./DeliveryRollSizeTypeFilter";
import { FeatureFilter } from "./FeatureFilter";
import { FixedQuantityFilter } from "./FixedQuantityFilter";
import { FixedSizeFilter } from "./FixedSizeFilter";
import { InkFilter } from "./InkFilter";
import { LaminateFilter } from "./LaminateFilter";
import { MaterialFilter } from "./MaterialFilter";
import { MaxSizeFilter } from "./MaxSizeFilter";
import { MaxSizeOtherSideFilter } from "./MaxSizeOtherSideFilter";
import { MinSizeFilter } from "./MinSizeFilter";
import { ProductionLineFilter } from "./ProductionLineFilter";
import { SheetNameFilter } from "./SheetNameFilter";
import { SizeFilter } from "./SizeFilter";

export class StickerWizardFilterCollection extends ProductAttrFilterCollection {
	public static readonly NAME = "sticker_wizard_filters";

	public constructor() {
		super( StickerWizardFilterCollection.NAME );

		this.addFilter( new LaminateFilter() );
		this.addFilter( new MaterialFilter() );
		this.addFilter( new SizeFilter() );
		this.addFilter( new MinSizeFilter() );
		this.addFilter( new MaxSizeFilter() );
		this.addFilter( new MaxSizeOtherSideFilter() );
		this.addFilter( new FixedSizeFilter() );
		this.addFilter( new FixedQuantityFilter() );
		this.addFilter( new SheetNameFilter() );
		this.addFilter( new ProductionLineFilter() );
		this.addFilter( new FeatureFilter() );
		this.addFilter( new DeliveryFilter() );
		this.addFilter( new InkFilter() );
		this.addFilter( new DeliveryRollSizeTypeFilter() );
	}
}
