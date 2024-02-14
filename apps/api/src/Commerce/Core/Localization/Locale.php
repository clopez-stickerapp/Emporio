<?php

	namespace StickerApp\Babylon\Commerce\Core\Localization;

    use Exception;

	class Locale
	{
		private static $localeCodes = array(
			"us" => "en-US",
			"se" => "sv-SE", 
			"dk" => "da-DK",
			"uk" => "en-GB",
			"de" => "de-DE",
			"no" => "nn-NO",
			"nl" => "nl-NL",
			"fi" => "fi-FI",
			"it" => "it-IT",
			"fr" => "fr-FR",
			"jp" => "jp-JP",
			"es" => "es-ES",
			"pt" => "pt-PT",
			"pl" => "pl-PL"
		);

        private static $currencies = array(
            "us" => "USD",
            "se" => "SEK",
			"dk" => "DKK",
			"uk" => "GBP",
			"de" => "EUR",
			"no" => "NOK",
			"nl" => "EUR",
			"fi" => "EUR",
			"it" => "EUR",
			"fr" => "EUR",
			"jp" => "JPY",
			"es" => "EUR",
			"pt" => "EUR",
			"pl" => "PLN"
        );

		/**
		 * Returns the combined language and locale code 
		 * for use in the NumberFormatter for formatting
		 * prices to the specific locale.
		 *
		 * @param string $lang
		 * @return string
		 * @throws Exception
		 */
		public static function getLocale( string $market ): string
		{
			if( isset(self::$localeCodes[$market]) )
			{
				return self::$localeCodes[$market];
			}
			else
			{
				throw new Exception("No language code exists for lang: $market.");
			}
		}

        public static function getCurrency( string $market ): string
        {
            if( isset(self::$currencies[$market]) )
			{
				return self::$currencies[$market];
			}
			else
			{
				throw new Exception("No currency code exists for lang: $market.");
			}
        }
	}