<?php

	namespace StickerApp\Babylon\Commerce\Product\Helper;

	use ArrayObject;
	use StickerApp\Babylon\Commerce\Core\Exception\ProductNotFoundException;
	use StickerApp\Babylon\Commerce\Core\Product\Helper\ProductAttrMap;
	use StickerApp\Babylon\Commerce\Core\Product\Helper\ProductItemBuilder;
	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Product\Attribute\HeightAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\WidthAttribute;
	use StickerApp\Babylon\Commerce\Product\StickerFamilies;
	use function get_editor_model;

	class ProductWizardDataHelper extends ArrayObject
	{
		public function __construct( ProductService $ps, string $productName, string $lang )
		{
			$productItemBuilder = new ProductItemBuilder( $ps );
			$product            = $ps->findProduct( StickerFamilies::CUSTOM, $productName );

			if ( !$product )
			{
				throw new ProductNotFoundException( "Product not found.\nProduct type: custom_sticker \nProduct: $productName" );
			}

			$productItem                 = $productItemBuilder->createItem( StickerFamilies::CUSTOM, $productName, array(
				WidthAttribute::ALIAS => 10,
				HeightAttribute::ALIAS => 10,
			));

			get_editor_model()->prepareItem( $productItem, null,  $lang );
			$wizardData                  = array();
			$wizardData[ 'productItem' ] = $productItem;

			// TODO: 3D dome sticker shows materials that aren't supported.
			$wizardData[ 'attributes' ] = new ProductAttrMap( $ps, $product );
			$wizardData[ 'pricesAndQuantity' ] = get_editor_model()->getEditorSettingsVO()->quantityAndPriceOptions;

			parent::__construct( $wizardData );
		}
	}
