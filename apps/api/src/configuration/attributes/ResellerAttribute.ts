import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const ResellerValues = {
	STICKERAPP: "stickerapp",
	STICKERSTHATSTICK: "stickersthatstick",
	STICKIT: "stickit",
};

export const ResellerAttribute = new ProductAttr({
	name: "reseller",
	type: ProductAttrValueType.STRING,
	values: Object.values( ResellerValues ),
});
