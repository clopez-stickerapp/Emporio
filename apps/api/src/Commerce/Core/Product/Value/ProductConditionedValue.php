<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Value;

    use StickerApp\Babylon\Commerce\Core\Product\Condition\ProductConditionBuilder;
	use StickerApp\Babylon\Helper\Condition\ConditionTestableInterface;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;

	class ProductConditionedValue implements ConditionTestableInterface
	{
		public float                   $value;
		public ProductConditionBuilder $conditionBuilder;

		function __construct( float $defaultValue )
		{
			$this->value = $defaultValue;

			$this->conditionBuilder = new ProductConditionBuilder();
		}

		public function calculateComplexityScore(): int
		{
			return $this->conditionBuilder->calculateComplexityScore();
		}

		public function test( array $data ): bool
		{
			try
			{
				$result = $this->conditionBuilder->test( $data );
			}
			catch( ConditionTestDataKeyNotFoundException $exception )
			{
				// Ignore this error
			}

			return $result ?? FALSE;
		}

		public function toArray(): array
		{
			return [];
		}

		public function fromArray( array $data ): void
		{
		}
	}
