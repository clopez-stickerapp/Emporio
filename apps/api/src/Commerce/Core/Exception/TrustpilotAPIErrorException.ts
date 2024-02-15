export class TrustpilotAPIErrorException extends Error {
	public constructor( message: string ) {
		super( message );
		this.name = "TrustpilotAPIErrorException";
	}
}