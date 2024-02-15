export class ProductAttrNotFoundException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductAttrNotFoundException";
	}
}