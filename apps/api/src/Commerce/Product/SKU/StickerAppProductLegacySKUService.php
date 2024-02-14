<?php

	namespace StickerApp\Babylon\Commerce\Product\SKU;

	use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
	use StickerApp\Babylon\Commerce\Core\Product\Value\ProductDynamicValue;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;

	/**
	 * TODO: STOP USING THIS APPROACH.
	 * This is bad practice. It's setup for backwards compatibility but should be discontinued.
	 * We shouldn't define SKUs based on materials.
	 */
	class StickerAppProductLegacySKUService
	{
		protected ProductDynamicValue $skuValue;

		public function __construct()
		{
			$this->skuValue = new ProductDynamicValue( 0 );

			$this->skuValue->addConditionedValue( 101 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::HOLOGRAPHIC );

			$this->skuValue->addConditionedValue( 102 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::WHITE );

			$this->skuValue->addConditionedValue( 103 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::WHITE_HI_TACK );

			$this->skuValue->addConditionedValue( 104 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::MIRROR );

			$this->skuValue->addConditionedValue( 105 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::KRAFT_PAPER );

			$this->skuValue->addConditionedValue( 106 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::BRUSHED_ALLOY );

			$this->skuValue->addConditionedValue( 107 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::PRISMATIC );

			$this->skuValue->addConditionedValue( 108 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::CLEAR );

			$this->skuValue->addConditionedValue( 109 )
				->conditionBuilder
				->addCondition( "item.attributes.laminate", "==", LaminateAttribute::SOFT_TOUCH );

			$this->skuValue->addConditionedValue( 110 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::GLITTER );

			$epoxy = $this->skuValue->addConditionedValue( 112 )
				->conditionBuilder
				->addCondition( "item.attributes.laminate", "==", LaminateAttribute::EPOXY );
			$epoxy->setBaseComplexityScore( 1000 );

			$this->skuValue->addConditionedValue( 113 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::WHITE_REMOVABLE );

			$this->skuValue->addConditionedValue( 114 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::WHITE_WALL );

			$this->skuValue->addConditionedValue( 115 )
				->conditionBuilder
				->addCondition( "item.productName", "==", CustomStickerFamily::PRODUCT_FLOOR );

			$this->skuValue->addConditionedValue( 116 )
				->conditionBuilder
				->addCondition( "item.productName", "==", CustomStickerFamily::PRODUCT_LABELS_ON_SHEET )
				->addCondition( "item.attributes.material", "==", MaterialAttribute::WHITE );

			$this->skuValue->addConditionedValue( 117 )
				->conditionBuilder
				->addCondition( "item.productName", "==", CustomStickerFamily::PRODUCT_LABELS_ON_SHEET )
				->addCondition( "item.attributes.material", "==", MaterialAttribute::CLEAR );

			$this->skuValue->addConditionedValue( 124 )
				->conditionBuilder
				->addCondition( "item.attributes.material", "==", MaterialAttribute::GITD );

			$this->skuValue->addConditionedValue( 127 )
			->conditionBuilder
			->addCondition( "item.attributes.material", "==", MaterialAttribute::PIXIE_DUST );
		}

		public function getSKU( ProductItem $productItem ): float
		{
			return $this->skuValue->getValue( $productItem );
		}
	}
