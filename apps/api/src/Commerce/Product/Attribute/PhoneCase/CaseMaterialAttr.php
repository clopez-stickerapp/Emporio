<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\PhoneCase;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class CaseMaterialAttr extends ProductAttr
	{
		const ALIAS = "material";
		const GLOSSY = "glossy_case";
		const MATTE  = "matte_case";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING );

			$this->addAttrValue( self::GLOSSY );
			$this->addAttrValue( self::MATTE );
		}
	}
