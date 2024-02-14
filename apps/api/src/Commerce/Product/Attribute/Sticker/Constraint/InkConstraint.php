<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InkAttribute;

class InkConstraint extends ProductAttrConstraint
{
	public function __construct()
	{
		parent::__construct(InkAttribute::ALIAS);

		// $this->createConditionsFor(InkAttribute::PINK_INK)
		// 	->addCondition("item.attributes.laminate", "IN", array(LaminateAttribute::GLOSSY_NO_UV, LaminateAttribute::UNCOATED));

		// $this->createConditionsFor(InkAttribute::INVISIBLE_INK)
		// 	->addCondition("item.attributes.laminate", "IN", array(LaminateAttribute::GLOSSY_NO_UV, LaminateAttribute::UNCOATED));
	}
}
