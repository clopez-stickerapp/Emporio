<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilterCollection;

	class StickerWizardFilterCollection extends ProductAttrFilterCollection
	{
		const NAME = "sticker_wizard_filters";

		public function __construct()
		{
			parent::__construct( self::NAME );

			$this->addFilter( new LaminateFilter() );
			$this->addFilter( new MaterialFilter() );
			$this->addFilter( new SizeFilter() );
			$this->addFilter( new MinSizeFilter() );
			$this->addFilter( new MaxSizeFilter() );
			$this->addFilter( new MaxSizeOtherSideFilter() );
			$this->addFilter( new FixedSizeFilter() );
			$this->addFilter( new FixedQuantityFilter() );
			$this->addFilter( new SheetNameFilter() );
			$this->addFilter( new ProductionLineFilter() );
			$this->addFilter( new FeatureFilter() );
			$this->addFilter( new DeliveryFilter() );
			$this->addFilter( new InkFilter() );
			$this->addFilter( new DeliveryRollSizeTypeFilter() );
		}
	}
