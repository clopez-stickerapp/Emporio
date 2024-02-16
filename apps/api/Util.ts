export class Util {
	public static isEmpty( value: any ): boolean {
		return value === null || value === undefined || value === "" || ( Array.isArray( value ) && value.length === 0 );
	}
}