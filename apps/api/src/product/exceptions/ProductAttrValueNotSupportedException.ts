export class ProductAttrValueNotSupportedException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductAttrValueNotSupportedException";
	}
}