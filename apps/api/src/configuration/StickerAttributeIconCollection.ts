import { ProductAttrIcon } from "$/product/attribute/Icon/ProductAttrIcon";
import { ProductAttrIconCollection } from "$/product/attribute/Icon/ProductAttrIconCollection";
import { ProductService } from "$/product/ProductService";
import { MaterialAttribute, MaterialValues } from "./attributes/MaterialAttribute";
import { StickerSheetNameAttribute, StickerSheetNameValues } from "./attributes/StickerSheetNameAttribute";

export class StickerAttributeIconCollection extends ProductAttrIconCollection {
	public static readonly NAME = "icons";

	public constructor( service: ProductService ) {
		super( StickerAttributeIconCollection.NAME );

		const icons: Record<string, string> = {
			[ MaterialValues.WHITE ]             : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialValues.WHITE_REMOVABLE ]   : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialValues.WHITE_HI_TACK ]	    : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialValues.WHITE_WALL ]        : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialValues.WHITE_STURDY ]      : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialValues.WHITE_THIN ]        : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialValues.PAPER_THIN ]        : '/images/attachment/2023/06/08/4d0ae46e9e164daa9171d70e51cd46c7acaa2419.png',
			[ MaterialValues.CLEAR ]             : '/images/attachment/2023/03/09/2d46e2873ec899b83a152c2f2ad52c1368398333.png',
			[ MaterialValues.CLEAR_THIN ]        : '/images/attachment/2023/03/09/2d46e2873ec899b83a152c2f2ad52c1368398333.png',
			[ MaterialValues.KRAFT_PAPER ]       : '/images/attachment/2023/03/09/e4ae8c4973e6e530cedcce836d8366638ca4c6d3.png',
			[ MaterialValues.KRAFT_THIN ]        : '/images/attachment/2023/03/09/e4ae8c4973e6e530cedcce836d8366638ca4c6d3.png',
			[ MaterialValues.MIRROR ]            : '/images/attachment/2023/03/09/c5e0f009dbf3aec33b2e8d0caac5ebcd1a10348f.png',
			[ MaterialValues.SILVER_THIN ]       : '/images/attachment/2023/03/09/c5e0f009dbf3aec33b2e8d0caac5ebcd1a10348f.png',
			[ MaterialValues.PRISMATIC ]	        : '/images/attachment/2023/03/09/0912457c4dccf212c92e0802fd36545d90f2bfd6.png',
			[ MaterialValues.HOLOGRAPHIC ]       : '/images/attachment/2023/03/09/48e2c5c8c6ab57d013675b3b245daa2136e0c7cf.png',
			[ MaterialValues.GLITTER ]           : '/images/attachment/2023/03/09/8d48777356c014861f8e174949f2a382778c0a7e.png',
			[ MaterialValues.BRUSHED_ALLOY ]     : '/images/attachment/2023/03/09/573a155499c9496b21c3f404bffb6499ae99462e.png',
			[ MaterialValues.GITD ]              : '/images/attachment/2023/03/09/c23d3c3023560c21da44135bd142dc04affa380e.png',
			[ MaterialValues.PIXIE_DUST ]        : '/images/attachment/2023/08/23/46dac2bd418951b1412d4225cbdaad579aed03e4.png',
			[ StickerSheetNameValues.CONTOUR ]   : '/images/web/wizard/ic_contourcut.svg',
			[ StickerSheetNameValues.RECTANGLE ] : '/images/web/wizard/ic_square.svg',
			[ StickerSheetNameValues.ROUND ]     : '/images/web/wizard/ic_circle.svg',
			[ StickerSheetNameValues.ROUNDED ]   : '/images/web/wizard/ic_round-corners.svg',
			[ StickerSheetNameValues.SHEET ]     : '/images/web/wizard/ic_stickers-sheets.svg',
			[ StickerSheetNameValues.TEMPLATE ]  : '/images/web/wizard/ic_on-sheet.svg',
			[ StickerSheetNameValues.STICKER ]   : '/images/web/wizard/ic_kiss-cut.svg',
		};

		for ( const StickerAttributeWithIcon of [ MaterialAttribute, StickerSheetNameAttribute ] ) {
			const productAttr = service.retrieveAttribute( StickerAttributeWithIcon.getName() );
			for ( const productAttrValue of productAttr.getValues() ) {
				const iconPath = icons[ productAttrValue.toString() ] ?? '/images/web/wizard/ic_wiz-placeholder.png';
				this.addIcon( new ProductAttrIcon( StickerAttributeWithIcon.getName(), productAttrValue.toString(), `https://d6ce0no7ktiq.cloudfront.net${ iconPath }` ) );
			}
		}
	}
}
