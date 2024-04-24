<?php

	namespace StickerApp\Babylon\Commerce\Product\Family;

	use StickerApp\Babylon\Commerce\Core\Exception\ProductServiceException;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Icon\ProductAttrIconCollection;
	use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
	use StickerApp\Babylon\Commerce\Core\Product\ProductFamily;
	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Product\Attribute\ChangedAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ColorSupportedAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollItemMarginAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollSizeMMAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollSizeTypeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollTopEdgeMarginAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint\StickerProductionContraintCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\EpoxyTemplateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\FigureAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter\StickerWizardFilterCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\FixedQuantityAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\FixedSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\HeightAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ImageFiltersAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ImperialUnitsAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\MarketAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InnercutAsKisscutAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MinSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\NoteAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliveryAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetHeightAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetInsidePaddingAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetOutsidePaddingAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetWidthAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\OutlineAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\CutDirectionAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\PriceMarginPercentageAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionInstructionAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ReorderAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\StickerSheetNameAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SheetTypeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\SheetTypeSaveAsAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialColorAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\TemplateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InkAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeOtherSideAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Stock\StickerWizardStockCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\WhiteLayerAttribute;
  	use StickerApp\Babylon\Commerce\Product\Attribute\WidthAttribute;
	use StickerApp\Babylon\Commerce\Product\MinUnit\StickerSquareMeterMinimumUnitValues;
 	use StickerApp\Babylon\Commerce\Product\Price\StickerPriceProvider;
  	use StickerApp\Babylon\Commerce\Product\Price\StickerQuantityListCollection;

	class CustomStickerFamily extends ProductFamily
	{
		const NAME                       = "custom_sticker";
		const PRODUCT_DIE_CUT            = "die_cut";
        const SINGLE_ON_SHEET            = "single_on_sheet";
		const PRODUCT_SHEET              = "sheet";
		const PRODUCT_SHEET_KISS_CUT     = "sheet_kiss_cut";
		const PRODUCT_SHEET_LEGACY       = "sheet_legacy";
		const PRODUCT_HANG_TAG           = "hang_tag";
		const PRODUCT_3D_DOME            = "3d_dome";
		const PRODUCT_FRONT_ADHESIVE     = "front_adhesive";
		const PRODUCT_HEAVY_DUTY         = "heavy_duty";
		const PRODUCT_REMOVABLE          = "removable";
		const PRODUCT_WALL               = "wall";
		const PRODUCT_FLOOR              = "floor";
		const PRODUCT_LAPTOP_SKIN        = "laptop_skin";
		const PRODUCT_DOUBLE_SIDED       = "double_sided";
		const PRODUCT_LABELS_ON_SHEET    = "labels_on_sheet";
		const PRODUCT_LABELS_ON_ROLL     = "labels_on_roll";
		const PRODUCT_LIBRARY_DESIGN     = "library_design";
        const PRODUCT_TRANSFER_DECAL     = "transfer_decal";
        const PRODUCT_WINDOW             = "window";
        const DEFAULT_PRODUCT_SKU        = "102";

		public function __construct( ProductService $productService )
		{
			parent::__construct( self::NAME, 0.1215, $productService );

			$this->minimumUnitsValue = new StickerSquareMeterMinimumUnitValues();
			$this->relateConstraintCollection( StickerProductionContraintCollection::NAME );
			$this->relateFilterCollection( StickerWizardFilterCollection::NAME );
			$this->relateIconCollection( ProductAttrIconCollection::NAME );
      		$this->relateProductPriceProvider( StickerPriceProvider::NAME );
      		$this->relateProductQuantityListCollection( StickerQuantityListCollection::NAME );
			$this->relateStockCollection( StickerWizardStockCollection::NAME );

			$this->requireAttr(SheetTypeAttribute::class, SheetTypeAttribute::ALIAS);
			$this->requireAttr(StickerSheetNameAttribute::class, StickerSheetNameAttribute::ALIAS);
			$this->requireAttr(MaterialAttribute::class, MaterialAttribute::ALIAS);
			$this->requireAttr(LaminateAttribute::class, LaminateAttribute::ALIAS);
			$this->requireAttr(HeightAttribute::class, HeightAttribute::ALIAS);
			$this->requireAttr(WidthAttribute::class, WidthAttribute::ALIAS);
			$this->requireAttr(QuantityAttribute::class, QuantityAttribute::ALIAS);

			$this->supportAttr(PriceMarginPercentageAttribute::class, PriceMarginPercentageAttribute::ALIAS);
			$this->supportAttr(ChangedAttribute::class, ChangedAttribute::ALIAS);
			$this->supportAttr(FigureAttribute::class, FigureAttribute::ALIAS);
			$this->supportAttr(ReorderAttribute::class, ReorderAttribute::ALIAS);
			$this->supportAttr(NoteAttribute::class, NoteAttribute::ALIAS);
			$this->supportAttr(SheetTypeSaveAsAttribute::class, SheetTypeSaveAsAttribute::ALIAS);
			$this->supportAttr(TemplateAttribute::class, TemplateAttribute::ALIAS);
			$this->supportAttr(SizeAttribute::class, SizeAttribute::ALIAS);
			$this->supportAttr(ImperialUnitsAttribute::class, ImperialUnitsAttribute::ALIAS);
			$this->supportAttr(FeatureAttribute::class, FeatureAttribute::ALIAS);
			$this->supportAttr(ProductionLineAttribute::class, ProductionLineAttribute::ALIAS);
			$this->supportAttr(ProductionInstructionAttribute::class, ProductionInstructionAttribute::ALIAS);
			$this->supportAttr(DeliveryAttribute::class, DeliveryAttribute::ALIAS);
			$this->supportAttr(DeliverySheetWidthAttribute::class, DeliverySheetWidthAttribute::ALIAS);
			$this->supportAttr(DeliverySheetHeightAttribute::class, DeliverySheetHeightAttribute::ALIAS);
			$this->supportAttr(DeliverySheetInsidePaddingAttribute::class, DeliverySheetInsidePaddingAttribute::ALIAS);
			$this->supportAttr(DeliverySheetOutsidePaddingAttribute::class, DeliverySheetOutsidePaddingAttribute::ALIAS);
			$this->supportAttr(EpoxyTemplateAttribute::class, EpoxyTemplateAttribute::ALIAS);
			$this->supportAttr(InnercutAsKisscutAttribute::class, InnercutAsKisscutAttribute::ALIAS);
			$this->supportAttr(WhiteLayerAttribute::class, WhiteLayerAttribute::ALIAS);
			$this->supportAttr(CutDirectionAttribute::class, CutDirectionAttribute::ALIAS);
			$this->supportAttr(ImageFiltersAttribute::class, ImageFiltersAttribute::ALIAS);
			$this->supportAttr(OutlineAttribute::class, OutlineAttribute::ALIAS);
			$this->supportAttr(InkAttribute::class, InkAttribute::ALIAS);
			$this->supportAttr(ResellerAttribute::class, ResellerAttribute::ALIAS);
			$this->supportAttr(MaxSizeAttribute::class, MaxSizeAttribute::ALIAS);
			$this->supportAttr(MaxSizeOtherSideAttribute::class, MaxSizeOtherSideAttribute::ALIAS);
			$this->supportAttr(MinSizeAttribute::class, MinSizeAttribute::ALIAS);
			$this->supportAttr(FixedSizeAttribute::class, FixedSizeAttribute::ALIAS);
			$this->supportAttr(FixedQuantityAttribute::class, FixedQuantityAttribute::ALIAS);
			$this->supportAttr(MaterialColorAttribute::class, MaterialColorAttribute::ALIAS);
			$this->supportAttr(ColorSupportedAttribute::class, ColorSupportedAttribute::ALIAS);
			$this->supportAttr(MarketAttribute::class, MarketAttribute::ALIAS);
			$this->supportAttr(DeliveryRollSizeTypeAttribute::class, DeliveryRollSizeTypeAttribute::ALIAS);
			$this->supportAttr(DeliveryRollSizeMMAttribute::class, DeliveryRollSizeMMAttribute::ALIAS);
			$this->supportAttr(DeliveryRollTopEdgeMarginAttribute::class, DeliveryRollTopEdgeMarginAttribute::ALIAS);
			$this->supportAttr(DeliveryRollItemMarginAttribute::class, DeliveryRollItemMarginAttribute::ALIAS);


			/* Dummy example skus for now
			We should have some kind of SKU management system in place
			https://www.3p-logistics.co.uk/3pl-blog/guide-to-sku-management-ecommerce-best-practices/
			*/

			$this->addProduct( self::PRODUCT_DIE_CUT, 'DCRS-108' )
			     ->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::CONTOUR, false ) // TODO: Remove. Just while testing the sticker wizard to editor connection
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
				 ->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SINGLE )
				 ->setStock();

			$this->addProduct( self::PRODUCT_SHEET_LEGACY, 'SLSTS-108' )
			     ->withAttrValue( StickerSheetNameAttribute::ALIAS, array(
				     StickerSheetNameAttribute::SHEET,
				     StickerSheetNameAttribute::TEMPLATE,
                     StickerSheetNameAttribute::STICKER
			     ) )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SHEET )
				 ->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SINGLE )
				 ->setStock();

			$this->addProduct( self::PRODUCT_SHEET, 'SRR-108' )
			     ->withAttrValue( StickerSheetNameAttribute::ALIAS, array(
				     StickerSheetNameAttribute::RECTANGLE,
				    //  StickerSheetNameAttribute::ROUNDED // TODO: Disabled for now as they are not printing correctly.
			     ) )
				 ->withAttrValue( InnercutAsKisscutAttribute::ALIAS, "yes")
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SHEET )
				 ->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SINGLE )
				 ->setStock();

			$this->addProduct( self::PRODUCT_SHEET_KISS_CUT, 'SKCRR-108' )
				->withAttrValue( StickerSheetNameAttribute::ALIAS, array(
					StickerSheetNameAttribute::RECTANGLE
				) )
				->withAttrValue( InnercutAsKisscutAttribute::ALIAS, "yes")
				->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SHEET )
				->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SINGLE )
				->setStock();

			$this->addProduct( self::PRODUCT_LABELS_ON_SHEET, 'LOSSDS-108' )
				->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::CONTOUR, false)
				->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
				->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SHEET )
				->setStock();

			$this->addProduct( self::PRODUCT_LABELS_ON_ROLL, 'LORSDR-108' )
				->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::CONTOUR, false)
				->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
				->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_ROLL )
				->withAttrValue( CutDirectionAttribute::ALIAS, CutDirectionAttribute::RIGHT_FIRST, FALSE )
				->setStock();

			$this->addProduct( self::PRODUCT_HANG_TAG, 'HTSH-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
				 ->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::CONTOUR, FALSE)
			     ->withAttrValue( FeatureAttribute::ALIAS, array(FeatureAttribute::HANGTAGGING), TRUE, FALSE )
				 ->withAttrValue( NoteAttribute::ALIAS, NoteAttribute::HANG_TAG, FALSE, FALSE )
				 ->setStock();

			$this->addProduct( self::PRODUCT_3D_DOME, '3DDSRDSE-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
			     ->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::ROUND, FALSE )
				 ->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SHEET, FALSE )
                 ->withAttrValue( LaminateAttribute::ALIAS, LaminateAttribute::EPOXY )
				 ->setStock();

			$this->addProduct( self::PRODUCT_FRONT_ADHESIVE, 'FASC-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
			     ->withAttrValue( MaterialAttribute::ALIAS, MaterialAttribute::CLEAR )
				 ->withAttrValue( WhiteLayerAttribute::ALIAS, WhiteLayerAttribute::MANUALLY )
			     ->withAttrValue( LaminateAttribute::ALIAS, array(
				     LaminateAttribute::GLOSSY_UV
			     ) )
				 ->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::CONTOUR, FALSE)
				 ->withAttrValue( NoteAttribute::ALIAS, NoteAttribute::FRONT_ADHESIVE, FALSE, FALSE )
				 ->setStock();

			$this->addProduct( self::PRODUCT_HEAVY_DUTY, 'HDSWHTGUMHD-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE, FALSE )
				 ->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::CONTOUR, FALSE)
			     ->withAttrValue( MaterialAttribute::ALIAS, MaterialAttribute::WHITE_HI_TACK, FALSE )
			     ->withAttrValue( LaminateAttribute::ALIAS, LaminateAttribute::GLOSSY_UV_12_MIL_HEAVY_DUTY )
				 ->setStock();

			$this->addProduct( self::PRODUCT_REMOVABLE, 'RSWR-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
			     ->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::CONTOUR, FALSE)
			     ->withAttrValue( MaterialAttribute::ALIAS, MaterialAttribute::WHITE_REMOVABLE )
				 ->setStock();

			$this->addProduct( self::PRODUCT_WALL, 'WSUCWW-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE, FALSE )
				 ->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::CONTOUR, FALSE)
			     ->withAttrValue( LaminateAttribute::ALIAS, LaminateAttribute::UNCOATED, false )
			     ->withAttrValue( MaterialAttribute::ALIAS, MaterialAttribute::WHITE_WALL )
				 ->setStock();

			$this->addProduct( self::PRODUCT_FLOOR, 'FS-115' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
				 ->setStock();

			$this->addProduct( self::PRODUCT_LAPTOP_SKIN, 'LSSSS-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SKIN )
			     ->withAttrValue( MaterialAttribute::ALIAS, MaterialAttribute::SKIN )
			     ->withAttrValue( LaminateAttribute::ALIAS, LaminateAttribute::SANDY, FALSE )
				 ->setStock();

			// TODO: Is this a "double sided sticker"? With backpaper print?
			$this->addProduct( self::PRODUCT_DOUBLE_SIDED, 'DSS-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
				 ->setStock();

			$this->addProduct( self::PRODUCT_LIBRARY_DESIGN, 'LDSDSI-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
			     ->withAttrValue( StickerSheetNameAttribute::ALIAS, StickerSheetNameAttribute::STICKER_INDIVIDUAL )
				 ->setStock();

			$this->addProduct( self::PRODUCT_TRANSFER_DECAL, 'TDTTDSS-108' )
				->withAttrValue( FeatureAttribute::ALIAS, array(FeatureAttribute::TRANSFER_TAPE), TRUE, FALSE)
				->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SHEET, FALSE )
				->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE, FALSE )
				->setStock();

            $this->addProduct( self::PRODUCT_WINDOW, 'WS-108' )
			     ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
				 ->setStock();

            $this->addProduct( self::SINGLE_ON_SHEET, 'HSOS-80085' )
                 ->withAttrValue( SheetTypeAttribute::ALIAS, SheetTypeAttribute::SINGLE )
                 ->withAttrValue( DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SHEET )
				 ->setStock();

		}

		public function getMinimumQuantity(ProductItem $productItem): int
		{
			if ( $productItem->getAttribute( StickerSheetNameAttribute::ALIAS ) == StickerSheetNameAttribute::STICKER_INDIVIDUAL )
			{
				return 1;
			}

			$units = $this->calculateUnits($productItem);

			if($units == 0)
            {
                throw new ProductServiceException("Cannot get minimum quantity. Units is set to 0 on item:" . print_r($productItem, true));
            }

            $quantity = $productItem->getAttribute(QuantityAttribute::ALIAS);

            if($quantity == 0)
            {
                throw new ProductServiceException("Cannot get minimum quantity. Quantity is set to 0 on item:" . print_r($productItem, true));
            }

			$minUnits = $this->getMinimumUnits($productItem);

			return (int)ceil($minUnits / ($units / $quantity));
		}

		public function calculateUnits(ProductItem $productItem):float
		{
			$width_mm = intval($productItem->getAttribute(WidthAttribute::ALIAS));
            $height_mm = intval($productItem->getAttribute(HeightAttribute::ALIAS));
            $quantity = intval($productItem->getAttribute(QuantityAttribute::ALIAS));

            if(is_null($quantity) || $quantity <= 0)
            {
                $productItem->setAttribute(QuantityAttribute::ALIAS, 1);
                $quantity = 1;
            }

            if(empty($width_mm) || empty($height_mm))
            {
                return 0;
            }

			$square_mm = $width_mm * $height_mm * $quantity;
			$square_m = $square_mm / 1000000;

			return $square_m;
		}

        public function validateUnits(ProductItem $productItem): bool
		{
            $units = $this->calculateUnits($productItem);
			$minUnits = $this->getMinimumUnits($productItem);

			// Use minimum units if units is lower than minimum
			if($units < $minUnits && $productItem->getAttribute(StickerSheetNameAttribute::ALIAS) != StickerSheetNameAttribute::STICKER_INDIVIDUAL)
			{
				$productItem->setUnits($minUnits);
			}
			else
			{
				$productItem->setUnits($units);
			}

            return true;
        }

	}
