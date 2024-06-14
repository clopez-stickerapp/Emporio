import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class ImageFiltersAttribute extends ProductAttr {
	public static readonly ALIAS = "image_filters";

	public constructor() {
		super( ProductAttrValueType.STRING, true );

		this.addAttrValue( "brightness_add_10_filter" );
		this.addAttrValue( "brightness_add_20_filter" );
		this.addAttrValue( "brightness_add_30_filter" );
		this.addAttrValue( "contrast_add_10_filter" );
		this.addAttrValue( "contrast_add_20_filter" );
		this.addAttrValue( "cyan_remove_5_filter" );
		this.addAttrValue( "cyan_remove_7_filter" );
		this.addAttrValue( "yellow_add_5_filter" );
		this.addAttrValue( "black_add_20_filter" );
		this.addAttrValue( "convert_spot_to_cmyk_filter" );
	}
}
