import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

export const MarketValues = {
	US: "us",
	SE: "se",
	DK: "dk",
	UK: "uk",
	DE: "de",
	NO: "no",
	NL: "nl",
	FI: "fi",
	IT: "it",
	FR: "fr",
	JP: "jp",
	ES: "es",
	PT: "pt",
	PL: "pl",
};

export const MarketAttribute = new ProductAttr({
	name: "market",
	type: ProductAttrValueType.STRING,
	values: Object.values( MarketValues ),
});