export class ConditionSubGroupNotFoundException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ConditionSubGroupNotFoundException";
	}
}