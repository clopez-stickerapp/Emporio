export class ConditionOperatorNotAllowedException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ConditionOperatorNotAllowedException";
	}
}