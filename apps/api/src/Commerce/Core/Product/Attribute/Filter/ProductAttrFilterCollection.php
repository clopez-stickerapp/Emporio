<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter;

	use ErrorException;
	use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
	use StickerApp\Babylon\Helper\Condition\Exception\ConditionTestDataKeyNotFoundException;
	use function array_key_exists;
	use function array_shift;
	use function krsort;
	use function var_dump;
	use const SORT_NUMERIC;

	class ProductAttrFilterCollection
	{
		protected string $collectionName;
		/**
		 * @var ProductAttrFilter[]
		 */
		protected array $filters = array();

		public function __construct( string $name )
		{
			$this->collectionName = $name;
		}

		public function addFilter( ProductAttrFilter $filter ): ProductAttrFilter
		{
			if ( array_key_exists( $filter->attributeName, $this->filters ) )
			{
				throw new ErrorException( "Constraints for $filter->attributeName already exists." );
			}

			return $this->filters[ $filter->attributeName ] = $filter;
		}

		public function getFilterFor( string $attributeName ): ?ProductAttrFilter
		{
			if ( array_key_exists( $attributeName, $this->filters ) )
			{
				return $this->filters[ $attributeName ];
			}

			return NULL;
		}

		public function getFilters(): array
		{
			return $this->filters;
		}

		public function getCollectionName(): string
		{
			return $this->collectionName;
		}
	}
