import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class MaxSizeOtherSideAttribute extends ProductAttr {
	public static readonly ALIAS = "max_size_other_side_mm";

	public static readonly MAX_SIZE_OTHER_SIDE_ROLL = 275;
	public static readonly MAX_SIZE_OTHER_SIDE_WALL = 1100;

	public constructor() {
		super( ProductAttrValueType.INT, false, true );

		this.addAttrValue( MaxSizeOtherSideAttribute.MAX_SIZE_OTHER_SIDE_ROLL );
		this.addAttrValue( MaxSizeOtherSideAttribute.MAX_SIZE_OTHER_SIDE_WALL );
	}
}
