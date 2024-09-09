import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const ImageFilterValues = {
	BRIGHTNESS_ADD_10: "brightness_add_10_filter",
	BRIGHTNESS_ADD_20: "brightness_add_20_filter",
	BRIGHTNESS_ADD_30: "brightness_add_30_filter",
	CONTRAST_ADD_10: "contrast_add_10_filter",
	CONTRAST_ADD_20: "contrast_add_20_filter",
	CYAN_REMOVE_5: "cyan_remove_5_filter",
	CYAN_REMOVE_7: "cyan_remove_7_filter",
	YELLOW_ADD_5: "yellow_add_5_filter",
	BLACK_ADD_20: "black_add_20_filter",
	CONVERT_SPOT_TO_CMYK: "convert_spot_to_cmyk_filter",
};

export const ImageFiltersAttribute = new ProductAttr({
	name: "image_filters",
	type: ProductAttrValueType.STRING,
	multivalue: true,
	values: Object.values( ImageFilterValues ),
});