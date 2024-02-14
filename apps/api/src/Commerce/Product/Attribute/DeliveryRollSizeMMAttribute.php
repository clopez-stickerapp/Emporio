<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class DeliveryRollSizeMMAttribute extends ProductAttr
	{
		const ALIAS = "delivery_roll_size_mm";
		const INNER_ROLL_SIZE_DEFAULT = 76;
		// const INNER_ROLL_SIZE_SMALL   = 40;

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::INT, FALSE, FALSE );
			$this->addAttrValue( self::INNER_ROLL_SIZE_DEFAULT );
			// $this->addAttrValue( self::INNER_ROLL_SIZE_SMALL );
		}
	}