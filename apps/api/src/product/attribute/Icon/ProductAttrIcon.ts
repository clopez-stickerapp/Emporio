export class ProductAttrIcon {
	private attributeName: string;
	private attributeValue: string;
	private iconLink: string;

	public constructor(attributeName: string, attributeValue: string, link: string){
		this.attributeName = attributeName;
		this.attributeValue = attributeValue;
		this.iconLink = link;
	}

	public getAttributeName(): string {
		return this.attributeName;
	}

	public getAttributeValue(): string {
		return this.attributeValue;
	}

	public getIconLink(): string {
		return this.iconLink;
	}
}