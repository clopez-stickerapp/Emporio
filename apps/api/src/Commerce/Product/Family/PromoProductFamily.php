<?php

namespace StickerApp\Babylon\Commerce\Product\Family;

use Sticker_packs_sql_table;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Core\Product\ProductFamily;
use StickerApp\Babylon\Commerce\Core\ProductService;
use StickerApp\Babylon\Commerce\Product\Attribute\DynamicStringAttr;
use StickerApp\Babylon\Commerce\Product\Attribute\FigureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\HeightAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\ReorderAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint\PromoProductionConstraintCollection;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SheetTypeAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\TemplateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\WidthAttribute;
use StickerApp\Babylon\Commerce\Product\Price\PromoProductPriceProvider;
use Template_Model;

class PromoProductFamily extends ProductFamily
{
	const NAME = "promo";
	const PRODUCT_GIFTCARD = "giftcard";
	const PRODUCT_UV_LAMP = "uv_lamp";
	const PRODUCT_MONSTER_PACK = "monster_pack";
	const PRODUCT_MOST_LIKED_PACK_2021 = "most_liked_pack_2021";
	const PRODUCT_MOST_LIKED_PACK_2022 = "most_liked_pack_2022";
	const PRODUCT_CREEPY_HEAD_PACK = "creepy_head_pack";
	const PRODUCT_SAMPLE_STICKER_PACK = "sample_sticker_pack";
	const PRODUCT_MOST_LIKED_PACK_2023 = "most_liked_pack_2023";
	const PRODUCT_SLAP_PACK = "slap_pack";

	public function __construct(ProductService $service)
	{
		parent::__construct(self::NAME, 1, $service);

        $this->relateProductPriceProvider( PromoProductPriceProvider::NAME );
		$this->relateConstraintCollection( PromoProductionConstraintCollection::NAME );

		$this->requireAttr(SheetTypeAttribute::class, "sheet_type");
		$this->requireAttr(DynamicStringAttr::class, "sheet_name");
		$this->requireAttr(QuantityAttribute::class, "quantity");

		$this->supportAttr(DynamicStringAttr::class, "material");
		$this->supportAttr(TemplateAttribute::class, "template_id");
		$this->supportAttr(DynamicStringAttr::class, "laminate");
		$this->supportAttr(HeightAttribute::class, "height_mm");
		$this->supportAttr(WidthAttribute::class, "width_mm");
		$this->supportAttr(FigureAttribute::class, "figure_id");
		$this->supportAttr(ReorderAttribute::class, "reorder");
		$this->supportAttr(ProductionLineAttribute::class, "production_line");

		$this->addProduct(self::PRODUCT_GIFTCARD, "GC-31")
			->withAttrValue("sheet_type", "giftcard")
			->withAttrValue("material", "special");

		$this->addProduct(self::PRODUCT_UV_LAMP, "UL-31")
			->withAttrValue("sheet_type", "promo")
			->withAttrValue("sheet_name", "uv_lamp");

		foreach ( get_sticker_packs_model()->getStickerPacks() as $stickerPack )
		{
			$this->addProduct($stickerPack[ Sticker_packs_sql_table::COLUMN_NAME ], $stickerPack[ Sticker_packs_sql_table::COLUMN_SKU ])
				->withAttrValue("sheet_type", Template_Model::TYPE_STICKER_PACK)
				->withAttrValue("sheet_name", $stickerPack[ Sticker_packs_sql_table::COLUMN_NAME ] )
				->withAttrValue("material", "special");
		}
	}

	public function validateUnits(ProductItem $productItem): bool
	{
		$productItem->setUnits(intval($productItem->getAttribute("quantity")));

		return true;
	}

}