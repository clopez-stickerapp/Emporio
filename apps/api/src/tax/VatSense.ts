export class VatSense
{
	public constructor( private _apiURL: string, private _apiKey: string ) {}

	/**
	 * Validates a VAT number.
	 * 
	 * @param vatNumber The VAT number to be validated.
	 * @returns A promise that resolves to a boolean indicating whether the VAT number is valid.
	 * @throws An error if the validation request fails, with a detailed error message.
	 */
	public async validateVATNumber( vatNumber: string ): Promise<boolean>
	{
		const response = await this._fetchWithAuthorization( `/validate?vat_number=${ vatNumber }` );

		return response.data.valid;
	}

	/**
	 * Retrieves the tax/vat rate for a country or province.
	 * 
	 * @param countryCode The country code for which the rate is requested.
	 * @param provinceCode The province code for which the rate is requested (optional).
	 * @returns A promise that resolves to a number representing the rate.
	 * @throws An error if the validation request fails, with a detailed error message.
	 */
	public async getRate( countryCode: string, provinceCode?: string ): Promise<number>
	{
		const params = new URLSearchParams( Object.fromEntries( Object.entries( {
			'country_code': countryCode,
			'province_code': provinceCode,
		} ).filter( ( [ _key, value ] ) => value !== undefined ) ) as Record<string, string> );

		const response = await this._fetchWithAuthorization( "/rates/rate?" + params.toString() );

		return response.data.tax_rate.rate;
	}

	private async _fetchWithAuthorization( endpoint: string, init?: RequestInit ): Promise<any>
	{
		const response = await fetch( this._apiURL + endpoint, {
			...init, 
			headers: { 
				...init?.headers, 
				'Authorization': `Basic ${ btoa( `user:${ this._apiKey }` ) }`,
			} 
		} )

		const json = await response.json();

		if ( response.ok && json.success )
		{
			return json;
		}

		throw new Error( `${ json.error.title } - ${ json.error.detail }` );
	}
}