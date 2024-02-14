<?php

namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Icon;

use StickerApp\Babylon\Commerce\Core\Product\Attribute\Icon\ProductAttrIconCollection;
use StickerApp\Babylon\Commerce\Core\Product\Attribute\Icon\ProductAttrIcon;

use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\StickerSheetNameAttribute;

class StickerAttributeIconCollection extends ProductAttrIconCollection
{
    const NAME = "icons";

    public function __construct()
    {
		parent::__construct(self::NAME);

		$backgroundURL = [
			"white" => "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png",
			"clear" => "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/03/09/2d46e2873ec899b83a152c2f2ad52c1368398333.png",
			"kraft" => "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/03/09/e4ae8c4973e6e530cedcce836d8366638ca4c6d3.png",
			"mirror" => "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/03/09/c5e0f009dbf3aec33b2e8d0caac5ebcd1a10348f.png"
		];
		
        $materials = [
            MaterialAttribute::WHITE 			=> $backgroundURL[ "white" ],
            MaterialAttribute::WHITE_REMOVABLE 	=> $backgroundURL[ "white" ],
            MaterialAttribute::WHITE_HI_TACK 	=> $backgroundURL[ "white" ],
            MaterialAttribute::WHITE_WALL 		=> $backgroundURL[ "white" ],
            MaterialAttribute::WHITE_STURDY 	=> $backgroundURL[ "white" ],
            MaterialAttribute::WHITE_THIN 		=> $backgroundURL[ "white" ],
            MaterialAttribute::PAPER_THIN 		=> $backgroundURL[ "white" ],
            MaterialAttribute::CLEAR 			=> $backgroundURL[ "clear" ],
            MaterialAttribute::CLEAR_THIN 		=> $backgroundURL[ "clear" ],
            MaterialAttribute::KRAFT_PAPER 		=> $backgroundURL[ "kraft" ],
            MaterialAttribute::KRAFT_THIN 		=> $backgroundURL[ "kraft" ],
            MaterialAttribute::MIRROR 			=> $backgroundURL[ "mirror" ],
            MaterialAttribute::SILVER_THIN 		=> $backgroundURL[ "mirror" ],
            MaterialAttribute::PRISMATIC 		=> "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/03/09/0912457c4dccf212c92e0802fd36545d90f2bfd6.png",
            MaterialAttribute::HOLOGRAPHIC 		=> "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/03/09/48e2c5c8c6ab57d013675b3b245daa2136e0c7cf.png",
            MaterialAttribute::GLITTER 			=> "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/03/09/8d48777356c014861f8e174949f2a382778c0a7e.png",
            MaterialAttribute::BRUSHED_ALLOY 	=> "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/03/09/573a155499c9496b21c3f404bffb6499ae99462e.png",
            MaterialAttribute::GITD 			=> "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/03/09/c23d3c3023560c21da44135bd142dc04affa380e.png",
            MaterialAttribute::PIXIE_DUST 		=> "https://d6ce0no7ktiq.cloudfront.net/images/attachment/2023/08/23/46dac2bd418951b1412d4225cbdaad579aed03e4.png",
        ];

        $shapes = [
            StickerSheetNameAttribute::CONTOUR => static_url() . "images/web/wizard/ic_contourcut.svg",
            StickerSheetNameAttribute::RECTANGLE => static_url() . "images/web/wizard/ic_square.svg",
            StickerSheetNameAttribute::ROUND => static_url() . "images/web/wizard/ic_circle.svg",
            StickerSheetNameAttribute::ROUNDED => static_url() . "images/web/wizard/ic_round-corners.svg",
            StickerSheetNameAttribute::SHEET => static_url() . "images/web/wizard/ic_stickers-sheets.svg",
            StickerSheetNameAttribute::TEMPLATE => static_url() . "images/web/wizard/ic_on-sheet.svg",
            StickerSheetNameAttribute::STICKER => static_url() . "images/web/wizard/ic_kiss-cut.svg",
        ];

        foreach ($materials as $material => $url) {
            $this->addIcon(new ProductAttrIcon(MaterialAttribute::ALIAS, $material, $url));
        }

        foreach ($shapes as $shape => $url) {
            $this->addIcon(new ProductAttrIcon(StickerSheetNameAttribute::ALIAS, $shape, $url));
        }
    }
}
