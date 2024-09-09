import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const DeliveryRollTopEdgeMarginDefault = 2;

export const DeliveryRollTopEdgeMarginAttribute = new ProductAttr({
	name: "delivery_roll_top_edge_margin",
	type: ProductAttrValueType.FLOAT,
	dynamicvalue: true,
});