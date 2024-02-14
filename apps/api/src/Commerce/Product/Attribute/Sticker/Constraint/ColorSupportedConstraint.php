<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
	use StickerApp\Babylon\Commerce\Product\Attribute\ColorSupportedAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;

	class ColorSupportedConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( ColorSupportedAttribute::ALIAS );

			$this->createConditionsFor( TRUE )
				->addCondition( "item.attributes.material", "IN", array(
					MaterialAttribute::COLORED_VINYL,
				) );
		}
	}