import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductQuantityListCollection } from "$/prices/ProductQuantityListCollection";
import { QuantityList } from "$/prices/QuantityList";
import { ResellerValues } from "../attributes/ResellerAttribute";
import { LaminateValues } from "../attributes/LaminateAttribute";
import { ProductNames } from "$data/ConditionValueResolver";


export class StickerQuantityListCollection extends ProductQuantityListCollection{
	static readonly NAME = "sticker_quantity_lists";

	public constructor(){
		super(StickerQuantityListCollection.NAME);

		this.initDefaultQuantityLists();
		this.initConditionedQuantityLists();
	}

	public initDefaultQuantityLists(): void {
		this.addQuantityList( new QuantityList("smallQuantities", [
			1, 3, 5, 7, 10, 12, 15, 17, 20, 22, 25
		]).setMinQuantity(1));

		this.addQuantityList( new QuantityList("mediumQuantities", [
			10, 15, 25, 35, 45, 50, 65, 75, 100
		]).setMinQuantity(6));

		this.addQuantityList( new QuantityList("bigQuantities", [
			25, 50, 100, 200, 300, 500, 600, 900, 1200, 1500, 2000, 5000, 10000, 20000, 30000, 40000, 60000, 100000, 200000
		]).setMinQuantity(11));
	}

	public initConditionedQuantityLists(): void {
		this.addConditionedQuantityList( new QuantityList("sheets", [
			1, 3, 5, 10, 20, 40, 50, 60, 70, 80, 90, 100, 400, 1000
		])).conditions
		.addCondition({ attribute: "item.attributes.reseller", operator: ConditionOperators.NOT_IN, value: [ResellerValues.STICKIT]})
		.addCondition({ attribute: "item.productName", operator: ConditionOperators.EQUAL, value: ProductNames.PRODUCT_SHEET_LEGACY});

		this.addConditionedQuantityList( new QuantityList("individual_stickers", [
			1, 5, 10, 15, 25, 35, 45, 50, 65, 75, 100
		])).conditions
		.addCondition({ attribute: "item.productName", operator: ConditionOperators.EQUAL, value: ProductNames.PRODUCT_LIBRARY_DESIGN});

		this.addConditionedQuantityList( new QuantityList("epoxy 25x25", [
			80, 200, 300, 500, 1100, 2200, 3500, 4000, 5500
		])).conditions
		.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.EQUAL, value: LaminateValues.EPOXY})
		.addCondition({ attribute: "item.attributes.reseller", operator: ConditionOperators.NOT_IN, value: [ResellerValues.STICKERSTHATSTICK, ResellerValues.STICKIT]})
		.addCondition({ attribute: "item.attributes.width_mm", operator: ConditionOperators.EQUAL, value: 25})
		.addCondition({ attribute: "item.attributes.height_mm", operator: ConditionOperators.EQUAL, value: 25});


		this.addConditionedQuantityList( new QuantityList("epoxy 38x38", [
			40, 90, 140, 200, 500, 1000, 1500, 1700, 2400
		])).conditions
		.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.EQUAL, value: LaminateValues.EPOXY})
		.addCondition({ attribute: "item.attributes.reseller", operator: ConditionOperators.NOT_IN, value: [ResellerValues.STICKERSTHATSTICK, ResellerValues.STICKIT]})
		.addCondition({ attribute: "item.attributes.width_mm", operator: ConditionOperators.EQUAL, value: 38})
		.addCondition({ attribute: "item.attributes.height_mm", operator: ConditionOperators.EQUAL, value: 38});

		this.addConditionedQuantityList( new QuantityList("epoxy 51x25", [
			40, 100, 160, 240, 600, 1100, 1700, 2000, 2800
		])).conditions
		.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.EQUAL, value: LaminateValues.EPOXY})
		.addCondition({ attribute: "item.attributes.reseller", operator: ConditionOperators.NOT_IN, value: [ResellerValues.STICKERSTHATSTICK, ResellerValues.STICKIT]})
		.addCondition({ attribute: "item.attributes.width_mm", operator: ConditionOperators.EQUAL, value: 51})
		.addCondition({ attribute: "item.attributes.height_mm", operator: ConditionOperators.EQUAL, value: 25});

		this.addConditionedQuantityList( new QuantityList("epoxy 77x38", [
			20, 40, 70, 100, 250, 500, 750, 900, 1200
		])).conditions
		.addCondition({ attribute: "item.attributes.laminate", operator: ConditionOperators.EQUAL, value: LaminateValues.EPOXY})
		.addCondition({ attribute: "item.attributes.reseller", operator: ConditionOperators.NOT_IN, value: [ResellerValues.STICKERSTHATSTICK, ResellerValues.STICKIT]})
		.addCondition({ attribute: "item.attributes.width_mm", operator: ConditionOperators.GREATER_THAN_OR_EQUAL, value: 76})
		.addCondition({ attribute: "item.attributes.height_mm", operator: ConditionOperators.EQUAL, value: 38});
	}
}