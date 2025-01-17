import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const CutDirectionAttributeValues = {
	AUTO: "auto",
	RIGHT_FIRST: "right_first",
	LEFT_FIRST: "left_first",
	BOTTOM_FIRST: "bottom_first",
	TOP_FIRST: "top_first",
}

export const CutDirectionAttribute = new ProductAttr({
	name: "cut_direction",
	type: ProductAttrValueType.STRING,
	values: Object.values( CutDirectionAttributeValues )
});
