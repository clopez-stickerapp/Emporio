import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const CutDirectionAttributeValues = {
	AUTO: "auto",
	BOTTOM_FIRST: "bottom_first",
	TOP_FIRST: "top_first",
	LEFT_FIRST: "left_first",
	RIGHT_FIRST: "right_first"
}

export const CutDirectionAttribute = new ProductAttr({
	name: "cut_direction",
	type: ProductAttrValueType.STRING,
	values: [
		CutDirectionAttributeValues.AUTO,
		CutDirectionAttributeValues.BOTTOM_FIRST,
		CutDirectionAttributeValues.TOP_FIRST,
		CutDirectionAttributeValues.LEFT_FIRST,
		CutDirectionAttributeValues.RIGHT_FIRST,
	],
});
