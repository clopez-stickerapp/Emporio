export class ProductAttrValueTypeInvalidException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductAttrValueTypeInvalidException";
	}
}