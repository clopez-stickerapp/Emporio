import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const DeliverySheetWidthAttribute = new ProductAttr({
	name: "delivery_sheet_width",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});