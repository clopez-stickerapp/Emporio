import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const DeliverySheetHeightAttribute = new ProductAttr({
	name: "delivery_sheet_height",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});