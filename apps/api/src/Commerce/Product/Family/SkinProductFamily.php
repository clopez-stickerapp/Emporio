<?php

	namespace StickerApp\Babylon\Commerce\Product\Family;

use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\Product\ProductFamily;
	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Product\Attribute\ChangedAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DynamicStringAttr;
	use StickerApp\Babylon\Commerce\Product\Attribute\FigureAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\HeightAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ImperialUnitsAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\PriceMarginPercentageAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ReorderAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\SheetTypeSaveAsAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Skin\Filter\SkinFilterCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint\StickerProductionContraintCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter\StickerWizardFilterCollection;
    use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SheetTypeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\TemplateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\WidthAttribute;
    use StickerApp\Babylon\Commerce\Product\Price\SkinPriceProvider;
    use StickerApp\Babylon\Commerce\Product\Price\StickerQuantityListCollection;

	class SkinProductFamily extends ProductFamily
	{
		const NAME                = "skin";
		const PRODUCT_CUSTOM_SKIN = "custom_skin";

		public function __construct( ProductService $productService )
		{
			parent::__construct( self::NAME, 1, $productService );

			$this->relateFilterCollection( SkinFilterCollection::NAME );
			// We reuse sticker constraints because skins are essentially a sticker
			$this->relateConstraintCollection( StickerProductionContraintCollection::NAME );
			$this->relateFilterCollection( StickerWizardFilterCollection::NAME );
			$this->relateProductPriceProvider( SkinPriceProvider::NAME );
            $this->relateProductQuantityListCollection( StickerQuantityListCollection::NAME );

			$this->requireAttr( SheetTypeAttribute::class, "sheet_type" );
			$this->requireAttr( DynamicStringAttr::class, "sheet_name" );
			$this->requireAttr( TemplateAttribute::class, "template_id" );
			$this->requireAttr( MaterialAttribute::class, "material" );
			$this->requireAttr( LaminateAttribute::class, "laminate" );
			$this->requireAttr( QuantityAttribute::class, "quantity" );

			$this->supportAttr( FeatureAttribute::class, "feature" );
			$this->supportAttr( HeightAttribute::class, "height_mm" );
			$this->supportAttr( WidthAttribute::class, "width_mm" );
			$this->supportAttr( ImperialUnitsAttribute::class, "imperial_units" );
			$this->supportAttr( PriceMarginPercentageAttribute::class, "price_margin_percentage" );
			$this->supportAttr( ChangedAttribute::class, "changed" );
			$this->supportAttr( FigureAttribute::class, "figure_id" );
			$this->supportAttr( ReorderAttribute::class, "reorder" );
//			$this->supportAttr( NoteAttribute::class, "note" );
			$this->supportAttr( SheetTypeSaveAsAttribute::class, "sheet_type_save_as" );
			$this->supportAttr( ProductionLineAttribute::class, "production_line" );
			$this->supportAttr( ResellerAttribute::class, "reseller" );

			$this->addProduct( self::PRODUCT_CUSTOM_SKIN, "CS-32" )
			     ->withAttrValue( "sheet_type", "skin" );
		}

		public function validateUnits(ProductItem $productItem): bool
		{
			$productItem->setUnits(intval($productItem->getAttribute("quantity")));

			return true;
		}
	}
