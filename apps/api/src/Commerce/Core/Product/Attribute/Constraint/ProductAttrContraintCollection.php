<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint;

	use ErrorException;
	use StickerApp\Babylon\Commerce\Core\Product\Condition\ProductConditionBuilder;
	use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
	use function array_key_exists;

	class ProductAttrContraintCollection
	{
		protected string $collectionName;
		/**
		 * @var ProductAttrConstraint[]
		 */
		protected array $constraints = array();

		public function __construct( string $name )
		{
			$this->collectionName = $name;
		}

		/**
		 * @param string $attributeName
		 * @param string|bool|int|float|array $attributeValue
		 * @param ProductItem $againstItem
		 *
		 * @return bool|null
		 */
		public function test( string $attributeName, $attributeValue, ProductItem $againstItem ): ?bool
		{
			// TODO: Maybe throw exception instead of returning NULL?
			$conditionsBuilder = $this->findConditionsFor( $attributeName, $attributeValue );

			return $conditionsBuilder ? $conditionsBuilder->testOnItem( $againstItem ) : NULL;
		}

		/**
		 * @param string $attributeName
		 * @param string|bool|int|float|array $attributeValue
		 *
		 * @return ProductConditionBuilder|null
		 */
		public function findConditionsFor( string $attributeName, $attributeValue ): ?ProductConditionBuilder
		{
			if ( array_key_exists( $attributeName, $this->constraints ) )
			{
				$constraint = $this->constraints[ $attributeName ];

				return $constraint->getConditionsFor( $attributeValue );
			}

			return NULL;
		}

		public function addConstraint( ProductAttrConstraint $constraint ): ProductAttrConstraint
		{
			if ( array_key_exists( $constraint->attributeName, $this->constraints ) )
			{
				throw new ErrorException( "Constraints for $constraint->attributeName already exists." );
			}

			return $this->constraints[ $constraint->attributeName ] = $constraint;
		}

		public function getConstraints(): array
		{
			return $this->constraints;
		}

		public function getCollectionName(): string
		{
			return $this->collectionName;
		}
	}
