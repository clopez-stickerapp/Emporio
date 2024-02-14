<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Helper\Condition\ConditionRelations;

class ProductionLineFilter extends ProductAttrFilter
{
	public function __construct()
	{
		parent::__construct("production_line");

		$this->createFilter(array(ProductionLineAttribute::LASER))
			->conditionBuilder
            ->setBaseComplexityScore(120)
			->addCondition("item.productName", "IN", array(
				CustomStickerFamily::PRODUCT_SHEET,
				CustomStickerFamily::PRODUCT_SHEET_KISS_CUT,
				CustomStickerFamily::PRODUCT_WINDOW,
				CustomStickerFamily::PRODUCT_LABELS_ON_ROLL,
				CustomStickerFamily::PRODUCT_LABELS_ON_SHEET,
			));

		$this->createFilter(array(ProductionLineAttribute::LASER))
			->conditionBuilder
			->addCondition("item.attributes.material", "IN", array(
				MaterialAttribute::WHITE,
				MaterialAttribute::WHITE_REMOVABLE,
				MaterialAttribute::CLEAR
			))
			->addCondition( "item.productName", "!=", CustomStickerFamily::PRODUCT_LIBRARY_DESIGN )
			->addCondition("item.attributes.width_mm", "<=", MaxSizeAttribute::MAX_SIZE_ONE_SIDE_LASER)
			->addCondition("item.attributes.height_mm", "<=", MaxSizeAttribute::MAX_SIZE_ONE_SIDE_LASER)
			->addSubGroup(ConditionRelations::OR)
			->addCondition("item.attributes.width_mm", "<=", MaxSizeAttribute::MAX_SIZE_LASER)
			->addCondition("item.attributes.height_mm", "<=", MaxSizeAttribute::MAX_SIZE_LASER);

		$this->createFilter(array(ProductionLineAttribute::DIGITAL), ConditionRelations::OR)
			->conditionBuilder
			->addCondition("item.productName", "IN", array(
				CustomStickerFamily::PRODUCT_TRANSFER_DECAL,
			))
			->addSubGroup(ConditionRelations::AND)
			->addCondition("item.attributes.width_mm", ">", MaxSizeAttribute::MAX_SIZE_LASER)
			->addCondition("item.attributes.height_mm", ">", MaxSizeAttribute::MAX_SIZE_LASER);
	}
}
