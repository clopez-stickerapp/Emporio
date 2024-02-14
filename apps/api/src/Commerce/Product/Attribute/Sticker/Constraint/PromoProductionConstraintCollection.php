<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrContraintCollection;

	class PromoProductionConstraintCollection extends ProductAttrContraintCollection
	{
		const NAME = "sticker_production";

		public function __construct()
		{
			parent::__construct( self::NAME );

			$this->addConstraint( new ProductionLineConstraint() );
		}
	}
