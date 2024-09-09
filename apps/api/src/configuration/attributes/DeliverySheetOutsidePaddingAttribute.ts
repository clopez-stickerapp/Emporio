import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const DeliverySheetOutsidePaddingAttribute = new ProductAttr({
	name: "delivery_sheet_outside_padding",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});