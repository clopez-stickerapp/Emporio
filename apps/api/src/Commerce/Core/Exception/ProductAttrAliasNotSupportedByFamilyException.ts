export class ProductAttrAliasNotSupportedByFamilyException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ProductAttrAliasNotSupportedByFamilyException";
	}
}