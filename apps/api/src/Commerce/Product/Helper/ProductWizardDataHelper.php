<?php

	namespace StickerApp\Babylon\Commerce\Product\Helper;

	use ArrayObject;
	use StickerApp\Babylon\Commerce\Core\Exception\ProductNotFoundException;
	use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\StickerFamilies;
	use function get_editor_model;

	class ProductWizardDataHelper extends ArrayObject
	{
		public function __construct( ProductService $ps, Array $params)
		{
			$productName = $params['productName'];
			
			$product = $ps->findProduct( StickerFamilies::CUSTOM, $productName );

			if ( !$product )
			{
				throw new ProductNotFoundException( "Product not found.\nProduct type: custom_sticker \nProduct: $productName" );
			}

			$productItem = get_product_model()->createItem(StickerFamilies::CUSTOM, $productName);
			if($params['material']) {
				$productItem->setAttribute( MaterialAttribute::ALIAS, $params['material'] );
			}

			get_editor_model()->prepareItem($productItem, null,  $params['lang']);
			$wizardData                  = array();
			$wizardData[ 'productItem' ] = $productItem;
			$wizardData[ 'validProduct' ] = get_product_model()->validate( $productItem, true, true )->isValid();
			$wizardData[ 'price' ] = get_product_model()->calculatePrice($productItem, $params['lang'], $params['showVat']);

			// TODO: 3D dome sticker shows materials that aren't supported.
			$wizardData[ 'attributes' ] = get_product_model()->getAttributeMap( 'custom_sticker', $productName );
			$wizardData[ 'pricesAndQuantity' ] = get_product_model()->getPriceList($productItem, $params['lang'], $params['showVat']);

			parent::__construct( $wizardData );
		}
	}
