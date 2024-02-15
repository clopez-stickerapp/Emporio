export class CartItemNotFoundErrorException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "CartItemNotFoundErrorException";
	}
}