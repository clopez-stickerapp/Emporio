import { ProductAttrIcon } from "$/product/attribute/Icon/ProductAttrIcon";
import { ProductAttrIconCollection } from "$/product/attribute/Icon/ProductAttrIconCollection";
import { ProductService } from "$/product/ProductService";
import { MaterialAttribute } from "../MaterialAttribute";
import { StickerSheetNameAttribute } from "../StickerSheetNameAttribute";

export class StickerAttributeIconCollection extends ProductAttrIconCollection {
	public static readonly NAME = "icons";

	public constructor( service: ProductService ) {
		super( StickerAttributeIconCollection.NAME );

		const icons: Record<string, string> = {
			[ MaterialAttribute.WHITE ]             : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialAttribute.WHITE_REMOVABLE ]   : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialAttribute.WHITE_HI_TACK ]	    : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialAttribute.WHITE_WALL ]        : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialAttribute.WHITE_STURDY ]      : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialAttribute.WHITE_THIN ]        : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialAttribute.PAPER_THIN ]        : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialAttribute.CLEAR ]             : '/images/attachment/2023/03/09/2d46e2873ec899b83a152c2f2ad52c1368398333.png',
			[ MaterialAttribute.CLEAR_THIN ]        : '/images/attachment/2023/03/09/2d46e2873ec899b83a152c2f2ad52c1368398333.png',
			[ MaterialAttribute.KRAFT_PAPER ]       : '/images/attachment/2023/03/09/e4ae8c4973e6e530cedcce836d8366638ca4c6d3.png',
			[ MaterialAttribute.KRAFT_THIN ]        : '/images/attachment/2023/03/09/e4ae8c4973e6e530cedcce836d8366638ca4c6d3.png',
			[ MaterialAttribute.MIRROR ]            : '/images/attachment/2023/03/09/c5e0f009dbf3aec33b2e8d0caac5ebcd1a10348f.png',
			[ MaterialAttribute.SILVER_THIN ]       : '/images/attachment/2023/03/09/c5e0f009dbf3aec33b2e8d0caac5ebcd1a10348f.png',
			[ MaterialAttribute.PRISMATIC ]	        : '/images/attachment/2023/03/09/0912457c4dccf212c92e0802fd36545d90f2bfd6.png',
			[ MaterialAttribute.HOLOGRAPHIC ]       : '/images/attachment/2023/03/09/48e2c5c8c6ab57d013675b3b245daa2136e0c7cf.png',
			[ MaterialAttribute.GLITTER ]           : '/images/attachment/2023/03/09/8d48777356c014861f8e174949f2a382778c0a7e.png',
			[ MaterialAttribute.BRUSHED_ALLOY ]     : '/images/attachment/2023/03/09/573a155499c9496b21c3f404bffb6499ae99462e.png',
			[ MaterialAttribute.GITD ]              : '/images/attachment/2023/03/09/c23d3c3023560c21da44135bd142dc04affa380e.png',
			[ MaterialAttribute.PIXIE_DUST ]        : '/images/attachment/2023/08/23/46dac2bd418951b1412d4225cbdaad579aed03e4.png',
			[ StickerSheetNameAttribute.CONTOUR ]   : '/images/web/wizard/ic_contourcut.svg',
			[ StickerSheetNameAttribute.RECTANGLE ] : '/images/web/wizard/ic_square.svg',
			[ StickerSheetNameAttribute.ROUND ]     : '/images/web/wizard/ic_circle.svg',
			[ StickerSheetNameAttribute.ROUNDED ]   : '/images/web/wizard/ic_round-corners.svg',
			[ StickerSheetNameAttribute.SHEET ]     : '/images/web/wizard/ic_stickers-sheets.svg',
			[ StickerSheetNameAttribute.TEMPLATE ]  : '/images/web/wizard/ic_on-sheet.svg',
			[ StickerSheetNameAttribute.STICKER ]   : '/images/web/wizard/ic_kiss-cut.svg',
		};

		for ( const StickerAttributeWithIcon of [ MaterialAttribute, StickerSheetNameAttribute ] ) {
			const productAttr = service.retrieveAttribute( StickerAttributeWithIcon.name );
			for ( const productAttrValue of productAttr.getValues() ) {
				const iconPath = icons[ productAttrValue.getValue().toString() ] ?? '/images/web/wizard/ic_wiz-placeholder.png';
				this.addIcon( new ProductAttrIcon( StickerAttributeWithIcon.ALIAS, productAttrValue.getValue().toString(), `https://d6ce0no7ktiq.cloudfront.net${ iconPath }` ) );
			}
		}
	}
}
