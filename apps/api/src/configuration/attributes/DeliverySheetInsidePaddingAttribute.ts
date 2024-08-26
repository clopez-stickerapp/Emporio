import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const DeliverySheetInsidePaddingAttribute = new ProductAttr({
	name: "delivery_sheet_inside_padding",
	type: ProductAttrValueType.INT,
	dynamicvalue: true,
});