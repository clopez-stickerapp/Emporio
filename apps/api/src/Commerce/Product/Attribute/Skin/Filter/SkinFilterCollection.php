<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Skin\Filter;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilterCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter\LaminateFilter;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter\MaterialFilter;

	class SkinFilterCollection extends ProductAttrFilterCollection
	{
		const NAME = "skin_filter";

		public function __construct()
		{
			parent::__construct( self::NAME );

			// Reuse the filters that is used for stickers
			$this->addFilter( new MaterialFilter() );
			$this->addFilter( new LaminateFilter() );
		}
	}
