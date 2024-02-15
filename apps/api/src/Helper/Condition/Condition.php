<?php

	namespace StickerApp\Babylon\Helper\Condition;

	use StickerApp\Babylon\Helper\Condition\Exception\ConditionOperatorNotAllowedException;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestFailedException;
	use function array_diff;
	use function array_key_exists;
	use function debug_print_backtrace;
	use function in_array;
	use function is_array;
	use function is_null;
	use function is_string;
	use function json_encode;
	use function str_contains;
	use function stripos;
	use function var_export;

	class Condition implements ConditionTestableInterface
	{
		public string $columnName;
		public string $operator;
		/**
		 * @var int|string|number|array|bool|null
		 */
		public $conditionValue = NULL;

		/**
		 * @param string $columnName
		 * @param string $operator
		 * @param int|string|number|array|bool|null $conditionValue
		 *
		 * @throws ConditionTestFailedException
		 */
		public function __construct( string $columnName, string $operator, $conditionValue = NULL )
		{
			$this->columnName     = $columnName;
			$this->operator       = $operator;
			$this->conditionValue = $conditionValue;

			if ( !ConditionHelper::isOperatorAllowed( $operator ) )
			{
				throw new ConditionOperatorNotAllowedException( "Operator is not allowed: $operator" );
			}
		}

		public function test( array $data ): bool
		{
			$result = FALSE;

			if ( !array_key_exists( $this->columnName, $data ) )
			{
				if($this->operator != ConditionOperators::IS_EMPTY &&
				   $this->operator != ConditionOperators::NOT_IN)
				{
					throw new ConditionTestDataKeyNotFoundException( "Couldn't perform test because test data doesn't contain conditioned key: " . $this->columnName );
				}
			}

			$columnValue = array_key_exists( $this->columnName, $data ) ? $data[ $this->columnName ] : null;

			if ( $this->operator == ConditionOperators::IS_EMPTY )
			{
				return empty( $columnValue );
			}
			else if ( $this->operator == ConditionOperators::IS_NOT_EMPTY )
			{
				return !empty( $columnValue );
			}
			else
			{
				if ( $this->operator == ConditionOperators::IN || $this->operator == ConditionOperators::NOT_IN )
				{
					if ( is_array( $columnValue ) && !is_array( $this->conditionValue ) )
					{
						$result = $this->operator == ConditionOperators::NOT_IN ? !in_array( $this->conditionValue, $columnValue ) : in_array( $this->conditionValue, $columnValue );
					}
					else if ( is_array( $this->conditionValue ) && !is_array( $columnValue ) )
					{
						$result = $this->operator == ConditionOperators::NOT_IN ? !in_array( $columnValue, $this->conditionValue ) : in_array( $columnValue, $this->conditionValue );
					}
					else if ( is_array( $columnValue ) && is_array( $this->conditionValue ) )
					{
						$totals    = count( $this->conditionValue );
						$diff      = array_diff( $this->conditionValue, $columnValue );
						$diffCount = count( $diff );
						if ( $this->operator == ConditionOperators::NOT_IN )
						{
							return $totals == $diffCount;
						}
						else if ( $this->operator == ConditionOperators::IN )
						{
							return $diffCount < $totals;
						}
					}
					else if ( is_string( $columnValue ) && is_string( $this->conditionValue ) )
					{
						$result = $this->operator == ConditionOperators::NOT_IN ? stripos( $columnValue, $this->conditionValue ) === FALSE : stripos( $columnValue, $this->conditionValue ) !== FALSE;
					}
					else if ( $this->operator == ConditionOperators::NOT_IN && empty( $columnValue ) )
					{
						return TRUE;
					}
					else if ( $this->operator == ConditionOperators::IN && empty( $columnValue ) )
					{
						return FALSE;
					}
					else
					{
						$diff = NULL;
						if ( is_array( $columnValue ) && is_array( $this->conditionValue ) )
						{
							$diff = array_diff( $this->conditionValue, $columnValue );
						}
//						echo "<pre>";
//						var_export( array(
//							"columnName"     => $this->columnName,
//							"operator"       => $this->operator,
//							"conditionValue" => $this->conditionValue,
//							"data"           => $data,
//							"diff"           => $diff
//						) );
//						debug_print_backtrace();
//						echo "</pre>";
						throw new ConditionTestFailedException( "Trying to do CONTAINS in a special case that is not yet supported. $this ({$this->columnName} is " . var_export( $columnValue, TRUE ) . ")" );
					}
				}
				else
				{
					if ( ConditionHelper::isOperatorAllowed( $this->operator ) )
					{
						$eval = '$result = ' . var_export( $columnValue, TRUE ) . ' ' . $this->operator . ' ' . var_export( $this->conditionValue, TRUE ) . ';';
						eval( $eval );
					}
				}
			}

			return $result;
		}

		public function __toString()
		{
			$valueToString = json_encode( $this->conditionValue );

			switch ( $this->operator )
			{
				case ConditionOperators::IS_EMPTY:


					return "!\${{$this->columnName}}";
				case ConditionOperators::IS_NOT_EMPTY:


					return "!!\${{$this->columnName}}";
				case ConditionOperators::NOT_IN:

					return "this.isNotIn(\${{$this->columnName}}, $valueToString)";

					return "$valueToString.indexOf(\${{$this->columnName}}) < 0";

				case ConditionOperators::IN:

					return "this.isIn(\${{$this->columnName}}, $valueToString)";

					return "$valueToString.indexOf(\${{$this->columnName}}) >= 0";

				default:
					return "\${{$this->columnName}} $this->operator " . $valueToString;
			}
		}

		public function toArray(): array
		{
			return [
				"columnName"     => $this->columnName,
				"operator"       => $this->operator,
				"conditionValue" => $this->conditionValue
			];
		}

		public function fromArray( array $data ): void
		{
			$this->columnName     = $data[ 'columnName' ];
			$this->operator       = $data[ 'operator' ];
			$this->conditionValue = $data[ 'conditionValue' ];
		}
	}
