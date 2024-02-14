<?php

namespace StickerApp\Babylon\Commerce\Tax\Vat\VatService;

use Language;
use StickerApp\Babylon\Commerce\Tax\Vat\VatService;
use StickerApp\Babylon\Commerce\Tax\Vat\VatValidationResult;

/**
 * 200 - OK								Everything worked as expected.
 * 400 - Bad Request					The request was unacceptable, often due to missing a required parameter.
 * 401 - Unauthorized					No valid API key provided.
 * 402 - Request Failed					The parameters were valid but the request failed.
 * 404 - Not Found						The requested resource doesn't exist.
 * 409 - Conflict						The request conflicts with another request (perhaps due to using the same idempotent key).
 * 412 - VIES Service Unavailable		The EU VIES service is temporarily unavailable. Please try again later.
 * 429 - Too Many Requests				Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.
 * 500, 502, 503, 504 - Server Errors	Something went wrong on our end. (These are rare.)
 */
class VatSense implements VatService
{
    private string $_apiUrl;
    private string $_apiKey;

    const KEY_CODE      = "code";
    const KEY_DATA      = "data";
    const KEY_DETAIL    = "detail";
    const KEY_ERROR     = "error";
    const KEY_SUCCESS   = "success";
    const KEY_TITLE     = "title";
    const KEY_VALID     = "valid";
    
    public function __construct( string $apiUrl, string $apiKey )
    {
        $this->_apiUrl = $apiUrl;
        $this->_apiKey = $apiKey;
    }

    public function validate( string $vatNumber ): VatValidationResult
    {
        $ch = curl_init();
        
        // set curl options
        curl_setopt( $ch, CURLOPT_URL, $this->_apiUrl . "/validate?vat_number=" . $vatNumber );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json') );
        curl_setopt( $ch, CURLOPT_USERPWD, 'user:' . $this->_apiKey );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $ch, CURLOPT_TIMEOUT, 10 );
        
        $response = curl_exec($ch);
        
        curl_close($ch);
        
        $result = new VatValidationResult( $vatNumber );
        if( !$response ) 
        {
            $result->setError( VatValidationResult::ERROR_DATABASE_DOWN );
            return $result;
        }
        
        $response = json_decode( $response, true );
        if( $response[ self::KEY_SUCCESS ] === TRUE ) {
            $result->setValid( $response[ self::KEY_DATA ][ self::KEY_VALID ] );
        } else {
            if( $response[ self::KEY_CODE ] === 412 )
            {
                $result->setError( VatValidationResult::ERROR_DATABASE_DOWN );
            } else {
                $result->setError( $response[ self::KEY_ERROR ][ self::KEY_TITLE ] . " - " . $response[ self::KEY_ERROR ][ self::KEY_DETAIL ] );
            }
        }
        return $result;
    }
}