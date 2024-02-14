<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;

	class PortionConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( "portion" );

			$this->createConditionsFor( "family" )
			     ->addCondition( "item.attributes.cuisine", "!=", "neopolitan" );
		}
	}
