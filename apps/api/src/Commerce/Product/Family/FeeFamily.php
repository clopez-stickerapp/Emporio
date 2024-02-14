<?php

	namespace StickerApp\Babylon\Commerce\Product\Family;

use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\Product\ProductFamily;
	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Product\Attribute\DynamicStringAttr;
	use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SheetTypeAttribute;

	class FeeFamily extends ProductFamily
	{
		const NAME = "fee";

		const PRODUCT_CUSTOM_FEE = "custom_fee";

		public function __construct( ProductService $ps )
		{
			parent::__construct( self::NAME, 1, $ps );

			$this->requireAttr( SheetTypeAttribute::class, "sheet_type" );
			$this->requireAttr( DynamicStringAttr::class, "sheet_name" );
			$this->requireAttr( QuantityAttribute::class, "quantity" );


			$this->addProduct( self::PRODUCT_CUSTOM_FEE, "fee12" )
			     ->withAttrValue( "quantity", 1 )
			     ->withAttrValue( "sheet_name", "text" )
			     ->withAttrValue( "sheet_type", "text" );
		}

		public function validateUnits(ProductItem $productItem): bool
		{
			$productItem->setUnits(intval($productItem->getAttribute("quantity")));

			return true;
		}
	}
