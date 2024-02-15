export class ProductAttrValueInvalidException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductAttrValueInvalidException";
	}
}