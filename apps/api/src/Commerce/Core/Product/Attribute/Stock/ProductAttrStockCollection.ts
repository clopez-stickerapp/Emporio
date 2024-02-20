import { ProductAttrStock } from "./ProductAttrStock";

export class ProductAttrStockCollection {
	protected stocks: Record<string, ProductAttrStock> = {};

	public constructor( protected collectionName: string ) {}

	public addStock( stock: ProductAttrStock ): ProductAttrStock {
		return this.stocks[ stock.getAttributeName() ] = stock;
	}

	public getAllOutOfStock(): Record<string, ProductAttrStock> {
		return this.stocks;
	}

	public getOutOfStockFor( attrName: string ): ProductAttrStock | null {
		return this.stocks[ attrName ] ?? null;
	}

	public getCollectionName(): string {
		return this.collectionName;
	}
}
