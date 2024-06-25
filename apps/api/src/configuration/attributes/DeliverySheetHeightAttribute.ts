import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const DeliverySheetHeightAttribute = new ProductAttr({
	name: "delivery_sheet_height",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});