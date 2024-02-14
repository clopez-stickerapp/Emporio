<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrContraintCollection;
use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollItemMarginAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliveryRollSizeTypeAttribute;

	class StickerProductionContraintCollection extends ProductAttrContraintCollection
	{
		const NAME = "sticker_production";

		public function __construct()
		{
			parent::__construct( self::NAME );

			$this->addConstraint( new FeatureConstraint() );
			$this->addConstraint( new LaminateConstraint() );
			$this->addConstraint( new MaterialConstraint() );
			$this->addConstraint( new ProductionLineConstraint() );
			// $this->addConstraint( new InkConstraint() );
			// $this->addConstraint( new MaxSizeConstraint() );
			// $this->addConstraint( new MinSizeConstraint() );
			$this->addConstraint( new ColorSupportedConstraint() );
			$this->addConstraint( new CutDirectionConstraint() );
			$this->addConstraint( new DeliveryRollSizeTypeConstraint() );
		}
	}
