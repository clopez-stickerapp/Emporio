<?php

namespace StickerApp\Babylon\Commerce\Product\Helper;

use ErrorException;
use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;
use StickerApp\Babylon\Commerce\Product\Attribute\ChangedAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\PhoneCase\CaseMaterialAttr;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\CutDirectionAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliveryAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetHeightAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetInsidePaddingAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetOutsidePaddingAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetWidthAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\EpoxyTemplateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\FigureAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\HeightAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Helper\LegacyProductNameConverter;
use StickerApp\Babylon\Commerce\Product\Attribute\Helper\CustomizationValueConverter;
use StickerApp\Babylon\Commerce\Product\Attribute\Helper\MaterialAndLaminateLegacyValueConverter;
use StickerApp\Babylon\Commerce\Product\Attribute\Helper\SheetMetaValueConverter;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InnercutAsKisscutAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\NoteAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\OutlineAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\PriceMarginPercentageAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionInstructionAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\ReorderAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialColorAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\StickerSheetNameAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SheetTypeAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\TemplateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\WhiteLayerAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\WidthAttribute;
use StickerApp\Babylon\Commerce\Product\Family\PhoneCaseProductFamily;
use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
use StickerApp\Babylon\Commerce\Product\Family\SkinProductFamily;
use StickerApp\Babylon\Editor\Helper\LegacySheetFormattedEditorData;

use function array_key_exists;
use function in_array;

class LegacyProductItemConverter
{
	public LegacyProductNameConverter $productNameConverter;
	public MaterialAndLaminateLegacyValueConverter $attrConverter;
	public CustomizationValueConverter $customizationConverter;
	public SheetMetaValueConverter $sheetMetaConverter;

	protected array $metaToAttributeDirectMapping = array(
		"PRODUCTION_LINE"                => ProductionLineAttribute::ALIAS,
		"SPECIAL_PRODUCTION"             => ProductionInstructionAttribute::ALIAS,
		"DELIVERY"                       => DeliveryAttribute::ALIAS,
		"DELIVERY_SHEET_WIDTH"           => DeliverySheetWidthAttribute::ALIAS,
		"DELIVERY_SHEET_HEIGHT"          => DeliverySheetHeightAttribute::ALIAS,
		"DELIVERY_SHEET_PADDING"         => DeliverySheetInsidePaddingAttribute::ALIAS,
		"DELIVERY_SHEET_OUTSIDE_PADDING" => DeliverySheetOutsidePaddingAttribute::ALIAS,
		"INNERCUT_AS_KISSCUT"            => InnercutAsKisscutAttribute::ALIAS,
		"WEB_DIRECTION"                  => CutDirectionAttribute::ALIAS,
		"WHITE_LAYER"                    => WhiteLayerAttribute::ALIAS,
		"LAST_OUTLINE"                   => OutlineAttribute::ALIAS,
		"EPOXY_TEMPLATE_ID"              => EpoxyTemplateAttribute::ALIAS,
		"PRICE_MARGIN_PERCENTAGE"        => PriceMarginPercentageAttribute::ALIAS,
		"REORDER"                        => ReorderAttribute::ALIAS,
		"IS_CHANGED"                     => ChangedAttribute::ALIAS,
		"FIGURE_ID"                      => FigureAttribute::ALIAS,
		"MATERIAL_COLOR"                 => MaterialColorAttribute::ALIAS,
	);

	public function __construct()
	{
		$this->productNameConverter = new LegacyProductNameConverter();
		$this->attrConverter = new MaterialAndLaminateLegacyValueConverter();
		$this->customizationConverter = new CustomizationValueConverter();
		$this->sheetMetaConverter = new SheetMetaValueConverter();
	}

	public function identifyLegacyProductAndConvertToItem(string $sheetType, ?string $sheetName, ?int $templateID, ?int $quantity, ?int $widthMM, ?int $heightMM, ?string $legacyMaterialName, ?string $legacyLaminateName, ?array $meta = null, ?array $customizations = null): ProductItem
	{
		$productItem = $this->productNameConverter->identifyProduct($sheetType, $sheetName, $legacyMaterialName, $legacyLaminateName, $meta, $customizations);
		$productItem->setUnits($quantity);
		$productItem->setAttributes(array(
			SheetTypeAttribute::ALIAS         => $sheetType,
			StickerSheetNameAttribute::ALIAS  => $sheetName,
			QuantityAttribute::ALIAS          => $quantity,
			WidthAttribute::ALIAS             => $widthMM,
			HeightAttribute::ALIAS            => $heightMM,
			MaterialAttribute::ALIAS          => $legacyMaterialName,
			LaminateAttribute::ALIAS          => $legacyLaminateName,
			TemplateAttribute::ALIAS          => $templateID,
		));

		if ($productItem->productFamilyName == CustomStickerFamily::NAME  || $productItem->productFamilyName == SkinProductFamily::NAME)
		{
			if ($productItem->productFamilyName == CustomStickerFamily::NAME)
			{
				$productItem->setUnits(($widthMM * $heightMM * $quantity) / 1000000);
			}
			if (!$legacyMaterialName)
			{
				if ($sheetType == "skin")
				{
					$legacyMaterialName = $this->attrConverter->getLegacyMaterialName(MaterialAttribute::SKIN);
				}
				else
				{
					$legacyMaterialName = "arlon";
				}
			}
			if ( !$legacyLaminateName || $legacyLaminateName == "false" )
			{
				if ($sheetType == "skin")
				{
					$legacyLaminateName = $this->attrConverter->getLegacyLaminateName(LaminateAttribute::SANDY);
				}
				else if ($productItem->productName == CustomStickerFamily::PRODUCT_SHEET_LEGACY )
				{
					$legacyLaminateName = $this->attrConverter->getLegacyLaminateName(LaminateAttribute::GLOSSY_UV);
				}
				else
				{
					$legacyLaminateName = LaminateAttribute::UNCOATED;
				}
			}
			if (!$this->attrConverter->getNewMaterialName($legacyMaterialName))
			{
				throw new ErrorException("Legacy material name not found: $legacyMaterialName.");
			}
			if (!$this->attrConverter->getNewLaminateName($legacyLaminateName))
			{
				throw new ErrorException("Legacy laminate name not found: $legacyLaminateName.");
			}

			// Detect production line
			if ($productionLine = $this->attrConverter->identifyProductionLine($legacyMaterialName))
			{
				$productItem->setAttribute(ProductionLineAttribute::ALIAS, $productionLine);
			}

			// TODO: NOT SURE THIS SHOULD BE HERE. THIS SHOULD BE SET BY THE META.
			switch ($productItem->productName)
			{
				case CustomStickerFamily::PRODUCT_DIE_CUT:

					$productItem->setAttribute(DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SINGLE);

					break;
				case CustomStickerFamily::PRODUCT_LABELS_ON_SHEET:

					$productItem->setAttribute(DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SHEET);

					break;
				case CustomStickerFamily::PRODUCT_LABELS_ON_ROLL:

					$productItem->setAttribute(DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_ROLL);

					break;
				case CustomStickerFamily::PRODUCT_SHEET:
				case CustomStickerFamily::PRODUCT_SHEET_KISS_CUT:

					$productItem->setAttribute(InnercutAsKisscutAttribute::ALIAS, InnercutAsKisscutAttribute::YES);
					$productItem->setAttribute(StickerSheetNameAttribute::ALIAS, strpos($sheetName, StickerSheetNameAttribute::ROUNDED) !== FALSE ? StickerSheetNameAttribute::ROUNDED : StickerSheetNameAttribute::RECTANGLE);
					$productItem->setAttribute(DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SINGLE);

					break;
				case CustomStickerFamily::PRODUCT_SHEET_LEGACY:

					$productItem->setAttribute(InnercutAsKisscutAttribute::ALIAS, InnercutAsKisscutAttribute::NO);
					$productItem->setAttribute(DeliveryAttribute::ALIAS, DeliveryAttribute::DELIVERY_SINGLE);

					break;
				case CustomStickerFamily::PRODUCT_TRANSFER_DECAL:

					$productItem->setAttribute(FeatureAttribute::ALIAS, array(FeatureAttribute::TRANSFER_TAPE));
					$productItem->setAttribute(ProductionLineAttribute::ALIAS, ProductionLineAttribute::DIGITAL);

					break;
				case CustomStickerFamily::PRODUCT_LIBRARY_DESIGN:

					$productItem->setAttribute(FigureAttribute::ALIAS, $templateID );
					$productItem->setAttribute(ProductionLineAttribute::ALIAS, ProductionLineAttribute::DIGITAL);

					break;
			}

			$productItem->setAttribute(MaterialAttribute::ALIAS, $this->attrConverter->getNewMaterialName($legacyMaterialName));
			$productItem->setAttribute(LaminateAttribute::ALIAS, $this->attrConverter->getNewLaminateName($legacyLaminateName));
		}
		else if ($productItem->productFamilyName == PhoneCaseProductFamily::NAME)
		{
			if (!$legacyMaterialName)
			{
				$productItem->setAttribute(MaterialAttribute::ALIAS, CaseMaterialAttr::GLOSSY);
			}
		}

		return $productItem;
	}

	/**
	 * @param LegacySheetFormattedEditorData|array $legacySheetData
	 */
	public function createItemFromLegacySheetData($legacySheetData, array $sheetMeta, array $sheetCustomizations): ProductItem
	{
		$productFamilyName = array_key_exists("PRODUCT_FAMILY_NAME", $sheetMeta) ? $sheetMeta['PRODUCT_FAMILY_NAME'] : NULL;
		$productName       = array_key_exists("PRODUCT_NAME", $sheetMeta) ? $sheetMeta['PRODUCT_NAME'] : NULL;
		$sheetName =  $legacySheetData['sheet_name'] ?? null;
		if (!$productFamilyName || !$productName)
		{
			$designID = array_key_exists("design_id", $legacySheetData) ? intval($legacySheetData['design_id']) : null;
			$item     = $this->identifyLegacyProductAndConvertToItem(
				$legacySheetData['sheet_type'], 
				$sheetName, 
				$designID, 
				$legacySheetData['quantity'], 
				$legacySheetData['width'], 
				$legacySheetData['height'], 
				$legacySheetData['material'], 
				$legacySheetData['laminate'], 
				$sheetMeta, 
				$sheetCustomizations
			);
			// Make sure we use the identified production line, and not resetting it later when setting attributes from meta.
			unset( $sheetMeta['PRODUCTION_LINE'] );
		}
		else
		{
			$item = new ProductItem($productFamilyName, $productName);
			$item->setAttributes(array(
				SheetTypeAttribute::ALIAS         =>  $legacySheetData['sheet_type'],
				StickerSheetNameAttribute::ALIAS  => $sheetName,
				TemplateAttribute::ALIAS          => $legacySheetData['design_id'] ?? null,
				QuantityAttribute::ALIAS          => $legacySheetData['quantity'],
				WidthAttribute::ALIAS             =>  $legacySheetData['width'],
				HeightAttribute::ALIAS            => $legacySheetData['height'],
				MaterialAttribute::ALIAS          => $legacySheetData['material'],
				LaminateAttribute::ALIAS          =>  $legacySheetData['laminate'],
			));

			if ($item->productFamilyName == CustomStickerFamily::NAME)
			{
				$item->setUnits(($item->getAttribute("width_mm") * $item->getAttribute("height_mm") * $item->getAttribute("quantity")) / 1000000);
			}
			else
			{
				$item->setUnits($legacySheetData['quantity']);
			}
		}

		$item = $this->setAttributesFromLegacyData($sheetMeta, $sheetCustomizations, $item);
		$item->setAttribute(NoteAttribute::ALIAS, $legacySheetData['note'] ?? NULL);

		return $item;
	}

	public function setAttributesFromLegacyData(array $sheetMeta, ?array $customizations, ProductItem &$item): ProductItem
	{
		if ($sheetMeta)
		{
			$this->sheetMetaConverter->setAttributesFromSheetMeta($sheetMeta, $item);
		}

		if ($customizations)
		{
			$this->customizationConverter->setAttributesFromCustomizations($customizations, $item);
		}

		return $item;
	}

	public function createLegacySheetDataFromItem(ProductItem $productItem, $sheetID = NULL, ?array $parts = array()): array
	{
		// TODO: Missing price details: price, total, discount_amount, giftcard_amount, production_status
		$sheet = array(
			"sheet_id"      => $sheetID,
			"sheet_name"    => $productItem->getAttribute("sheet_name"),
			"sheet_type"    => $productItem->getAttribute("sheet_type"),
			"material"      => $productItem->getAttribute("material"),
			"laminate"      => $productItem->getAttribute("laminate"),
			"width"         => $productItem->getAttribute(WidthAttribute::ALIAS),
			"height"        => $productItem->getAttribute(HeightAttribute::ALIAS),
			"quantity"      => $productItem->getAttribute(QuantityAttribute::ALIAS),
			"meta"          => $this->sheetMetaConverter->extractSheetMetaFromProductItem($productItem),
			"customization" => $this->customizationConverter->extractCustomizationsFromProductItem($productItem),
			"note"          => $productItem->getAttribute(NoteAttribute::ALIAS),
			//				"price"         => $editor->getCharge()->priceUnformatted, // TODO: Fetch price from item
			//				"total"         => $editor->getCharge()->totalUnformatted, // TODO: Fetch total from item
			"parts"         => $parts,
		);

		return $sheet;
	}
}
