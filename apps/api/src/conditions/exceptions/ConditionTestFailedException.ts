export class ConditionTestFailedException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "ConditionTestFailedException";
	}
}