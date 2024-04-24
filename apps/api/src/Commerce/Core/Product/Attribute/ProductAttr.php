<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrException;
	use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrValueInvalidException;
	use StickerApp\Babylon\Commerce\Core\Exception\ProductAttrValueTypeInvalidException;
	use StickerApp\Babylon\Helper\Condition\Condition;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;
	use function array_merge;
	use function array_pop;
	use function array_push;
	use function debug_print_backtrace;
	use function filter_var;
	use function intval;
	use function is_array;
	use function is_bool;
	use function is_float;
	use function is_int;
	use function is_null;
	use function is_string;
	use function var_export;
	use const FILTER_NULL_ON_FAILURE;
	use const FILTER_VALIDATE_BOOL;
	use const FILTER_VALIDATE_BOOLEAN;

	class ProductAttr
	{
		protected string $name;
		protected string $valueType;
		protected bool   $multiValue;
		protected bool   $dynamicValue = FALSE;
		protected array $supportedTypes = array(
			ProductAttrValueTypes::STRING,
			ProductAttrValueTypes::FLOAT,
			ProductAttrValueTypes::BOOL,
			ProductAttrValueTypes::INT,
		);
		/**
		 * @var ProductAttrValue[]
		 */
		protected array $values = array();

		public function __construct( string $valueType, bool $multiValue = FALSE, bool $dynamicValue = FALSE )
		{
			if ($valueType === ProductAttrValueTypes::BOOL && $multiValue)
			{
				throw new ProductAttrException( "Boolean type can not be multivalue.");
			}
			
			if ( !in_array($valueType, $this->supportedTypes) )
			{
				throw new ProductAttrValueTypeInvalidException( "Value type is not supported: " . var_export( $valueType, TRUE ) );
			}
			$this->valueType    = $valueType;
			$this->multiValue   = $multiValue;
			$this->dynamicValue = $dynamicValue;
		}

		/**
		 * Value always represent a single value.
		 *
		 * @param int|string|float|bool $value Supported value types.
		 *
		 * @return ProductAttrValue
		 * @throws ProductAttrValueTypeInvalidException
		 * @see ProductAttrValueTypes
		 *
		 */
		public function addAttrValue( $value ): ProductAttrValue
		{
			$this->testValueType( $value, TRUE );
			$productAttrValue = new ProductAttrValue( $value );
			$productAttrValue->setAttr( $this );
			$this->values[] = $productAttrValue;

			return $productAttrValue;
		}

		public function getAttrValue( $value ): ?ProductAttrValue
		{
			if ( is_array( $value ) )
			{
				throw new ProductAttrException( "Value can not be array for this attribute: " . $this->getUID() );
			}
			if ( is_bool( $value ) )
			{
				$value = var_export( $value, TRUE );
			}

			foreach ( $this->values as $attrValue )
			{
				if ( $attrValue->getValue() == $value )
				{
					return $attrValue;
				}
			}

			return NULL;
		}

		/**
		 * A simple check if the value exists and the value has correct value type.
		 */
		public function canBe( $value, bool $skipMultiValue = FALSE ): bool
		{
			if ( empty( $value ) )
			{
				return FALSE;
			}

			if ( !$skipMultiValue && $this->multiValue )
			{
				if ( !is_array( $value ) && !is_null( $value ) )
				{
					throw new ProductAttrValueInvalidException( "Product attr value is not a mutli value." );
				}
				else
				{
					foreach ( $value as $nestedValue )
					{
						$this->canBe( $nestedValue, TRUE );
					}
				}
			}
			else
			{
				if ( !$this->getAttrValue( $value ) && !$this->isDynamicValue() )
				{
					if ( is_bool( $value ) && $this->getValueType() != ProductAttrValueTypes::BOOL )
					{
						throw new ProductAttrValueInvalidException( "Product attr value not found: " . var_export( $value, TRUE ) . " (for {$this->getUID()})" );
					}
				}

				$this->testValueType( $value, $skipMultiValue );
			}

			return TRUE;
		}

		public function testValueType( $value, bool $skipMultiValue = FALSE ): bool
		{
			$result = FALSE;

			if ( !$skipMultiValue && $this->multiValue )
			{
				if ( is_array( $value ) )
				{
					foreach ( $value as $nestedValue )
					{
						$result = $this->testValueType( $nestedValue, TRUE );
					}
				}
			}
			else
			{
				switch ( $this->valueType )
				{
					case ProductAttrValueTypes::INT:

						if ( is_string( $value ) )
						{
							if ( intval( $value ) == $value )
							{
								$value = intval( $value );
							}
						}

						$result = is_int( $value ) && !is_float( $value );

						break;

					case ProductAttrValueTypes::STRING:

						$result = is_string( $value );

						break;
					case ProductAttrValueTypes::BOOL:

						if ( is_string( $value ) )
						{
							$value = filter_var( $value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE );
						}

						$result = is_bool( $value );

						break;

					case ProductAttrValueTypes::FLOAT:

						if ( is_numeric( $value ) )
						{
							$value = floatval( $value );
						}

						$result = is_float( $value ) || is_int( $value );

						break;
				}
			}

			if ( !$result )
			{
				throw new ProductAttrValueTypeInvalidException( "Product attr value type is not valid. " . var_export( $value, TRUE ) . " should be " . $this->valueType . " ({$this->getUID()})" );
			}

			return $result;
		}

		public function getName(): string
		{
			return $this->name;
		}

		/**
		 * @return ProductAttrValue[]
		 */
		public function getValues(): array
		{
			return $this->values;
		}

		public function isDynamicValue(): bool
		{
			return $this->dynamicValue;
		}

		public function setDynamicValue( bool $dynamicValue ): void
		{
			$this->dynamicValue = $dynamicValue;
		}

		public function isMultiValue(): bool
		{
			return $this->multiValue;
		}

		public function getValueType(): string
		{
			return $this->valueType;
		}

		final public function getUID(): string
		{
			return get_class( $this );
		}

	}
