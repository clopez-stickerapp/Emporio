<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class LaminateAttribute extends ProductAttr
	{
		const ALIAS    						= "laminate";
		const UNCOATED 						= "uncoated";
		const GLOSSY_UV       	 			= "glossy_uv";
		const GLOSSY_UV_12_MIL_HEAVY_DUTY 	= "glossy_uv_12_mil_heavy_duty";
		const GLOSSY_NO_UV     				= "glossy_no_uv";
		const SOFT_TOUCH       				= "soft_touch";
		const SATIN_MATTE      				= "satin_matte";
		const SANDY            				= "sandy";
		const EPOXY            				= "epoxy";
		const CRACKED_ICE      				= "cracked_ice";
		const PEBBLE      					= "pebble";
		const SUPER_ROUGH 					= "super_rough";
		const TEXTURED 						= "textured";
		const WHITE_WINDOW 					= "white_window";
        const GLOSSY_THIN                   = "glossy_thin";
		const GLOSSY_THIN_NO_UV     				= "glossy_thin_no_uv";

		const OUT_OF_STOCK = array();

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE );

			$this->addAttrValue( self::GLOSSY_UV );
			$this->addAttrValue( self::GLOSSY_NO_UV );
			$this->addAttrValue( self::GLOSSY_UV_12_MIL_HEAVY_DUTY );
			$this->addAttrValue( self::SOFT_TOUCH );
			$this->addAttrValue( self::SATIN_MATTE );
			$this->addAttrValue( self::SANDY );
			$this->addAttrValue( self::EPOXY );
			$this->addAttrValue( self::CRACKED_ICE );
			$this->addAttrValue( self::PEBBLE );
			$this->addAttrValue( self::SUPER_ROUGH );
			$this->addAttrValue( self::TEXTURED );
			$this->addAttrValue( self::UNCOATED );
			$this->addAttrValue( self::WHITE_WINDOW );
            $this->addAttrValue( self::GLOSSY_THIN );
			$this->addAttrValue( self::GLOSSY_THIN_NO_UV );
		}
	}
