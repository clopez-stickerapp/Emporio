<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;

	class MaxSizeConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( MaxSizeAttribute::ALIAS );

			// Keep in mind, these constraints should reflect what is and is not actually possible production wise

			// This rule should basically reflect same as "digital" value for attribute production_line
//			$this->createConditionsFor( MaxSizeAttribute::MAX_SIZE_DIGITAL )
//			     ->addCondition( "item.attributes.production_line", "==", ProductionLineAttribute::DIGITAL );
		}
	}
