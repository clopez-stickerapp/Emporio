<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Item\Processor;

	use StickerApp\Babylon\Commerce\Core\Product\Helper\ProductAttrComputer;
	use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;

	class ProductItemProcessorCollection
	{
		protected string $collectionName;
		/**
		 * @var ProductItemProcessor[]
		 */
		protected array $processors = array();

		public function __construct( string $name )
		{
			$this->collectionName = $name;
		}

		public function process( ProductItem &$item, ProductAttrComputer $attrComputer )
		{
			foreach ( $this->processors as $processor )
			{
				if ( $processor->shouldProcess( $item ) )
				{
					$processor->process( $item, $attrComputer );
				}
			}
		}

		public function getCollectionName(): string
		{
			return $this->collectionName;
		}
	}
