import { ProductAttrIcon } from "./ProductAttrIcon";

export class ProductAttrIconCollection {
	protected collectionName: string;

	// The first string is the attribute name, the second string is the attribute value
	protected icons: Record<string, Record<string, ProductAttrIcon>> = {};

	public constructor(collectionName: string) {
		this.collectionName = collectionName;
	}

	public findIconFor(attributeName: string, attributeValue: string): string | null {
		if (this.icons[attributeName] && this.icons[attributeName][attributeValue]) {
			return this.icons[attributeName][attributeValue].getIconLink();
		}

		return null;
	}

	public addIcon(icon: ProductAttrIcon): void {
		if (this.icons[icon.getAttributeName()] && this.icons[icon.getAttributeName()][icon.getAttributeValue()]) {
			throw new Error(`Icon for ${icon.getAttributeName()} ${icon.getAttributeValue()} already exists.`);
		}

		this.icons[icon.getAttributeName()] = {};
		this.icons[icon.getAttributeName()][icon.getAttributeValue()] = icon;
	}

	public getIcons(): Record<string, Record<string, ProductAttrIcon>> {
		return this.icons;
	}

	public getCollectionName(): string {
		return this.collectionName;
	}
}
