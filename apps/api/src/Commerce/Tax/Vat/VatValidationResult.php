<?php
	namespace StickerApp\Babylon\Commerce\Tax\Vat;

	/*
	 * Represents the result of validating
	 * a VAT number in our VAT_model.
	 * Use this if you are implementing a new
	 * VAT validation service á la VatSense.
	 */
	class VatValidationResult
	{
		const KEY_VALID 			= 'valid';
		const KEY_ERROR 			= 'error';
		const KEY_VAT_NUMBER 		= 'vatNumber';
		const KEY_COUNTRY_CODE 		= 'countryCode';
		const ERROR_DATABASE_DOWN 	= 'database_down';

		/**
		 * @var bool
		 */
		private $_valid;
		/**
		 * @var string
		 */
		private $_error;
		private $_vatNumber;
		private $_countryCode;

		// constructor that takes VAT number as string
		public function __construct( $vatNumber )
		{
			$this->_vatNumber   = $vatNumber;
			$this->_countryCode = substr( strtolower( $vatNumber ), 0, 2 );
			$this->_valid 		= false;
			$this->_error 		= '';
		}

		/**
		 * @return bool
		 */
		public function getValid(): bool
		{
			return $this->_valid;
		}

		/**
		 * @param bool $valid
		 */
		public function setValid( $valid )
		{
			$this->_valid = $valid;
		}

		/**
		 * @return string
		 */
		public function getError(): string
		{
			return $this->_error;
		}

		/**
		 * @param string $error
		 */
		public function setError( $error )
		{
			$this->_error = $error;
		}
		
		/**
		 * @return string
		 */
		public function getVatNumber(): string
		{
			return $this->_vatNumber;
		}

		/**
		 * @param string $vatNumber
		 */
		public function setVatNumber( $vatNumber ): void
		{
			$this->_vatNumber = $vatNumber;
		}

		/**
		 * @return string
		 */
		public function getCountryCode(): string
		{
			return $this->_countryCode;
		}

		/**
		 * @param string $countryCode
		 */
		public function setCountryCode( $countryCode ): void
		{
			$this->_countryCode = $countryCode;
		}

		public function toArray(): array
		{
			return array(
				self::KEY_VALID 		=> $this->_valid,
				self::KEY_ERROR			=> $this->_error,
				self::KEY_VAT_NUMBER 	=> $this->_vatNumber,
				self::KEY_COUNTRY_CODE	=> $this->_countryCode
			);
		}
	}