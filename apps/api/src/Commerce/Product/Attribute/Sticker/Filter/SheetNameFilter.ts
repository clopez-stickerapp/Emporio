import { ConditionOperators } from "../../../../../Helper/Condition/ConditionOperators";
import { ProductAttrFilter } from "../../../../Core/Product/Attribute/Filter/ProductAttrFilter";
import { ResellerAttribute } from "../../ResellerAttribute";
import { LaminateAttribute } from "../LaminateAttribute";
import { StickerSheetNameAttribute } from "../StickerSheetNameAttribute";

export class SheetNameFilter extends ProductAttrFilter {
	public constructor() {
		super( StickerSheetNameAttribute.ALIAS );

		this.createFilter( [
			StickerSheetNameAttribute.CONTOUR,
			StickerSheetNameAttribute.RECTANGLE,
			StickerSheetNameAttribute.ROUND,
			StickerSheetNameAttribute.ROUNDED,
			StickerSheetNameAttribute.MANUAL
		] );

		this.createFilter( [
			StickerSheetNameAttribute.ROUND,
			StickerSheetNameAttribute.ROUNDED,
		] )
			.conditionBuilder
			.addCondition( "item.attributes.reseller", ConditionOperators.EQUAL, ResellerAttribute.VALUE_STICKERAPP )
			.addCondition( "item.attributes.laminate", ConditionOperators.EQUAL, LaminateAttribute.EPOXY );
	}
}
