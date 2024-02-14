<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint;

use ErrorException;
	use StickerApp\Babylon\Commerce\Core\Product\Condition\ProductConditionBuilder;
	use StickerApp\Babylon\Helper\Condition\ConditionRelations;
use StickerApp\Babylon\Util\ArrayUtil;

	use function array_key_exists;

	class ProductAttrConstraint
	{
		public string $attributeName;

		/**
		 * @var ProductConditionBuilder[]
		 */
		public array $constraints = array();

		public function __construct( string $attributeName )
		{
			$this->attributeName = $attributeName;
		}

		/**
		 * @param string|number|bool $attributeValue
		 * @param string $relationMode
		 *
		 * @return ProductConditionBuilder
		 * @throws ErrorException
		 */
		public function createConditionsFor( $attributeValue, string $relationMode = ConditionRelations::AND ): ProductConditionBuilder
		{
			if ( $this->constraints && array_key_exists( $attributeValue, $this->constraints ) )
			{
				// TODO: Custom exception
				throw new ErrorException( "Constraints already created for $attributeValue" );
			}

			return $this->constraints[ ArrayUtil::toIndexableKey($attributeValue) ] = new ProductConditionBuilder( $relationMode );
		}

		public function getConditionsFor( $attributeValue ): ?ProductConditionBuilder
		{
			if ( array_key_exists(  ArrayUtil::toIndexableKey($attributeValue), $this->constraints ) )
			{
				return $this->constraints[ ArrayUtil::toIndexableKey($attributeValue) ];
			}

			return NULL;
		}
	}
