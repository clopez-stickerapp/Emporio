<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;

	class LaminateConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( LaminateAttribute::ALIAS );

			// $this->createConditionsFor( LaminateAttribute::SOFT_TOUCH )
			//      ->addCondition( "item.attributes.material", "NOT IN", array(
			// 	     MaterialAttribute::PRISMATIC,
			// 	     MaterialAttribute::GITD,
			// 	     MaterialAttribute::BRUSHED_ALLOY
			//      ) );

			// $this->createConditionsFor( LaminateAttribute::SATIN_MATTE )
			//      ->addCondition( "item.attributes.material", "NOT IN", array(
			// 	     MaterialAttribute::MIRROR,
			// 	     MaterialAttribute::PRISMATIC,
			// 	     MaterialAttribute::GITD,
			// 	     MaterialAttribute::BRUSHED_ALLOY
			//      ) );

// 			$this->createConditionsFor( LaminateAttribute::EPOXY )
// //			     ->addCondition( ShapeAttribute::NAME, "==", ShapeAttribute::ROUND )
//                  ->addCondition( "item.attributes.material", "IN", array(
// 					MaterialAttribute::WHITE,
// 					MaterialAttribute::WHITE_REMOVABLE,
// 					MaterialAttribute::WHITE_HI_TACK,
// 					MaterialAttribute::MIRROR,
// 					MaterialAttribute::BRUSHED_ALLOY,
// 					MaterialAttribute::HOLOGRAPHIC,
// 					MaterialAttribute::GITD
// 				) );
		}
	}
