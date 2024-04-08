import { ProductItem } from "../Item/ProductItem";
import { ProductAttrComputer } from "./ProductAttrComputer";
import { DeliverySheetSizeHelper } from "./DeliverySheetSizeHelper";
import { TransformHelper } from "./TransformHelper";
import { AttributeValueMulti } from "$/Helper/Condition/AttributeValue";

export class SizeHelper
{
	public static readonly MAX_SIZE_MM_DIGITAL = 1250;
	public static readonly MAX_SIZE_MM_LASER   = 275;
	public static readonly MIN_SIZE_MM_DEFAULT = 25;

	public fixedSize:           boolean         = false;
	public meassureDisplayAbbr: string          = "cm";
	public minSize:             SizeUnitConverter   = new SizeUnitConverter( this );
	public maxSize:             SizeUnitConverter   = new SizeUnitConverter( this );
	public maxSizeOtherSide:    SizeUnitConverter   = new SizeUnitConverter( this );
	public maxWidth:            SizeUnitConverter   = new SizeUnitConverter( this );
	public maxHeight:           SizeUnitConverter   = new SizeUnitConverter( this );
	public transform:           TransformHelper = new TransformHelper( this );
	public deliverySheet:       DeliverySheetSizeHelper;

	constructor( protected attrComputer: ProductAttrComputer, protected productItem: ProductItem )
	{
		this.deliverySheet = new DeliverySheetSizeHelper( productItem );
	}

	public toString(): string
	{
		let value = "|";

		value += this.width.mm + "|";
		value += this.height.mm + "|";
		value += this.minSize.mm + "|";
		value += this.maxSize.mm + "|";
		value += this.fixedSize + "|";
		value += this.isImperialUnits() + "|";

		return value;
	}

	public evaluate(): void
	{
		this.evaluateMaxSize();
		this.evaluateMinSize();
		this.evaluateMaxSizeOtherSide();
		this.evaluateFixedSize();
		this.evaluateMaxWidth();
		this.evaluateMaxHeight();

		this.meassureDisplayAbbr = this.isImperialUnits() ? '"' : 'cm';
	}

	protected evaluateFixedSize(): void
	{
		let fixedSize = this.productItem.getAttribute<boolean>( "fixed_size" );

		if ( fixedSize === undefined )
		{
			fixedSize = this.attrComputer.isInFilteredValues( "fixed_size", true );
		}

		this.fixedSize = fixedSize;
	}

	protected evaluateMaxSize(): void
	{
		let maxSizeBasedOnProductionLine: number = this.canBeProductionLine( "digital" ) ? SizeHelper.MAX_SIZE_MM_DIGITAL : SizeHelper.MAX_SIZE_MM_LASER;

		let maxSizeMM = this.productItem.getAttribute<number>( "max_size_mm" );

		if ( !maxSizeMM )
		{
			maxSizeMM = this.attrComputer.getHighestAvailableValue( "max_size_mm" ) ?? undefined;
		}

		if ( this.productItem.getProductName() == "labels_on_roll" )
		{
			maxSizeBasedOnProductionLine = this.attrComputer.getHighestAvailableValue( "max_size_mm" ) ?? Math.max( SizeHelper.MAX_SIZE_MM_DIGITAL, SizeHelper.MAX_SIZE_MM_LASER );
		}

		this.maxSize.mm = Math.min( Number( maxSizeMM ) || Infinity, maxSizeBasedOnProductionLine );
	}

	protected evaluateMinSize(): void
	{
		let minSizeMM = this.productItem.getAttribute<number>( "min_size_mm" );

		if ( !minSizeMM )
		{
			minSizeMM = this.attrComputer.getLowestAvailableValue( "min_size_mm" ) ?? SizeHelper.MIN_SIZE_MM_DEFAULT;
		}

		this.minSize.mm = minSizeMM;
	}

	protected evaluateMaxSizeOtherSide(): void
	{
		let maxSizeOtherSide = this.getMaxSizeOtherSideValue();

		if ( !this.maxSize.mm )
		{
			this.evaluateMaxSize();
		}

		if ( !this.minSize.mm )
		{
			this.evaluateMinSize();
		}

		if ( !maxSizeOtherSide || maxSizeOtherSide > this.maxSize.mm )
		{
			maxSizeOtherSide = this.maxSize.mm;
		}
		else if ( maxSizeOtherSide < this.minSize.mm )
		{
			maxSizeOtherSide = this.minSize.mm;
		}

		this.maxSizeOtherSide.mm = maxSizeOtherSide;
	}

	protected evaluateMaxWidth(): void
	{
		if ( this.hasMaxSizeOtherSide() && this.width.mm < this.height.mm )
		{
			this.maxWidth.mm = this.maxSizeOtherSide.mm;
		}
		else
		{
			this.maxWidth.mm = this.maxSize.mm;
		}
	}

	protected evaluateMaxHeight(): void
	{
		if ( this.hasMaxSizeOtherSide() && this.width.mm >= this.height.mm )
		{
			this.maxHeight.mm = this.maxSizeOtherSide.mm;
		}
		else
		{
			this.maxHeight.mm = this.maxSize.mm;
		}
	}

	public getSizeOptions(): AttributeValueMulti
	{
		return this.attrComputer.getSuggestedValues( "size" );
	}

	public canBeProductionLine( productionLine: string ): boolean
	{
		return !this.attrComputer.isConstrained( "production_line", productionLine );
	}

	public formatDisplayableMeassure( measureInInchesOrCM: number ): string
	{
		return measureInInchesOrCM.toString() + " " + this.meassureDisplayAbbr;
	}

	public formatMM( mm: number ): number
	{
		mm = Math.round( mm * 10 ) / 10;
		mm = Number( mm.toFixed( 0 ) );

		return mm;
	}

	public convertMMToInches( mm: number ): number
	{
		mm = this.formatMM( mm );
		var inches = mm / 25.4;
		var roundedInches = Math.round( inches * 10 ) / 10;

		return roundedInches;
	}

	public convertInchesToMM( inches: number ): number
	{
		var mm = this.formatMM(inches * 25.4);

		return mm;
	}

	public convertMMToCM( mm: number ): number
	{
		return Number( (mm / 10).toFixed( 1 ) );
	}

	public convertCMToMM( cm: number ): number
	{
		return Number( (cm * 10).toFixed( 0 ) );
	}

	public setMeasureBySizeString( sizeString: string ): void
	{
		if ( sizeString )
		{
			const meassures = this.extractMeassuresFromString( sizeString );
			this.setMeasureAttr( "width_mm", meassures.width );
			this.setMeasureAttr( "height_mm", meassures.height );
		}
	}

	/**
	 * Takes a size string like 2" x 2" or 10 x 10 cm and extract the numbers (but does NOT convert it to millimeters).
	 *
	 * @param sizeString
	 */
	public extractMeassuresFromString( sizeString: string ): { width: number, height: number }
	{
		let widthAndHeight: string[] = sizeString.match( /([\d]{1,3}\.?[\d]{1,3})|([\d]{1,3})/g ) as string[];
		let width:          number   = parseFloat( widthAndHeight[ 0 ] );
		let height:         number   = parseFloat( widthAndHeight[ 1 ] );

		return {
			width: width,
			height: height
		}
	}

	public setMeasureAttr( attributeName: string, measureInInchesOrCM: number ): number
	{
		attributeName = this.sanitizeMeasureAttrName( attributeName );
		const measureInMM = this.convertMeassureToMM( measureInInchesOrCM );

		return this.setMeasureAttrInMM( attributeName, measureInMM );
	}

	public setMeasureAttrInMM( attributeName: string, measureInMM: number ): number
	{
		attributeName = this.sanitizeMeasureAttrName( attributeName );

		if ( this.maxSize.mm && measureInMM > this.maxSize.mm )
		{
			measureInMM = this.maxSize.mm;
		}
		else if ( this.minSize.mm && measureInMM < this.minSize.mm )
		{
			measureInMM = this.minSize.mm;
		}

		measureInMM = this.formatMM( measureInMM );

		this.productItem.setAttribute( attributeName, measureInMM );

		return measureInMM;
	}

	public convertMeassureToMM( measureInInchesOrCM: number ): number
	{
		if ( this.isImperialUnits() )
		{
			return this.convertInchesToMM( measureInInchesOrCM );
		}
		
		return this.convertCMToMM( measureInInchesOrCM );
	}

	public convertMMToLocalizedMeassure( meassureInMM: number ): number
	{
		if ( this.isImperialUnits() )
		{
			return this.convertMMToInches( meassureInMM );
		}
		
		return this.convertMMToCM( meassureInMM );
	}

	public isImperialUnits(): boolean
	{
		let value = this.productItem.getAttribute<boolean | string>( "imperial_units" );

		return value === true || value === "true";
	}

	public isSizeFixed(): boolean
	{
		return this.fixedSize;
	}

	public hasMaxSizeOtherSide(): boolean
	{
		return this.maxSizeOtherSide.mm != this.maxSize.mm;
	}

	private sanitizeMeasureAttrName( attributeName: string )
	{
		if ( attributeName.indexOf( "_mm" ) < 0 )
		{
			attributeName = attributeName + "_mm";
		}

		return attributeName;
	}

	private getMaxSizeOtherSideValue(): number | null
	{
		let value = this.productItem.getAttribute<number>( "max_size_other_side_mm" );

		if ( !value )
		{
			const values = this.attrComputer.getFilteredValues<number>( "max_size_other_side_mm" );

			if ( values.length )
			{
				value = values[ 0 ];
			}
		}

		return value ?? null;
	}

	public get sqm(): number
	{
		let quantity = Number( this.productItem.getAttribute( "quantity" ) );

		return ( this.width.mm * this.height.mm * quantity ) / 1000000;
	}

	public get width(): SizeUnitConverter
	{
		const width = new SizeUnitConverter( this );
		width.mm = parseInt( this.productItem.getAttribute<string>( "width_mm" ) ?? '0' );
		return width;
	}

	public get height(): SizeUnitConverter
	{
		const height = new SizeUnitConverter( this );
		height.mm = parseInt( this.productItem.getAttribute<string>( "height_mm" ) ?? '0' );
		return height;
	}
}

class SizeUnitConverter
{
	public mm: number = 0;

	private mm2pxFactor: number = 2.83465;

	public constructor( protected size: SizeHelper ) {}

	public get inches(): number
	{
		return this.size.convertMMToInches( this.mm );
	}

	public get cm(): number
	{
		return this.size.convertMMToCM( this.mm );
	}

	public get px(): number
	{
		return this.mm * this.mm2pxFactor;
	}

	public get localized(): number
	{
		return this.size.convertMMToLocalizedMeassure( this.mm );
	}
}