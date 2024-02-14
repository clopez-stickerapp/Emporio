<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Stock;

	use ErrorException;
	use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;
	use function array_key_exists;
	use function array_shift;
	use function krsort;
	use function var_dump;
	use const SORT_NUMERIC;

	class ProductAttrStockCollection
	{
		protected string $collectionName;
		/**
		 * @var ProductAttrStock[]
		 */
		protected array $stockMap = array();

		public function __construct( string $name )
		{
			$this->collectionName = $name;
		}

		public function addStock( ProductAttrStock $stock ): ProductAttrStock
		{
			return $this->stockMap[ $stock->attributeName ] = $stock;
		}

		public function getAllOutOfStock(): array
		{
			return $this->stockMap;
		}

		public function getOutOfStockFor( string $attrName ): ?ProductAttrStock
		{
			return $this->stockMap[ $attrName ] ?? null;
		}

		public function getCollectionName(): string
		{
			return $this->collectionName;
		}
	}
