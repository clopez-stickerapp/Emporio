<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class MarketAttribute extends ProductAttr
	{
		const ALIAS = "market";
        const US = "us";
        const SE = "se";
        const DK = "dk";
        const UK = "uk";
        const DE = "de";
        const NO = "no";
        const NL = "nl";
        const FI = "fi";
        const IT = "it";
        const FR = "fr";
        const JP = "jp";
        const ES = "es";
        const PT = "pt";
        const PL = "pl";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE );

            $this->addAttrValue(self::US);
            $this->addAttrValue(self::SE);
            $this->addAttrValue(self::DK);
            $this->addAttrValue(self::UK);
            $this->addAttrValue(self::NO);
            $this->addAttrValue(self::DE);
            $this->addAttrValue(self::NL);
            $this->addAttrValue(self::FI);
            $this->addAttrValue(self::IT);
            $this->addAttrValue(self::FR);
            $this->addAttrValue(self::JP);
            $this->addAttrValue(self::ES);
            $this->addAttrValue(self::PT);
            $this->addAttrValue(self::PL);
		}
	}
