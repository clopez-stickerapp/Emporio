export class ProductItemOutOfStockException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductItemOutOfStockException";
	}
}