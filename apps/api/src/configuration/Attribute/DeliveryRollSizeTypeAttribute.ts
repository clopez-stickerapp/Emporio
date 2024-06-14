import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliveryRollSizeTypeAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_roll_size_type";

	public static readonly ROLL_SIZE_MIN     = 32;
	public static readonly ROLL_SIZE_SMALL   = 35;
	public static readonly ROLL_SIZE_MEDIUM  = 56;
	public static readonly ROLL_SIZE_LARGE   = 70;
	public static readonly ROLL_SIZE_XLARGE  = 93;
	public static readonly ROLL_SIZE_XXLARGE = 140;
	public static readonly ROLL_SIZE_MAX     = 280;

	public static readonly ROLL_SIZE_NAMES = {
		"small": DeliveryRollSizeTypeAttribute.ROLL_SIZE_SMALL,
		"medium": DeliveryRollSizeTypeAttribute.ROLL_SIZE_MEDIUM,
		"large": DeliveryRollSizeTypeAttribute.ROLL_SIZE_LARGE,
		"xlarge": DeliveryRollSizeTypeAttribute.ROLL_SIZE_XLARGE,
		"xxlarge": DeliveryRollSizeTypeAttribute.ROLL_SIZE_XXLARGE,
		"full_width": DeliveryRollSizeTypeAttribute.ROLL_SIZE_MAX,
	};

	public constructor() {
		super( ProductAttrValueType.INT, false, true );

		for ( const size of DeliveryRollSizeTypeAttribute.getSizes() ) {
			this.addAttrValue( size );
		}
	}

	public static getSizes(): number[] {
		return Object.values( DeliveryRollSizeTypeAttribute.ROLL_SIZE_NAMES );
	}
}
