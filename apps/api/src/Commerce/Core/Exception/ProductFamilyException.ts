export class ProductFamilyException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductFamilyException";
	}
}