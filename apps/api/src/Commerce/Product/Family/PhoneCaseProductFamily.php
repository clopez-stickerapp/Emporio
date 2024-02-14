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
	use StickerApp\Babylon\Commerce\Product\Attribute\PhoneCase\CaseMaterialAttr;
	use StickerApp\Babylon\Commerce\Product\Attribute\PhoneCase\CaseSheetTypeAttr;
	use StickerApp\Babylon\Commerce\Product\Attribute\PriceMarginPercentageAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ReorderAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\SheetTypeSaveAsAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\TemplateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\WidthAttribute;

	class PhoneCaseProductFamily extends ProductFamily
	{
		const NAME                = "phone_case";
		const PRODUCT_CUSTOM_CASE = "custom_phone_case";

		public function __construct( ProductService $productService )
		{
			parent::__construct( self::NAME, 1, $productService );

			$this->requireAttr( CaseSheetTypeAttr::class, "sheet_type" );
			$this->requireAttr( DynamicStringAttr::class, "sheet_name" );
			$this->requireAttr( TemplateAttribute::class, "template_id" );
			$this->requireAttr( CaseMaterialAttr::class, "material" );
			$this->requireAttr( QuantityAttribute::class, "quantity" );

//			$this->supportAttr( FeatureAttribute::class, "feature" );
			$this->supportAttr( HeightAttribute::class, "height_mm" );
			$this->supportAttr( WidthAttribute::class, "width_mm" );
			$this->supportAttr( ImperialUnitsAttribute::class, "imperial_units" );
			$this->supportAttr( PriceMarginPercentageAttribute::class, "price_margin_percentage" );
			$this->supportAttr( ChangedAttribute::class, "changed" );
			$this->supportAttr( FigureAttribute::class, "figure_id" );
			$this->supportAttr( ReorderAttribute::class, "reorder" );
//			$this->supportAttr( NoteAttribute::class, "note" );
			$this->supportAttr( SheetTypeSaveAsAttribute::class, "sheet_type_save_as" );
//			$this->supportAttr( ProductionLineAttribute::class, "production_line" );
			$this->supportAttr( ResellerAttribute::class, "reseller" );
			$this->supportAttr( DynamicStringAttr::class, "laminate" ); // Fulfix. Shouldn't really support laminate. But have consequences when editor tries to validate the product item if removed.

			$this->addProduct( self::PRODUCT_CUSTOM_CASE, "c123" )
			     ->withAttrValue( "sheet_type", "case" );
		}

		public function validateUnits(ProductItem $productItem): bool
		{
			$productItem->setUnits(intval($productItem->getAttribute("quantity")));

			return true;
		}
	}
