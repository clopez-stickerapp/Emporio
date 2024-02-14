<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
use StickerApp\Babylon\Helper\Condition\ConditionRelations;

class FeatureConstraint extends ProductAttrConstraint
{
	const EFFECT_LAYER_MATERIALS = array(
		MaterialAttribute::PRISMATIC,
		MaterialAttribute::BRUSHED_ALLOY,
		MaterialAttribute::GLITTER,
		MaterialAttribute::MIRROR,
		MaterialAttribute::SILVER_THIN,
		MaterialAttribute::HOLOGRAPHIC,
		MaterialAttribute::KRAFT_PAPER,
		MaterialAttribute::KRAFT_THIN,
		MaterialAttribute::REFLECTIVE,
		MaterialAttribute::PIXIE_DUST,
		MaterialAttribute::GITD,
		MaterialAttribute::CLEAR,
		MaterialAttribute::CLEAR_THIN,
		MaterialAttribute::CLEAR_BACKSCORE
	);

	public function __construct()
	{
		parent::__construct(FeatureAttribute::ALIAS);

		$this->createConditionsFor(FeatureAttribute::HANGTAGGING)
			->addCondition("item.attributes.laminate", "NOT IN", array(
				LaminateAttribute::EPOXY,
			));

		$backPaperPrintConditions = $this->createConditionsFor(FeatureAttribute::BACKPAPER_PRINT, ConditionRelations::OR);
		$backPaperPrintConditions->addSubGroup()
			->addCondition("item.attributes.material", "IN", ProductionLineAttribute::LASER_MATERIALS);

		$this->createConditionsFor(FeatureAttribute::EFFECT_LAYER)
			->addCondition("item.attributes.material", "IN", self::EFFECT_LAYER_MATERIALS);

		$this->createConditionsFor(FeatureAttribute::TRANSFER_TAPE)
			->addCondition("item.attributes.production_line", "==", ProductionLineAttribute::DIGITAL);
	}
}
