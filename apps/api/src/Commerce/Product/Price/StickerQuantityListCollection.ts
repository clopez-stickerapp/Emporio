import { ConditionOperators } from "../../../Helper/Condition/ConditionOperators";
import { ProductQuantityListCollection } from "../../Core/Price/ProductQuantityListCollection";
import { QuantityList } from "../../Core/Price/QuantityList";
import { ResellerAttribute } from "../Attribute/ResellerAttribute";
import { LaminateAttribute } from "../Attribute/Sticker/LaminateAttribute";
import { CustomStickerFamily } from "../Family/CustomStickerFamily";


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
		.addCondition("item.attributes.reseller", ConditionOperators.NOT_IN, [ResellerAttribute.VALUE_STICKIT])
		.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_SHEET_LEGACY);

		this.addConditionedQuantityList( new QuantityList("individual_stickers", [
			1, 5, 10, 15, 25, 35, 45, 50, 65, 75, 100
		])).conditions
		.addCondition("item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_LIBRARY_DESIGN);

		this.addConditionedQuantityList( new QuantityList("epoxy 25x25", [
			80, 200, 300, 500, 1100, 2200, 3500, 4000, 5500
		])).conditions
		.addCondition("item.attributes.laminate", ConditionOperators.EQUAL, LaminateAttribute.EPOXY)
		.addCondition("item.attributes.reseller", ConditionOperators.NOT_IN, [ResellerAttribute.VALUE_STICKERSTHATSTICK, ResellerAttribute.VALUE_STICKIT])
		.addCondition("item.attributes.width_mm", ConditionOperators.EQUAL, 25)
		.addCondition("item.attributes.height_mm", ConditionOperators.EQUAL, 25);


		this.addConditionedQuantityList( new QuantityList("epoxy 38x38", [
			40, 90, 140, 200, 500, 1000, 1500, 1700, 2400
		])).conditions
		.addCondition("item.attributes.laminate", ConditionOperators.EQUAL, LaminateAttribute.EPOXY)
		.addCondition("item.attributes.reseller", ConditionOperators.NOT_IN, [ResellerAttribute.VALUE_STICKERSTHATSTICK, ResellerAttribute.VALUE_STICKIT])
		.addCondition("item.attributes.width_mm", ConditionOperators.EQUAL, 38)
		.addCondition("item.attributes.height_mm", ConditionOperators.EQUAL, 38);

		this.addConditionedQuantityList( new QuantityList("epoxy 51x25", [
			40, 100, 160, 240, 600, 1100, 1700, 2000, 2800
		])).conditions
		.addCondition("item.attributes.laminate", ConditionOperators.EQUAL, LaminateAttribute.EPOXY)
		.addCondition("item.attributes.reseller", ConditionOperators.NOT_IN, [ResellerAttribute.VALUE_STICKERSTHATSTICK, ResellerAttribute.VALUE_STICKIT])
		.addCondition("item.attributes.width_mm", ConditionOperators.EQUAL, 51)
		.addCondition("item.attributes.height_mm", ConditionOperators.EQUAL, 25);

		this.addConditionedQuantityList( new QuantityList("epoxy 77x38", [
			20, 40, 70, 100, 250, 500, 750, 900, 1200
		])).conditions
		.addCondition("item.attributes.laminate", ConditionOperators.EQUAL, LaminateAttribute.EPOXY)
		.addCondition("item.attributes.reseller", ConditionOperators.NOT_IN, [ResellerAttribute.VALUE_STICKERSTHATSTICK, ResellerAttribute.VALUE_STICKIT])
		.addCondition("item.attributes.width_mm", ConditionOperators.GREATER_THAN_OR_EQUAL, 76)
		.addCondition("item.attributes.height_mm", ConditionOperators.EQUAL, 38);
	}
}