<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Helper;

use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;

use function array_key_exists;
use function array_search;
use function array_shift;

class MaterialAndLaminateLegacyValueConverter
{
	public array $materials = array(
		"arlon"                      => MaterialAttribute::WHITE,
		"epoxy"                      => MaterialAttribute::WHITE_STURDY,
		"Hi-Tack_Oracal"             => MaterialAttribute::WHITE_HI_TACK,
		"white_label"                => MaterialAttribute::WHITE,
		"w_pp_thick"                 => MaterialAttribute::WHITE,
		"not_w_pp_thick"             => MaterialAttribute::WHITE,
		"double_sided"               => MaterialAttribute::WHITE,
		"removable"                  => MaterialAttribute::WHITE_REMOVABLE,
		"removable_digi"             => MaterialAttribute::WHITE_REMOVABLE,
		"floor_sticker"              => MaterialAttribute::WHITE,
		"hi_tack_digi"               => MaterialAttribute::WHITE_HI_TACK,
		"hi_tack"                    => MaterialAttribute::WHITE_HI_TACK,
		"arlon_hitack"               => MaterialAttribute::WHITE_HI_TACK,
		"backscore_white"            => MaterialAttribute::WHITE_BACKSCORE,
		"pixie_dust"                 => MaterialAttribute::PIXIE_DUST,
		"wall_sticker_geckotex"      => MaterialAttribute::WHITE_WALL,
		"3m_skin"                    => MaterialAttribute::SKIN,
		"3m_nailskins"               => MaterialAttribute::SKIN,
		"window"                     => MaterialAttribute::CLEAR, // Unsure about this one
		"t_pp_thick"                 => MaterialAttribute::CLEAR,
		"not_t_pp_thick"             => MaterialAttribute::CLEAR,
		"clear_label"                => MaterialAttribute::CLEAR,
		"backscore_trans"            => MaterialAttribute::CLEAR_BACKSCORE,
		"double_sided_transparent"   => MaterialAttribute::CLEAR,
		"transparent"                => MaterialAttribute::CLEAR,
		"borstad_alu_laser"          => MaterialAttribute::BRUSHED_ALLOY,
		"brushed_alloy"              => MaterialAttribute::BRUSHED_ALLOY,
		"mirror_thick_laser"         => MaterialAttribute::MIRROR,
		"mirror"                     => MaterialAttribute::MIRROR,
		"fluorescent"                => MaterialAttribute::FLUORESCENT,
		"magnetic"                   => MaterialAttribute::MAGNETIC,
		"reflective"                 => MaterialAttribute::REFLECTIVE, // Unsure about this one
		"reflective_thick"           => MaterialAttribute::REFLECTIVE, // Unsure about this one
		"kraft_paper"                => MaterialAttribute::KRAFT_PAPER,
		"holographic_pp_laser"       => MaterialAttribute::HOLOGRAPHIC,
		"bubble_free"                => MaterialAttribute::BUBBLE_FREE,
		"frosted"                    => MaterialAttribute::FROSTED,
		"prismatic_pp_laser"         => MaterialAttribute::PRISMATIC,
		"glitter"                    => MaterialAttribute::GLITTER,
		"glow_in_the_dark"           => MaterialAttribute::GITD,
		"white_pp_thin_liner"        => MaterialAttribute::WHITE_THIN, // What is this?! Do we have different thickness of white as well?
		"die_cut_vinyl"              => MaterialAttribute::COLORED_VINYL,
		"double_sided_coverall"      => MaterialAttribute::WHITE_COVERALL,
		"coverall"                   => MaterialAttribute::WHITE_COVERALL,
		"satin_matte"                => MaterialAttribute::SATIN_MATTE,
		"silver_metallic"            => MaterialAttribute::METALLIC_SILVER,
		"gold_metallic"              => MaterialAttribute::METALLIC_GOLD,
		"warranty"                   => MaterialAttribute::WARRANTY,
		"heat_transfer"              => MaterialAttribute::HEAT_TRANSFER,
	);

	public array $laminates = array(
		"glossy"              => LaminateAttribute::GLOSSY_UV,
		"uv_gloss_pet"        => LaminateAttribute::GLOSSY_UV,
		"12_mil_heavy_duty"   => LaminateAttribute::GLOSSY_UV_12_MIL_HEAVY_DUTY,
		"gloss"               => LaminateAttribute::GLOSSY_THIN_NO_UV,
		"gloss_pet"           => LaminateAttribute::GLOSSY_NO_UV,
		"sandy"               => LaminateAttribute::SANDY,
		"epoxy"               => LaminateAttribute::EPOXY,
		"soft_touch"          => LaminateAttribute::SOFT_TOUCH,
		"uncoated"            => LaminateAttribute::UNCOATED,
		"appliceringsfilm"    => LaminateAttribute::UNCOATED,
		"satin_matte"         => LaminateAttribute::SATIN_MATTE,
		"cracked_ice_holo"    => LaminateAttribute::CRACKED_ICE,
		"pebble"              => LaminateAttribute::PEBBLE,
		"super_rough"         => LaminateAttribute::SUPER_ROUGH,
		"textured_pp"         => LaminateAttribute::TEXTURED,
		"white_window"        => LaminateAttribute::WHITE_WINDOW,
		"thin_glossy"         => LaminateAttribute::GLOSSY_THIN,
	);

	public function identifyProductionLine(string $legacyMaterialName): ?string
	{
		switch ($legacyMaterialName)
		{
			case "mirror_thick_laser":
			case "t_pp_thick":
			case "borstad_alu_laser":
			case "hi_tack":
			case "removable":
			case "reflective_thick":
			case "window":
			case "holographic_pp_laser":
			case "glow_in_the_dark":
			case "glitter":
			case "kraft_paper":
			case "white_label":
			case "clear_label":
			case "w_pp_thick":
			case "warranty":
			case "white_pp_thin_liner":
			case "backscore_trans":
			case "backscore_white":
			case "prismatic_pp_laser":
			case "glitter":
			case "glow_in_the_dark":
			case "pixie_dust":


				return ProductionLineAttribute::LASER;

				break;
			case "hi_tack_digi":
			case "mirror":
			case "transparent":
			case "double_sided_transparent":
			case "brushed_alloy":
			case "arlon_hitack":
			case "Hi-Tack_Oracal":
			case "removable_digi":
			case "reflective":
			case "arlon":
			case "wall_sticker_geckotex":
			case "floor_sticker":
			case "epoxy":

				return ProductionLineAttribute::DIGITAL;

				break;

			case "special":

				return ProductionLineAttribute::SPECIAL;

				break;

		}

		return null;
	}

	public function getNewMaterialName(string $legacyMaterialName): ?string
	{
		if (array_key_exists($legacyMaterialName, $this->materials))
		{
			return $this->materials[$legacyMaterialName];
		}

		return NULL;
	}

	public function getNewLaminateName(string $legacyLaminateName): ?string
	{
		if (array_key_exists($legacyLaminateName, $this->laminates))
		{
			return $this->laminates[$legacyLaminateName];
		}

		return NULL;
	}

	public function getLegacyMaterialName(string $productMaterialName): ?string
	{
		return array_search($productMaterialName, $this->materials);
	}

	public function getLegacyMaterialNames(string $productMaterialName): array
	{
		return array_keys(array_filter($this->materials, function ($material) use ($productMaterialName)
		{

			return $material == $productMaterialName;
		}));
	}

	public function getLegacyLaminateName(string $productLaminateName): ?string
	{
		return array_search($productLaminateName, $this->laminates);
	}
}
