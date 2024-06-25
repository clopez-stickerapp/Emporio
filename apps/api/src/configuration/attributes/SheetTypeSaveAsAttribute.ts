import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export const SheetTypeSaveAsAttribute = new ProductAttr({
	name: "sheet_type_save_as",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
});