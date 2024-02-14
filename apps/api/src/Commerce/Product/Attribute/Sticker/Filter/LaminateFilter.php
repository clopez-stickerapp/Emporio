<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Filter\ProductAttrFilter;
use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InkAttribute;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Helper\Condition\ConditionOperators;
use StickerApp\Babylon\Helper\Condition\ConditionRelations;

class LaminateFilter extends ProductAttrFilter
{
	public function __construct()
	{
		parent::__construct(LaminateAttribute::ALIAS);

        $this->addStickerappFilters();
        $this->addSTSFilters();
    }
		
    private function addStickerappFilters()
    {
        $this->createFilter(array(
			LaminateAttribute::GLOSSY_UV,
		))
			->conditionBuilder
			->addCondition("item.productName", "!=", CustomStickerFamily::PRODUCT_3D_DOME)
			->addCondition("item.attributes.material", "IN", array(
				MaterialAttribute::GLITTER,
				MaterialAttribute::BRUSHED_ALLOY,
				MaterialAttribute::PRISMATIC,
				MaterialAttribute::GITD,
				MaterialAttribute::PIXIE_DUST,
			));

		$this->createFilter(array(
			LaminateAttribute::GLOSSY_UV,
			LaminateAttribute::SOFT_TOUCH,
			LaminateAttribute::CRACKED_ICE
		))
			->conditionBuilder
			->addCondition("item.productName", "!=", CustomStickerFamily::PRODUCT_3D_DOME)
			->addCondition("item.attributes.material", "IN", array(
				MaterialAttribute::WHITE,
				MaterialAttribute::CLEAR,
			));

		$this->createFilter(array(
			LaminateAttribute::GLOSSY_UV,
			LaminateAttribute::SATIN_MATTE,
			LaminateAttribute::CRACKED_ICE
		))
			->conditionBuilder
			->addCondition("item.productName", "!=", CustomStickerFamily::PRODUCT_3D_DOME)
			->addCondition("item.attributes.material", "IN", array(
				MaterialAttribute::HOLOGRAPHIC,
			));

		$this->createFilter(array(
			LaminateAttribute::GLOSSY_UV,
			LaminateAttribute::SOFT_TOUCH,
		))
			->conditionBuilder
			->addCondition("item.productName", "!=", CustomStickerFamily::PRODUCT_3D_DOME)
			->addCondition("item.attributes.material", "IN", array(
				MaterialAttribute::MIRROR,
				MaterialAttribute::WHITE_REMOVABLE,
			));

		$inkFilter = $this->createFilter(array(
			LaminateAttribute::GLOSSY_NO_UV,
			LaminateAttribute::UNCOATED,
		), ConditionRelations::OR);
		$inkFilter->conditionBuilder->setBaseComplexityScore(100);
		$inkFilter->conditionBuilder
			->addCondition("item.attributes.ink", "IN", array(
				InkAttribute::INVISIBLE_INK,
				InkAttribute::PINK_INK,
			));

		$this->createFilter(array(
			LaminateAttribute::GLOSSY_UV_12_MIL_HEAVY_DUTY,
		))
			->conditionBuilder
			->addCondition("item.productName", "!=", CustomStickerFamily::PRODUCT_3D_DOME)
			->addCondition("item.attributes.material", "IN", array(
				MaterialAttribute::WHITE_HI_TACK,
			));

		$this->createFilter(array(
			LaminateAttribute::UNCOATED,
		), ConditionRelations::OR)
			->conditionBuilder
			->addCondition("item.productName", "IN", array(
				CustomStickerFamily::PRODUCT_TRANSFER_DECAL,
				CustomStickerFamily::PRODUCT_WALL
			))
			->addCondition("item.attributes.material", "IN", array(
				MaterialAttribute::KRAFT_PAPER,
				MaterialAttribute::SATIN_MATTE,
				MaterialAttribute::COLORED_VINYL,
				MaterialAttribute::WHITE_WALL
			));
		//				->addCondition( "item.productName", "==", CustomStickerFamily::PRODUCT_WALL )
		//
		//				->addSubGroup( ConditionRelations::OR )
		//				->addCondition( "item.productName", "!=", CustomStickerFamily::PRODUCT_3D_DOME )
		//				->addCondition( "item.attributes.material", "IN", array(
		//					MaterialAttribute::KRAFT_PAPER,
		//				) );

		$this->createFilter(array(
			LaminateAttribute::SANDY,
		))
			->conditionBuilder
			->setBaseComplexityScore(1000) // To make this prio
			->addSubGroup(ConditionRelations::OR)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_FLOOR)
			->addCondition("item.attributes.material", "==", MaterialAttribute::SKIN);

		$this->createFilter(array(
			LaminateAttribute::EPOXY,
		))
			->conditionBuilder
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_3D_DOME);

		$this->createFilter(array(
			LaminateAttribute::GLOSSY_THIN_NO_UV,
		))
			->conditionBuilder
			->setBaseComplexityScore(1000)
			->addCondition("item.productName", "IN", array(
				CustomStickerFamily::PRODUCT_LABELS_ON_SHEET
			));

		$this->createFilter(array(
			LaminateAttribute::GLOSSY_THIN_NO_UV,
			LaminateAttribute::UNCOATED,
		))
			->conditionBuilder
			->setBaseComplexityScore(1000)
			->addCondition("item.productName", "IN", array(
				CustomStickerFamily::PRODUCT_LABELS_ON_ROLL
			));

		$this->createFilter(array(
			LaminateAttribute::GLOSSY_UV
		), ConditionRelations::OR)
			->conditionBuilder
			->addCondition("item.attributes.material", "==", MaterialAttribute::COLORED_VINYL)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_SHEET_LEGACY);

		$this->createFilter(array(
			LaminateAttribute::UNCOATED
		))
			->conditionBuilder
			->setBaseComplexityScore(1000)
			->addCondition("item.productName", "==", CustomStickerFamily::PRODUCT_TRANSFER_DECAL);		
    }

    private function addSTSFilters()
    {
        $this->createFilter(array(
            LaminateAttribute::GLOSSY_UV_12_MIL_HEAVY_DUTY,
            LaminateAttribute::GLOSSY_UV,
            LaminateAttribute::SANDY,
        ))
            ->conditionBuilder
            ->setBaseComplexityScore(120)
            ->addCondition("item.productName", "!=", CustomStickerFamily::PRODUCT_3D_DOME)
            ->addCondition("item.attributes.reseller", ConditionOperators::IN, array(ResellerAttribute::VALUE_STICKERSTHATSTICK, ResellerAttribute::VALUE_STICKIT))
            ->addCondition("item.attributes.material", "IN", array(
                MaterialAttribute::WHITE_HI_TACK,
            ));
    }
}
