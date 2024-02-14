<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Helper\Condition\ConditionOperators;

	class MaterialAttribute extends ProductAttr
	{
		const ALIAS           = "material";
		const WHITE           = "white";
		const WHITE_REMOVABLE = "white_removable";
		const WHITE_WALL      = "white_wall";
		const WHITE_HI_TACK   = "white_hi_tack";
		const WHITE_THIN      = "white_thin";
		const PAPER_THIN      = "paper_thin";
		const CLEAR_THIN      = "clear_thin";
		const KRAFT_THIN      = "kraft_thin";
		const SILVER_THIN     = "silver_thin";
		const WHITE_COVERALL  = "white_coverall";
		const WHITE_PAPER     = "white_paper";
		const WHITE_BACKSCORE = "white_backscore";
        const WHITE_STURDY    = "white_sturdy";
		const HOLOGRAPHIC     = "holographic";
		const KRAFT_PAPER     = "kraft_paper";
		const PRISMATIC       = "prismatic";
		const MIRROR          = "mirror";
		const GLITTER         = "glitter";
		const GITD            = "gitd";
		const BRUSHED_ALLOY   = "brushed_alloy";
		const CLEAR           = "clear";
		const CLEAR_BACKSCORE = "clear_backscore";
		const BUBBLE_FREE     = "bubble_free";
		const SKIN            = "skin";
		const COLORED_VINYL   = "colored_vinyl";
		const METALLIC_GOLD   = "metallic_gold";
		const METALLIC_SILVER = "metallic_silver";
		const FROSTED         = "frosted";
		const FLUORESCENT     = "fluorescent";
		const MAGNETIC        = "magnetic";
		const PIXIE_DUST      = "pixie_dust";
		const SATIN_MATTE     = "satin_matte";
		const WARRANTY        = "warranty";
		const REFLECTIVE      = "reflective";
        const HEAT_TRANSFER   = "heat_transfer";
        const SPECIAL         = "special";

		const OUT_OF_STOCK = array( MaterialAttribute::WARRANTY );

		const MATERIALS_LABELS_ON_ROLL = array(
			MaterialAttribute::WHITE_THIN,
			MaterialAttribute::PAPER_THIN,
			MaterialAttribute::CLEAR_THIN,
			MaterialAttribute::KRAFT_THIN,
			MaterialAttribute::SILVER_THIN,
		);

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::STRING, FALSE );

			$this->addAttrValue( self::WHITE );
			$this->addAttrValue( self::WHITE_HI_TACK );
			$this->addAttrValue( self::WHITE_REMOVABLE );
			$this->addAttrValue( self::WHITE_WALL );
			$this->addAttrValue( self::WHITE_THIN );
			$this->addAttrValue( self::PAPER_THIN );
            $this->addAttrValue( self::CLEAR_THIN );
            $this->addAttrValue( self::KRAFT_THIN );
            $this->addAttrValue( self::SILVER_THIN );
			$this->addAttrValue( self::WHITE_COVERALL );
			$this->addAttrValue( self::WHITE_PAPER );
			$this->addAttrValue( self::WHITE_BACKSCORE );
            $this->addAttrValue( self::WHITE_STURDY );
			$this->addAttrValue( self::CLEAR_BACKSCORE );
			$this->addAttrValue( self::HOLOGRAPHIC );
			$this->addAttrValue( self::PIXIE_DUST );
			$this->addAttrValue( self::KRAFT_PAPER );
			$this->addAttrValue( self::PRISMATIC );
			$this->addAttrValue( self::MIRROR );
			$this->addAttrValue( self::GITD );
			$this->addAttrValue( self::BRUSHED_ALLOY );
			$this->addAttrValue( self::CLEAR );
			$this->addAttrValue( self::GLITTER );
			$this->addAttrValue( self::BUBBLE_FREE );
			$this->addAttrValue( self::SKIN );
			$this->addAttrValue( self::COLORED_VINYL );
			$this->addAttrValue( self::METALLIC_GOLD );
			$this->addAttrValue( self::METALLIC_SILVER );
			$this->addAttrValue( self::FROSTED );
			$this->addAttrValue( self::FLUORESCENT );
			$this->addAttrValue( self::SATIN_MATTE );
			$this->addAttrValue( self::WARRANTY );
			$this->addAttrValue( self::REFLECTIVE );
			$this->addAttrValue( self::MAGNETIC );
            $this->addAttrValue( self::HEAT_TRANSFER );
            $this->addAttrValue( self::SPECIAL );
		}
	}
