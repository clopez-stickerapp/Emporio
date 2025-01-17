import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const NoteValues = {
	HANG_TAG: "Hang tag",
	FRONT_ADHESIVE: "Front adhesive",
};

export const NoteAttribute = new ProductAttr({
	name: "note",
	type: ProductAttrValueType.STRING,
	dynamicvalue: true,
	values: Object.values( NoteValues ),
});