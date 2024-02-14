<?php

	namespace StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrContraintCollection;

	class PizzeriaConstraintsCollection extends ProductAttrContraintCollection
	{
		const NAME = "pizzeria_constraints";

		public function __construct()
		{
			parent::__construct( "pizzeria_constraints" );

			$this->addConstraint( new KitchenConstraint() );
			$this->addConstraint( new PortionConstraint() );
		}
	}
