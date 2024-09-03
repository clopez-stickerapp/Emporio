import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const ProductReferenceIDAttribute = new ProductAttr({
	name: "reference_id",
	type: ProductAttrValueType.STRING,
});