<?php

	namespace StickerApp\Babylon\Commerce\Core\Currency;

    use NumberFormatter;
    use StickerApp\Babylon\Commerce\Core\Exception\ProductServiceException;

	class Currency{
		
		private static array $conversionRates = array(
			"USD" => 1,
			"SEK" => 9.897,
			"DKK" => 8.253,
			"GBP" => 0.793,
			"NOK" => 9.002,
			"EUR" => 1.103,
			"JPY" => 1.50537,
			"PLN" => 4.050
		);

        private static array $decimals = array(
            "USD" => 2,
			"SEK" => 2,
			"DKK" => 2,
			"GBP" => 2,
			"NOK" => 2,
			"EUR" => 2,
			"JPY" => 0,
			"PLN" => 2
        );

        private static array $langToCurrency = array(
			'us' => "USD",
			'se' => "SEK",
			'dk' => "DKK",
			'uk' => "GBP",
			'no' => "NOK",
			'es' => "EUR",
			'de' => "EUR",
			'pt' => "EUR",
			'fr' => "EUR",
			'it' => "EUR",
			'nl' => "EUR",
			'fi' => "EUR",
			'jp' => "JPY",
			'pl' => "PLN"
		);

        /**
         * @param int|float $value
         * @param string $market
         * @return void
         */
        public static function format($value, string $currency, string $locale)
        {
            if ($value != 0 && $value < 1 && $currency != "EUR")
            {
                $value = round($value*100);
                switch($currency){
                    case "SEK":
                        $format = "$value öre";
                        break;

                    case "NOK":
                    case "DKK":
                        $format = "$value øre";
                        break;

                    case "GBP":
                        $format = "$value"."p";
                        break;

                    case "PLN":
                        $format = "$value gr";
                        break;

                    default:
                        $format = "$value"."¢";
                        break;
                }

                return $format;
            }
            
            if(strpos( $value, "." ))
            {
                $decimals = 2;
            }

            $res = new NumberFormatter($locale, NumberFormatter::CURRENCY);
            $res->setAttribute(NumberFormatter::MAX_FRACTION_DIGITS, $decimals ?? 0);
			return $res->formatCurrency( $value, $currency );
        }

        public static function format_array(array $values, string $currency, string $locale)
        {
            $result = array();
            foreach ($values as $key => $value) {
                $result[$key] = static::format($value, $currency, $locale);
            }
            return $result;
        }

		/**
		 * Converts the specified rate to a currency.
		 *
		 * @param float $value
		 * @param string $currency
		 * @throws ProductServiceException
		 * @return float
		 */
		public static function rateToCurrency( float $value, string $currency ): float
		{
			if( isset(self::$conversionRates[$currency]) )
			{
				return $value * self::$conversionRates[$currency];
			}
			else
			{
				throw new ProductServiceException("No conversion rate exists for currency: $currency.");
			}
		}

        public static function toMajorUnits( float $value, string $currency ): float
        {
            if( isset(self::$decimals[$currency]) )
			{
				return $value / ( 10 ** self::$decimals[$currency] );
			}
			else
			{
				throw new ProductServiceException("No minor unit specified for currency: $currency.");
			}
        }

        public static function getDecimals( string $currency )
        {
            if( isset(self::$decimals[$currency]) )
			{
				return self::$decimals[$currency];
			}
			else
			{
				throw new ProductServiceException("No decimals specified for currency: $currency.");
			}            
        }

        public static function langToCurrency( string $lang ) : string
        {
            return self::$langToCurrency[$lang];
        }
	}