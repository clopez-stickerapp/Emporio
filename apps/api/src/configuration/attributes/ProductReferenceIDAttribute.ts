import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const ProductReferenceIDAttribute = new ProductAttr({
	name: "reference_id",
	type: ProductAttrValueType.STRING,
});