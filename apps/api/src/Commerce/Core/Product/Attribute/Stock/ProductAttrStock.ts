/**
 * This should show which of the chosen attribute's values is "in stock",
 * if it is orderable because we have it in the warehouse, 
 * if the related machine works etc.
 */
export class ProductAttrStock {
	public constructor( 
		private attributeName: string, 
		private outOfStock: string[] = [] 
	) {}

	public isOutOfStock( attrValue: string ): boolean {
		return this.getOutOfStock().includes( attrValue );
	}

	public getOutOfStock(): string[] {
		return this.outOfStock;
	}

	public getAttributeName(): string {
		return this.attributeName;
	}
}
