export class ProductAttrException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductAttrException";
	}
}