<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class ResellerAttribute extends ProductAttr
	{
		const ALIAS                   = "reseller";
        const VALUE_STICKERAPP        = "stickerapp";
		const VALUE_STICKERSTHATSTICK = "stickersthatstick";
        const VALUE_STICKIT           = "stickit";

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE );

            $this->addAttrValue( self::VALUE_STICKERAPP );
			$this->addAttrValue( self::VALUE_STICKERSTHATSTICK );
            $this->addAttrValue( self::VALUE_STICKIT );
		}
	}
