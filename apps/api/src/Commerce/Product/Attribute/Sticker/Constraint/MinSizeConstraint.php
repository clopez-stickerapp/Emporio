<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MinSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;

	class MinSizeConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( MinSizeAttribute::ALIAS );

			$this->createConditionsFor( MinSizeAttribute::MIN_SIZE_BIGGER )
			     ->addCondition( "item.productName", "IN", array(
				     CustomStickerFamily::PRODUCT_WALL,
				     CustomStickerFamily::PRODUCT_FLOOR
			     ) );
		}
	}
