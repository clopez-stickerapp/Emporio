<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Value;

    use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
    use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;
	use function array_key_exists;
	use function array_shift;
	use function krsort;
	use const SORT_NUMERIC;

	class ProductDynamicValue
	{
		public float $defaultValue;
		/**
		 * @var ProductConditionedValue[]
		 */
		public array $conditionedValues;

		function __construct( float $defaultValue )
		{
			$this->defaultValue      = $defaultValue;
			$this->conditionedValues = array();
		}

		public function addConditionedValue( float $value ): ProductConditionedValue
		{
			$conditionedValue          = new ProductConditionedValue( $value );
			$this->conditionedValues[] = $conditionedValue;

			return $conditionedValue;
		}

		public function getValue( ProductItem $productItem ): float
		{
			$result = array();
			foreach ( $this->conditionedValues as $conditionedValue )
			{
                try {
                    $testResult = $conditionedValue->conditionBuilder->testOnItem( $productItem );
                } catch (ConditionTestDataKeyNotFoundException $th) {
                    $testResult = false;
                }

				if ( $testResult === TRUE )
				{
					$complexityScore = $conditionedValue->calculateComplexityScore();
					while( array_key_exists( $complexityScore, $result ) )
					{
						$complexityScore ++;
					}

					$result[ $complexityScore ] = $conditionedValue->value;
				}
			}

			if ( count( $result ) )
			{
				krsort( $result, SORT_NUMERIC );

				return array_shift( $result );
			}

			return $this->defaultValue;
		}
	}
