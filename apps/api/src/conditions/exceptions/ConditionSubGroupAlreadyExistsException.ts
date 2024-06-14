export class ConditionSubGroupAlreadyExistsException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ConditionSubGroupAlreadyExistsException";
	}
}