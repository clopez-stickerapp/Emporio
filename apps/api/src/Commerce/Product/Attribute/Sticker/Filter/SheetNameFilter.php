<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
    use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\StickerSheetNameAttribute;

	class SheetNameFilter extends ProductAttrFilter
	{
		public function __construct()
		{
			parent::__construct( StickerSheetNameAttribute::ALIAS );

			// Default
			$this->createFilter( array(
				StickerSheetNameAttribute::CONTOUR,
				StickerSheetNameAttribute::RECTANGLE,
				StickerSheetNameAttribute::ROUND,
				StickerSheetNameAttribute::ROUNDED,
				StickerSheetNameAttribute::MANUAL
			) );

			$this->createFilter( array(
				StickerSheetNameAttribute::ROUND,
				StickerSheetNameAttribute::ROUNDED,
				//				StickerSheetNameAttribute::CONTOUR,
				//				StickerSheetNameAttribute::RECTANGLE,
			) )
				->conditionBuilder
                ->addCondition( "item.attributes.reseller", "==", ResellerAttribute::VALUE_STICKERAPP )
				->addCondition( "item.attributes.laminate", "==", LaminateAttribute::EPOXY );
		}
	}
