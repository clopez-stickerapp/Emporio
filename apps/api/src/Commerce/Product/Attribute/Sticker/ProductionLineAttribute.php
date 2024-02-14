<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;

	class ProductionLineAttribute extends ProductAttr
	{
		const ALIAS   = "production_line";
		const DIGITAL = "digital";
		const SPECIAL = "special";
		const LASER             = "laser";
		const DIGITAL_MATERIALS = [
			MaterialAttribute::WHITE,
			MaterialAttribute::WHITE_HI_TACK,
            MaterialAttribute::WHITE_STURDY,
			MaterialAttribute::WHITE_REMOVABLE,
			MaterialAttribute::WHITE_WALL,
			MaterialAttribute::SKIN,
			MaterialAttribute::BUBBLE_FREE,
			MaterialAttribute::CLEAR,
			MaterialAttribute::COLORED_VINYL,
			MaterialAttribute::METALLIC_GOLD,
			MaterialAttribute::METALLIC_SILVER,
			MaterialAttribute::FROSTED,
			MaterialAttribute::FLUORESCENT,
			MaterialAttribute::MAGNETIC,
			MaterialAttribute::WHITE_COVERALL,
			MaterialAttribute::SATIN_MATTE,
			MaterialAttribute::REFLECTIVE,
            MaterialAttribute::HEAT_TRANSFER,
		];
		const DIGITAL_LAMINATES = [
			LaminateAttribute::GLOSSY_UV,
			LaminateAttribute::GLOSSY_UV_12_MIL_HEAVY_DUTY,
			LaminateAttribute::SATIN_MATTE,
			LaminateAttribute::SANDY,
			LaminateAttribute::EPOXY,
			LaminateAttribute::PEBBLE,
			LaminateAttribute::SUPER_ROUGH,
			LaminateAttribute::WHITE_WINDOW,
			LaminateAttribute::UNCOATED,
            LaminateAttribute::GLOSSY_THIN,
		];
		const LASER_MATERIALS   = [
			MaterialAttribute::WHITE,
			MaterialAttribute::WHITE_HI_TACK,
			MaterialAttribute::WHITE_REMOVABLE,
			MaterialAttribute::WHITE_BACKSCORE,
			MaterialAttribute::WHITE_THIN,
			MaterialAttribute::PAPER_THIN,
			MaterialAttribute::CLEAR_THIN,
			MaterialAttribute::KRAFT_THIN,
			MaterialAttribute::SILVER_THIN,
			MaterialAttribute::WARRANTY,
			MaterialAttribute::HOLOGRAPHIC,
			MaterialAttribute::BRUSHED_ALLOY,
			MaterialAttribute::PRISMATIC,
			MaterialAttribute::GITD,
			MaterialAttribute::KRAFT_PAPER,
			MaterialAttribute::MIRROR,
			MaterialAttribute::GLITTER,
			MaterialAttribute::CLEAR,
			MaterialAttribute::CLEAR_BACKSCORE,
			MaterialAttribute::PIXIE_DUST,
			MaterialAttribute::REFLECTIVE,
		];
		const LASER_LAMINATES   = [
			LaminateAttribute::GLOSSY_UV,
			LaminateAttribute::GLOSSY_NO_UV,
			LaminateAttribute::GLOSSY_THIN_NO_UV,
			LaminateAttribute::SOFT_TOUCH,
			LaminateAttribute::CRACKED_ICE,
			LaminateAttribute::SATIN_MATTE,
			LaminateAttribute::TEXTURED,
			LaminateAttribute::EPOXY,
			LaminateAttribute::UNCOATED,
		];

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE );

			$this->addAttrValue( self::LASER );
			$this->addAttrValue( self::DIGITAL );
			$this->addAttrValue( self::SPECIAL );
		}
	}
