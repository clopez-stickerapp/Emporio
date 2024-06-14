export class ProductAttrNotSupportedException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductAttrNotSupportedException";
	}
}