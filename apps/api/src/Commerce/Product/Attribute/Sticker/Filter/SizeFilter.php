<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SizeAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Helper\Condition\ConditionOperators;
use StickerApp\Babylon\Helper\Condition\ConditionRelations;

class SizeFilter extends ProductAttrFilter
{
	public function __construct()
	{
		parent::__construct(SizeAttribute::ALIAS);

		$this->createDefaultSizeOptions();
		$this->createLegacySheetSizeOptions();
		$this->createEpoxySizeOptions();
		$this->createWallAndFloorSizeOptions();
		$this->createSheetSizeOptions();
		$this->createKissCutSheetSizeOptions();
	}

	protected function createDefaultSizeOptions(): void
	{
		// Metric units
		$this->createFilter(array(
			"5x3 cm",
			"5x5 cm",
			"8x5 cm",
			"8x8 cm",
			"10x7 cm",
			"10x10 cm",
			"12x5 cm",
			"13x7 cm",
			"15x10 cm"
		));
		// Imperial units
		$imperialDefaultFilter = $this->createFilter(array(
			"2\" x 1\"",
			"2\" x 2\"",
			"3\" x 2\"",
			"3\" x 3\"",
			"4\" x 3\"",
			"4\" x 4\"",
			"5\" x 2\"",
			"5\" x 3\"",
			"8\" x 4\""
		));
		$imperialDefaultFilter->conditionBuilder->addCondition("item.attributes.imperial_units", "==", TRUE);
	}

	protected function createLegacySheetSizeOptions(): void
	{
		// Metric units
		$this->createFilter(array(
			"30x20 cm",
		))
			->conditionBuilder->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_SHEET_LEGACY);
		// Imperial units
		$imperialDefaultFilter = $this->createFilter(array(
			"11.8\" x 7.9\"",
		));
		$imperialDefaultFilter->conditionBuilder->addCondition("item.attributes.imperial_units", "==", TRUE)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_SHEET_LEGACY);
	}

	protected function createEpoxySizeOptions(): void
	{
		// Metric units
		$this->createFilter(array(
			"2.5x2.5 cm",
			"3.8x3.8 cm",
			"5.1x2.5 cm",
			"7.7x3.8 cm",
		))
			->conditionBuilder
			->addCondition("item.attributes.laminate", "==", LaminateAttribute::EPOXY);
		// Imperial units
		$imperialEpoxyFilter = $this->createFilter(array(
			"1\" x 1\"",
			"1.5\" x 1.5\"",
			"2\" x 1\"",
			"3\" x 1.5\"",
		));
		$imperialEpoxyFilter->conditionBuilder->addCondition("item.attributes.laminate", "==", LaminateAttribute::EPOXY)
			->addCondition("item.attributes.imperial_units", "==", TRUE);
	}

	protected function createWallAndFloorSizeOptions(): void
	{
		// Metric units
		$this->createFilter(array(
			"30x15 cm",
			"40x20 cm",
			"60x25 cm",
			"80x40 cm",
			"100x70 cm",
			"120x80 cm",
		))->conditionBuilder
			->addSubGroup(ConditionRelations::OR)
			->addCondition("item.attributes.material", "==", MaterialAttribute::WHITE_WALL)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_WALL)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_FLOOR);
		// Imperial units
		$imperial = $this->createFilter(array(
			"14\" x 7\"",
			"16\" x 10\"",
			"20\" x 10\"",
			"30\" x 20\"",
			"40\" x 20\"",
			"46\" x 25\"",
		));
		$imperial->conditionBuilder
			->addSubGroup(ConditionRelations::OR)
			->addCondition("item.attributes.material", "==", MaterialAttribute::WHITE_WALL)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_WALL)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_FLOOR);
		$imperial->conditionBuilder
			->addSubGroup(ConditionRelations::OR)
			->addCondition("item.attributes.imperial_units", "==", TRUE);
	}

	protected function createSheetSizeOptions(): void
	{
		$imperial = $this->createFilter(array(
			"US half letter <br> 8.5 x 5.5\"",
			"A5 paper <br> 5.8 x 8.3\"",
			"Thank you card <br> 5.1 x 6.4\""
		));
		$imperial->conditionBuilder
			->addCondition("item.attributes.imperial_units", "==", TRUE)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_SHEET);

		$metric = $this->createFilter(array(
			"21.6x14 cm",
			"14.8x21 cm",
			"13x16.3 cm",
		));
		$metric->conditionBuilder
			->addCondition("item.attributes.imperial_units", "==", FALSE)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_SHEET);
	}

	protected function createKissCutSheetSizeOptions(): void
	{
		$imperial = $this->createFilter(array(
			"3\" x 4\"",
			"3.5\" x 5\""
		));
		$imperial->conditionBuilder
			->addCondition("item.attributes.imperial_units", "==", TRUE)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_SHEET_KISS_CUT);

		$metric = $this->createFilter(array(
			"7.6x10.1 cm",
			"8.9x12.7 cm",
		));
		$metric->conditionBuilder
			->addCondition("item.attributes.imperial_units", "==", FALSE)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_SHEET_KISS_CUT);
	}
}
