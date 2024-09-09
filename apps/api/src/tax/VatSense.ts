type SuccessResponse<T, V extends string> = {
    success: true;
} & {
    [key in V]: T;
};

type ErrorResponse = {
	success: false;
	message: string
}

type VatSenseResponse<T, V extends string> = SuccessResponse<T, V> | ErrorResponse;

export class VatSense
{
	public constructor( private _apiURL: string, private _apiKey: string ) {}

	/**
	 * Validates a VAT number.
	 * 
	 * @param vatNumber The VAT number to validate.
	 * @returns A promise that resolves to whether the VAT number is valid, or an error message.
	 */
	public async validate( vatNumber: string ): Promise<VatSenseResponse<boolean, 'valid'>>
	{
		const response = await this._fetchWithAuthorization( `/validate?vat_number=${ vatNumber }` );

		return response.success ? { 
			'success': response.success, 
			'valid': response.data.valid 
		} : response;
	}

	/**
	 * Retrieves the VAT rate for a country or province.
	 * 
	 * @param countryCode The country code.
	 * @param provinceCode The province code (optional).
	 * @returns A promise that resolves to the VAT rate, or an error message.
	 */
	public async getRate( countryCode: string, provinceCode?: string ): Promise<VatSenseResponse<number, 'rate'>>
	{
		const params = new URLSearchParams( {
			...{ country_code: countryCode },
			...( provinceCode && { province_code: provinceCode } ),
		} );

		const response = await this._fetchWithAuthorization( "/rates/rate?" + params.toString() );

		return response.success ? { 
			'success': response.success, 
			'rate': response.data.tax_rate.rate
		} : response;
	}

	private async _fetchWithAuthorization( endpoint: string, init?: RequestInit ): Promise<VatSenseResponse<any, 'data'>>
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
			return {
				'success': true,
				'data': json.data
			}
		}

		return {
			'success': false,
			'message': `${ json.error.title } - ${ json.error.detail }`
		}
	}
}