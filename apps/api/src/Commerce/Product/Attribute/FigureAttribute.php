<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class FigureAttribute extends ProductAttr
	{
		const ALIAS = "figure_id";

		public function __construct()
		{
			parent::__construct(ProductAttrValueTypes::INT, FALSE, TRUE );
		}
	}
