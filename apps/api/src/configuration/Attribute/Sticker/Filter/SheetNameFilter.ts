import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ResellerValues } from "../../../attributes/ResellerAttribute";
import { LaminateValues } from "../../../attributes/LaminateAttribute";
import { StickerSheetNameAttribute, StickerSheetNameValues } from "../../../attributes/StickerSheetNameAttribute";

export class SheetNameFilter extends ProductAttrFilter {
	public constructor() {
		super( StickerSheetNameAttribute.getName() );

		this.createFilter( [
			StickerSheetNameValues.CONTOUR,
			StickerSheetNameValues.RECTANGLE,
			StickerSheetNameValues.ROUND,
			StickerSheetNameValues.ROUNDED
		] );

		this.createFilter( [
			StickerSheetNameValues.ROUND,
			StickerSheetNameValues.ROUNDED,
		] )
			.conditionBuilder
			.addCondition( "item.attributes.reseller", ConditionOperators.EQUAL, ResellerValues.STICKERAPP )
			.addCondition( "item.attributes.laminate", ConditionOperators.EQUAL, LaminateValues.EPOXY );
	}
}
