<?php

    namespace StickerApp\Babylon\Commerce\Core\Price;

    use StickerApp\Babylon\Commerce\Core\Product\Condition\ProductConditionBuilder;
    use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
    use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;

    /**
	 * Contains a list of quantities in the form of an array
     * of integers. A maximum minimum quantity needs to be
     * set to decide if the list has the appropriate quantities
     * to be shown in the price list.
	 */
    class QuantityList{

        protected string $name;
        protected int $minQuantity;
        protected array $quantities;
        public ProductConditionBuilder $conditions;

        public function __construct( string $name, array $quantities )
        {
            $this->name = $name;
            $this->quantities = $quantities;
            $this->conditions = new ProductConditionBuilder();
        }

        public static function create( string $name, array $quantities ): self
        {
            return new QuantityList( $name, $quantities );
        }

        public function setMinQuantity($minQuantity): self
        {
            $this->minQuantity = $minQuantity;
            return $this;
        }

        public function addCondition( string $columnName, string $operator, $conditionValue = NULL )
        {
            $this->conditions->addCondition( $columnName, $operator, $conditionValue );
            return $this;
        }

        public function getName() : string
        {
            return $this->name;
        }

        public function getQuantities() : array
        {
            return $this->quantities;
        }

        /**
         * Returns true if the chosen QuantityList is appropriate 
         * for the given minimum product quantity.
         *
         * @param int $minQuantity
         * @return boolean
         */
        public function testOnItem( ProductItem $productItem ) : bool
        {
            try {
                return $this->conditions->testOnItem($productItem);
            } catch (ConditionTestDataKeyNotFoundException $e) {
                return false;
            }
        }

        /**
         * Returns true if the chosen QuantityList is appropriate 
         * for the given minimum product quantity.
         *
         * @param int $minQuantity
         * @return boolean
         */
        public function test( int $minQuantity ) : bool
        {
            return $minQuantity >= $this->minQuantity;
        }

        /**
         * Sorts the quantity lists so the min quantities go from low to high. 
         *
         * @param QuantityList[] $quantityLists
         * @return void
         */
        public static function sortByMinQuantity( array &$quantityLists )
		{
			usort( $quantityLists, function($a, $b)
			{
				/** @var QuantityList $a
				 *  @var QuantityList $b */
				return $a->minQuantity < $b->minQuantity;
			});
		}
    }