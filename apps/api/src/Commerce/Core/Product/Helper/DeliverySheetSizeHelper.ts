import { ProductItem } from "../Item/ProductItem";

export class DeliverySheetSizeHelper
{
	constructor( protected productItem: ProductItem ) {}

	public static readonly WIDTH_DEFAULT           = 204;
	public static readonly HEIGHT_DEFAULT          = 270;
	public static readonly INSIDE_PADDING_DEFAULT  = 2;
	public static readonly OUTSIDE_PADDING_DEFAULT = 0;

	public minimizeWidth(): void
	{
		const stickerWidth = this.productItem.getAttribute<number>( "width_mm" ) ?? 0;

		const cols = Math.floor( this.sheetWidth / ( this.insidePadding + stickerWidth + this.insidePadding ) );
		
		const newWidth = ( cols * ( this.insidePadding + stickerWidth + this.insidePadding ) ) + 2 + this.outsidePadding + this.outsidePadding;

		this.productItem.setAttribute( "delivery_sheet_width", newWidth );
	}

	public minimizeHeight(): void
	{
		const stickerHeight = this.productItem.getAttribute<number>( "height_mm" ) ?? 0;
		
		const rows = Math.floor( this.sheetHeight / (this.insidePadding + stickerHeight + this.insidePadding ) );
		
		const newHeight = ( rows * ( this.insidePadding + stickerHeight + this.insidePadding ) ) + 2 + this.outsidePadding + this.outsidePadding;

		this.productItem.setAttribute( "delivery_sheet_height", newHeight );
	}

	public setDefaultValues(): void
	{
		this.productItem.setAttribute( 'delivery_sheet_width', DeliverySheetSizeHelper.WIDTH_DEFAULT );
		this.productItem.setAttribute( 'delivery_sheet_height', DeliverySheetSizeHelper.HEIGHT_DEFAULT );
		this.productItem.setAttribute( 'delivery_sheet_inside_padding', DeliverySheetSizeHelper.INSIDE_PADDING_DEFAULT );
		this.productItem.setAttribute( 'delivery_sheet_outside_padding', DeliverySheetSizeHelper.OUTSIDE_PADDING_DEFAULT );
	}

	public get sheetHeight(): number
	{
		return this.toFixedInt( this.productItem.getAttribute( "delivery_sheet_height" ) );
	}

	public get sheetWidth(): number
	{
		return this.toFixedInt( this.productItem.getAttribute( "delivery_sheet_width" ) );
	}

	public get insidePadding(): number
	{
		return this.toFixedInt( this.productItem.getAttribute( "delivery_sheet_inside_padding" ) )
	}

	public get outsidePadding(): number
	{
		return this.toFixedInt( this.productItem.getAttribute( "delivery_sheet_outside_padding" ) );
	}

	private toFixedInt( value: any ): number
	{
		let fixedValue = parseInt( Number( value ).toFixed( 0 ) );

		return isNaN( fixedValue ) ? 0 : fixedValue;
	}
}
