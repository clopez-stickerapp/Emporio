<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;

	class KitchenConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( "cuisine" );

			$this->createConditionsFor( "neopolitan" )
			     ->addCondition( "item.attributes.ingredient", "NOT IN", "pineapple" );
		}
	}
