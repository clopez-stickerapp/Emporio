import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const InnercutAsKisscutAttribute = new ProductAttr({
	name: "innercut_as_kisscut",
	type: ProductAttrValueType.STRING,
	values: ["no", "yes"],
});