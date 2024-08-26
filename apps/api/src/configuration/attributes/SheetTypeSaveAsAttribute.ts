import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const SheetTypeSaveAsAttribute = new ProductAttr({
	name: "sheet_type_save_as",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});