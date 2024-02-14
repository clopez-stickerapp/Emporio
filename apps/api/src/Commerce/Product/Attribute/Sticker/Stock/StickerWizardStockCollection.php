<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Stock;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Stock\ProductAttrStockCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Stock\ProductAttrStock;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InkAttribute;

	class StickerWizardStockCollection extends ProductAttrStockCollection
	{
		const NAME = "sticker_wizard_stock";

		public function __construct()
		{
			parent::__construct( self::NAME );

			$this->addStock( new ProductAttrStock(  MaterialAttribute::ALIAS, MaterialAttribute::OUT_OF_STOCK ) );
			$this->addStock( new ProductAttrStock(  LaminateAttribute::ALIAS, LaminateAttribute::OUT_OF_STOCK ) );
			$this->addStock( new ProductAttrStock(  FeatureAttribute::ALIAS, FeatureAttribute::OUT_OF_STOCK ) );
			$this->addStock( new ProductAttrStock(  InkAttribute::ALIAS, InkAttribute::OUT_OF_STOCK ) );
		}
	}
