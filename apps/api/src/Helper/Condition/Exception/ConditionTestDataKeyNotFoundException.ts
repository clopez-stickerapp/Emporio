export class ConditionTestDataKeyNotFoundException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ConditionTestDataKeyNotFoundException";
	}
}