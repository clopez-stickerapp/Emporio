<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Helper\Condition\ConditionOperators;

class MaterialConstraint extends ProductAttrConstraint
{
	public function __construct()
	{
		parent::__construct(MaterialAttribute::ALIAS);

		// Labels on roll materials should only be available for labels on roll
		foreach ( MaterialAttribute::MATERIALS_LABELS_ON_ROLL as $material )
		{
			$this->createConditionsFor( $material )
				->addCondition( "item.productName", ConditionOperators::IN, array(
					CustomStickerFamily::PRODUCT_LABELS_ON_ROLL,
				) );
		}
	}
}
