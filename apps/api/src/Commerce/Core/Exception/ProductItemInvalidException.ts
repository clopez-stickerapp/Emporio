export class ProductItemInvalidException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductItemInvalidException";
	}
}