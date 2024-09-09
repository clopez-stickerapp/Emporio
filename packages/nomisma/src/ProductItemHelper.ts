import { ProductItem } from "./ProductItem";
import { MultiValueHelper } from "./MultiValueHelper";

export class ProductItemHelper
{
	public feature: MultiValueHelper;

	public constructor( public item: ProductItem )
	{
		this.feature = new MultiValueHelper( item, 'feature' );
	}

	public getSheetType(): string | undefined
	{
		return this.item.getAttribute( 'sheet_type' );
	}

	public setSheetType( sheetType: string ): void
	{
		this.item.setAttribute( 'sheet_type', sheetType );
	}

	public getMaterial(): string | undefined
	{
		return this.item.getAttribute( 'material' );
	}

	public setMaterial( material: string ): void
	{
		this.item.setAttribute( 'material', material );
	}

	public getLaminate(): string | undefined
	{
		return this.item.getAttribute( 'laminate' );
	}

	public setLaminate( laminate: string ): void
	{
		this.item.setAttribute( 'laminate', laminate );
	}

	public getWidthMM(): number | undefined
	{
		return this.item.getAttribute( 'width_mm' );
	}

	public setWidthMM( width: number ): void
	{
		this.item.setAttribute( 'width_mm', width );
	}

	public getHeightMM(): number | undefined
	{
		return this.item.getAttribute( 'height_mm' );
	}

	public setHeightMM( height: number ): void
	{
		this.item.setAttribute( 'height_mm', height );
	}

	public getQuantity(): number | undefined
	{
		return this.item.getAttribute( 'quantity' );
	}

	public setQuantity( quantity: number ): void
	{
		this.item.setAttribute( 'quantity', quantity );
	}

	public getPriceMarginPercentage(): number | undefined
	{
		return this.item.getAttribute( 'price_margin_percentage' );
	}

	public setPriceMarginPercentage( percentage: number ): void
	{
		this.item.setAttribute( 'price_margin_percentage', percentage );
	}

	public getChanged(): number | undefined
	{
		return this.item.getAttribute( 'changed' );
	}

	public setChanged( changed: number ): void
	{
		this.item.setAttribute( 'changed', changed );
	}

	public getFigureID(): number | undefined
	{
		return this.item.getAttribute( 'figure_id' );
	}

	public setFigureID( id: number ): void
	{
		this.item.setAttribute( 'figure_id', id );
	}

	public getReorderID(): number | undefined
	{
		return this.item.getAttribute( 'reorder_id' );
	}

	public isReorder(): boolean
	{
		return ( this.getReorderID() ?? 0 ) > 0
	}

	public setReorderID( id: number ): void
	{
		this.item.setAttribute( 'reorder_id', id );
	}

	public getNote(): string | undefined
	{
		return this.item.getAttribute( 'note' );
	}

	public setNote( note: string ): void
	{
		this.item.setAttribute( 'note', note );
	}

	public getSheetTypeSaveAs(): string | undefined
	{
		const saveAs = this.item.getAttribute<string>( 'sheet_type_save_as' );

		return saveAs ? saveAs : this.getSheetType();
	}

	public setSheetTypeSaveAs( sheetTypeSaveAs: string ): void
	{
		this.item.setAttribute( 'sheet_type_save_as', sheetTypeSaveAs );
	}

	public getSheetName(): string | undefined
	{
		return this.item.getAttribute( 'sheet_name' );
	}

	public setSheetName( sheetName: string ): void
	{
		this.item.setAttribute( 'sheet_name', sheetName );
	}

	public getTemplateID(): number | undefined
	{
		return this.item.getAttribute( 'template_id' );
	}

	public setTemplateID( id: number ): void
	{
		this.item.setAttribute( 'template_id', id );
	}

	public getSize(): string | undefined
	{
		return this.item.getAttribute( 'size' );
	}

	public setSize( size: string ): void
	{
		this.item.setAttribute( 'size', size );
	}

	public getImperialUnits(): boolean | undefined
	{
		return this.item.getAttribute( 'imperial_units' );
	}

	public setImperialUnits( imperialUnits: boolean ): void
	{
		this.item.setAttribute( 'imperial_units', imperialUnits );
	}

	public getProductionLine(): string | undefined
	{
		return this.item.getAttribute( 'production_line' );
	}

	public setProductionLine( productionLine: string ): void
	{
		this.item.setAttribute( 'production_line', productionLine );
	}

	public getProductionInstruction(): string | undefined
	{
		return this.item.getAttribute( 'production_instruction' );
	}

	public setProductionInstruction( productionInstruction: string ): void
	{
		this.item.setAttribute( 'production_instruction', productionInstruction );
	}

	public getDelivery(): string | undefined
	{
		return this.item.getAttribute( 'delivery' );
	}

	public setDelivery( delivery: string ): void
	{
		this.item.setAttribute( 'delivery', delivery );
	}

	public getEpoxyTemplateID(): number | undefined
	{
		return this.item.getAttribute( 'epoxy_template_id' );
	}

	public setEpoxyTemplateID( id: number ): void
	{
		this.item.setAttribute( 'epoxy_template_id', id );
	}

	public getInnerCutAsKissCut(): string | undefined
	{
		return this.item.getAttribute( 'innercut_as_kisscut' );
	}

	public setInnerCutAsKissCut( innerCutAsKissCut: string ): void
	{
		this.item.setAttribute( 'innercut_as_kisscut', innerCutAsKissCut );
	}

	public getWhiteLayer(): string | undefined
	{
		return this.item.getAttribute( 'white_layer' );
	}

	public setWhiteLayer( whiteLayer: string ): void
	{
		this.item.setAttribute( 'white_layer', whiteLayer );
	}

	public getCutDirection(): string | undefined
	{
		return this.item.getAttribute( 'cut_direction' );
	}

	public setCutDirection( direction: string ): void
	{
		this.item.setAttribute( 'cut_direction', direction );
	}

	public getImageFilters(): string[] | undefined
	{
		return this.item.getAttribute( 'image_filters' );
	}

	public setImageFilters( imageFilters: string[] ): void
	{
		this.item.setAttribute( 'image_filters', imageFilters );
	}

	public getOutline(): string | undefined
	{
		return this.item.getAttribute( 'outline' );
	}

	public setOutline( outline: string ): void
	{
		this.item.setAttribute( 'outline', outline );
	}

	public getInk(): string | undefined
	{
		return this.item.getAttribute( 'ink' );
	}

	public setInk( ink: string ): void
	{
		this.item.setAttribute( 'ink', ink );
	}

	public getReseller(): string | undefined
	{
		return this.item.getAttribute( 'reseller' );
	}

	public setReseller( reseller: string ): void
	{
		this.item.setAttribute( 'reseller', reseller );
	}

	public getMaxSizeMM(): number | undefined
	{
		return this.item.getAttribute( 'max_size_mm' );
	}

	public setMaxSizeMM( maxSize: number ): void
	{
		this.item.setAttribute( 'max_size_mm', maxSize );
	}

	public getMinSizeMM(): number | undefined
	{
		return this.item.getAttribute( 'min_size_mm' );
	}

	public setMinSizeMM( minSize: number ): void
	{
		this.item.setAttribute( 'min_size_mm', minSize );
	}

	public getMaxSizeOtherSideMM(): number | undefined
	{
		return this.item.getAttribute( 'max_size_other_side_mm' );
	}

	public setMaxSizeOtherSideMM( maxSizeOtherSide: number ): void
	{
		this.item.setAttribute( 'max_size_other_side_mm', maxSizeOtherSide );
	}

	public getFixedSize(): boolean | undefined
	{
		return this.item.getAttribute( 'fixed_size' );
	}

	public setFixedSize( fixedSize: boolean ): void
	{
		this.item.setAttribute( 'fixed_size', fixedSize );
	}

	public getFixedQuantity(): boolean | undefined
	{
		return this.item.getAttribute( 'fixed_quantity' );
	}

	public setFixedQuantity( fixedQuantity: boolean ): void
	{
		this.item.setAttribute( 'fixed_quantity', fixedQuantity );
	}

	public getMarket(): string | undefined
	{
		return this.item.getAttribute( 'market' );
	}

	public setMarket( market: string ): void
	{
		this.item.setAttribute( 'market', market );
	}

	public getDeliveryRollSizeType(): number | undefined
	{
		return this.item.getAttribute( 'delivery_roll_size_type' );
	}

	public setDeliveryRollSizeType( typeMM: number ): void
	{
		this.item.setAttribute( 'delivery_roll_size_type', typeMM );
	}

	public getDeliveryRollSizeMM(): number | undefined
	{
		return this.item.getAttribute( 'delivery_roll_size_mm' );
	}

	public setDeliveryRollSizeMM( size: number ): void
	{
		this.item.setAttribute( 'delivery_roll_size_mm', size );
	}

	public getDeliveryRollTopEdgeMargin(): number | undefined
	{
		return this.item.getAttribute( 'delivery_roll_top_edge_margin' );
	}

	public setDeliveryRollTopEdgeMargin( margin: number ): void
	{
		this.item.setAttribute( 'delivery_roll_top_edge_margin', margin );
	}

	public getDeliveryRollItemMargin(): number | undefined
	{
		return this.item.getAttribute( 'delivery_roll_item_margin' );
	}

	public setDeliveryRollItemMargin( margin: number ): void
	{
		this.item.setAttribute( 'delivery_roll_item_margin', margin );
	}

	public getDeliverySheetWidth(): number | undefined
	{
		return this.item.getAttribute( 'delivery_sheet_width' );
	}

	public setDeliverySheetWidth( width: number ): void
	{
		this.item.setAttribute( 'delivery_sheet_width', width );
	}

	public getDeliverySheetHeight(): number | undefined
	{
		return this.item.getAttribute( 'delivery_sheet_height' );
	}

	public setDeliverySheetHeight( height: number ): void
	{
		this.item.setAttribute( 'delivery_sheet_height', height );
	}

	public getDeliverySheetInsidePadding(): number | undefined
	{
		return this.item.getAttribute( 'delivery_sheet_inside_padding' );
	}

	public setDeliverySheetInsidePadding( padding: number ): void
	{
		this.item.setAttribute( 'delivery_sheet_inside_padding', padding );
	}

	public getDeliverySheetOutsidePadding(): number | undefined
	{
		return this.item.getAttribute( 'delivery_sheet_outside_padding' );
	}

	public setDeliverySheetOutsidePadding( padding: number ): void
	{
		this.item.setAttribute( 'delivery_sheet_outside_padding', padding );
	}

	public getEffectLayerFileName(): string | undefined
	{
		return this.item.getAttribute( 'effect_layer_file_name' );
	}

	public setEffectLayerFileName( fileName: string ): void
	{
		this.item.setAttribute( 'effect_layer_file_name', fileName );
	}

	public getEffectLayerFileAppID(): string | undefined
	{
		return this.item.getAttribute( 'effect_layer_upload_fileapp_id' );
	}

	public setEffectLayerFileAppID( id: string ): void
	{
		this.item.setAttribute( 'effect_layer_upload_fileapp_id', id );
	}

	public isCustomizableSheet(): boolean
	{
		return [ 'sheet', 'sheet_kiss_cut' ].includes( this.item.getProductName() );
	}

	public isLabelSheet(): boolean
	{
		return this.item.getProductName() === 'sheet_legacy';
	}

	public isProductLabelsOnRoll(): boolean
	{
		return this.item.getProductName() === 'labels_on_roll';
	}

	public isCustomStickerFamily(): boolean
	{
		return this.item.getProductFamilyName() === 'custom_sticker';
	}
}