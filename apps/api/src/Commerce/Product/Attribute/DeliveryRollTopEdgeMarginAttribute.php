<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class DeliveryRollTopEdgeMarginAttribute extends ProductAttr
	{
		const ALIAS = "delivery_roll_top_edge_margin";
		const DEFAULT_VALUE = 2;

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::FLOAT, FALSE, TRUE );
		}
	}
