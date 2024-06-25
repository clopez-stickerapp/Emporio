import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionRelations } from "$/conditions/ConditionRelations";
import { CustomStickerFamily } from "$/configuration/Family/CustomStickerFamily";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { LaminateValues } from "../../../attributes/LaminateAttribute";
import { MaterialValues } from "../../../attributes/MaterialAttribute";
import { SizeAttribute } from "../../../attributes/SizeAttribute";

export class SizeFilter extends ProductAttrFilter {
	public constructor() {
		super( SizeAttribute.getName() );

		this.createDefaultSizeOptions();
		this.createLegacySheetSizeOptions();
		this.createEpoxySizeOptions();
		this.createWallAndFloorSizeOptions();
		this.createSheetSizeOptions();
		this.createKissCutSheetSizeOptions();
	}

	protected createDefaultSizeOptions(): void {
		// Metric units
		this.createFilter( [
			"5x3 cm",
			"5x5 cm",
			"8x5 cm",
			"8x8 cm",
			"10x7 cm",
			"10x10 cm",
			"12x5 cm",
			"13x7 cm",
			"15x10 cm"
		] );

		// Imperial units
		const imperialDefaultFilter = this.createFilter( [
			"2\" x 1\"",
			"2\" x 2\"",
			"3\" x 2\"",
			"3\" x 3\"",
			"4\" x 3\"",
			"4\" x 4\"",
			"5\" x 2\"",
			"5\" x 3\"",
			"8\" x 4\""
		] );

		imperialDefaultFilter.conditionBuilder.addCondition( "item.attributes.imperial_units", ConditionOperators.EQUAL, true );
	}

	protected createLegacySheetSizeOptions(): void {
		// Metric units
		this.createFilter( [
			"30x20 cm"
		] )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET_LEGACY );

		// Imperial units
		const imperialDefaultFilter = this.createFilter( [
			"11.8\" x 7.9\""
		] );

		imperialDefaultFilter.conditionBuilder
			.addCondition( "item.attributes.imperial_units", ConditionOperators.EQUAL, true )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET_LEGACY );
	}

	protected createEpoxySizeOptions(): void {
		// Metric units
		this.createFilter( [
			"2.5x2.5 cm",
			"3.8x3.8 cm",
			"5.1x2.5 cm",
			"7.7x3.8 cm"
		] )
			.conditionBuilder
			.addCondition( "item.attributes.laminate", ConditionOperators.EQUAL, LaminateValues.EPOXY );
			
		// Imperial units
		const imperialEpoxyFilter = this.createFilter( [
			"1\" x 1\"",
			"1.5\" x 1.5\"",
			"2\" x 1\"",
			"3\" x 1.5\""
		] );
		
		imperialEpoxyFilter.conditionBuilder
			.addCondition( "item.attributes.laminate", ConditionOperators.EQUAL, LaminateValues.EPOXY )
			.addCondition( "item.attributes.imperial_units", ConditionOperators.EQUAL, true );
	}

	protected createWallAndFloorSizeOptions(): void {
		// Metric units
		this.createFilter( [
			"30x15 cm",
			"40x20 cm",
			"60x25 cm",
			"80x40 cm",
			"100x70 cm",
			"120x80 cm"
		] )
			.conditionBuilder
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.WHITE_WALL )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_WALL )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_FLOOR );

		// Imperial units
		const imperial = this.createFilter( [
			"14\" x 7\"",
			"16\" x 10\"",
			"20\" x 10\"",
			"30\" x 20\"",
			"40\" x 20\"",
			"46\" x 25\""
		] );

		imperial.conditionBuilder
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.WHITE_WALL )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_WALL )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_FLOOR );
		
		imperial.conditionBuilder
			.addSubGroup( ConditionRelations.OR )
			.addCondition( "item.attributes.imperial_units", ConditionOperators.EQUAL, true );
	}

	protected createSheetSizeOptions(): void {
		const imperial = this.createFilter( [
			"US half letter <br> 8.5 x 5.5\"",
			"A5 paper <br> 5.8 x 8.3\"",
			"Thank you card <br> 5.1 x 6.4\""
		] );

		imperial.conditionBuilder
			.addCondition( "item.attributes.imperial_units", ConditionOperators.EQUAL, true )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET );

		const metric = this.createFilter( [
			"21.6x14 cm",
			"14.8x21 cm",
			"13x16.3 cm"
		] );

		metric.conditionBuilder
			.addCondition( "item.attributes.imperial_units", ConditionOperators.EQUAL, false )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET );
	}

	protected createKissCutSheetSizeOptions(): void {
		const imperial = this.createFilter( [
			"3\" x 4\"",
			"3.5\" x 5\""
		] );

		imperial.conditionBuilder
			.addCondition( "item.attributes.imperial_units", ConditionOperators.EQUAL, true )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET_KISS_CUT );

		const metric = this.createFilter( [
			"7.6x10.1 cm",
			"8.9x12.7 cm"
		] );

		metric.conditionBuilder
			.addCondition( "item.attributes.imperial_units", ConditionOperators.EQUAL, false )
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET_KISS_CUT );
	}
}
