<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class ImageFiltersAttribute extends ProductAttr
	{
		const ALIAS = "image_filters";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, TRUE, FALSE );

			$this->addAttrValue( "brightness_add_10_filter" );
			$this->addAttrValue( "brightness_add_20_filter" );
			$this->addAttrValue( "brightness_add_30_filter" );
			$this->addAttrValue( "contrast_add_10_filter" );
			$this->addAttrValue( "contrast_add_20_filter" );
			$this->addAttrValue( "cyan_remove_5_filter" );
			$this->addAttrValue( "cyan_remove_7_filter" );
			$this->addAttrValue( "yellow_add_5_filter" );
			$this->addAttrValue( "black_add_20_filter" );
			$this->addAttrValue( "convert_spot_to_cmyk_filter" );
		}
	}
