import { ProductItem } from "../ProductItem";
import { ProductAttrComputer } from "./ProductAttrComputer";
import { DeliverySheetSizeHelper } from "./DeliverySheetSizeHelper";
import { TransformHelper } from "./TransformHelper";
import { convertCMToMM, convertInchesToMM, formatMM } from "../../helpers/UnitConverter";
import { SizeConverter } from "./SizeConverter";
import { AttributeValueMulti } from "../attribute/AttributeValue";

export class SizeHelper
{
	public static readonly MAX_SIZE_MM_DIGITAL = 1250;
	public static readonly MAX_SIZE_MM_LASER   = 275;
	public static readonly MIN_SIZE_MM_DEFAULT = 25;

	public fixedSize:        boolean = false;
	public minSize:          SizeConverter;
	public maxSize:          SizeConverter;
	public maxSizeOtherSide: SizeConverter;
	public transform:        TransformHelper;
	public deliverySheet:    DeliverySheetSizeHelper;

	public constructor( protected attrComputer: ProductAttrComputer, protected productItem: ProductItem )
	{
		this.transform        = new TransformHelper( this );
		this.deliverySheet    = new DeliverySheetSizeHelper( productItem );
		this.minSize          = new SizeConverter( productItem );
		this.maxSize          = new SizeConverter( productItem );
		this.maxSizeOtherSide = new SizeConverter( productItem );
	}

	public toString(): string
	{
		return `|${ this.width.mm }|${ this.height.mm }|${ this.minSize.mm }|${ this.maxSize.mm }|${ this.fixedSize }|${ this.isImperialUnits() }|`;
	}

	/**
	 * Evaluates maxSize, minSize, maxSizeOtherSide, fixedSize.
	 */
	public evaluate(): void
	{
		this.evaluateMaxSize();
		this.evaluateMinSize();
		this.evaluateMaxSizeOtherSide();
		this.evaluateFixedSize();
	}

	public getSizeOptions(): AttributeValueMulti
	{
		return this.attrComputer.getSuggestedValues( "size" );
	}

	public canBeProductionLine( productionLine: string ): boolean
	{
		return !this.attrComputer.isConstrained( "production_line", productionLine );
	}

	/**
	 * Creates a displayable measurement string.
	 * 
	 * @param measureInInchesOrCM The localized measurement value in inches or centimeters.
	 * @returns A formatted and displayable string, such as '20 cm' or '4 "'.
	 */
	public formatDisplayableMeassure( measureInInchesOrCM: number ): string
	{
		return `${ measureInInchesOrCM } ${ this.meassureDisplayAbbr }`;
	}

	/**
	 * Takes a size string and extracts the numbers, but does NOT convert it to millimeters.
	 * 
	 * @param sizeString The size string, such as 2" x 2" or 10 x 10 cm.
	 * @returns An object with the width and height extracted.
	 */
	public extractMeassuresFromString( sizeString: string ): { width: number, height: number }
	{
		const [ width, height ] = sizeString.match( /([\d]{1,3}\.?[\d]{1,3})|([\d]{1,3})/g ) as string[];

		return { width: parseFloat( width ), height: parseFloat( height ) };
	}

	/**
	 * Converts the localized measurement value to millimeters and sets the value.
	 * 
	 * @param attributeName The name of the attribute.
	 * @param measureInInchesOrCM The measurement value in inches or centimeters.
	 * @returns The measurement value set in millimeters.
	 */
	public setMeasureAttrLocalized( attributeName: string, measureInInchesOrCM: number ): number
	{
		return this.setMeasureAttrInMM( attributeName, this.localizedToMM( measureInInchesOrCM ) );
	}

	/**
	 * Converts the localized measurement value to millimeters.
	 * 
	 * @param measureInInchesOrCM The measurement value in inches or centimeters.
	 * @returns The measurement value in millimeters.
	 */
	public localizedToMM( measureInInchesOrCM: number ): number
	{
		return this.isImperialUnits() ? convertInchesToMM( measureInInchesOrCM ) : convertCMToMM( measureInInchesOrCM );
	}

	/**
	 * Sets the measurement value in millimeters.
	 * 
	 * @param attributeName The name of the attribute.
	 * @param measureInMM The measurement value in millimeters.
	 * @returns The measurement value set in millimeters.
	 */
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

		measureInMM = formatMM( measureInMM );

		this.productItem.setAttribute( attributeName, measureInMM );

		return measureInMM;
	}

	/**
	 * Creates a SizeConverter instance.
	 * 
	 * @param mm The value in millimeters.
	 * @returns A SizeConverter instance to access the value in different units.
	 */
	public getSizeByMM( mm: number ): SizeConverter
	{
		return new SizeConverter( this.productItem, mm );
	}

	/**
	 * Creates a SizeConverter instance.
	 * 
	 * @param attributeName The attribute name.
	 * @returns A SizeConverter instance to access the value in different units.
	 */
	public getSizeByAttribute( attributeName: string ): SizeConverter
	{
		attributeName = this.sanitizeMeasureAttrName( attributeName );

		const mm = Number( this.productItem.getAttribute<string>( attributeName ) || '0' );

		return this.getSizeByMM( mm );
	}

	/**
	 * Determines whether the product item uses imperial units.
	 */
	public isImperialUnits(): boolean
	{
		return this.productItem.getAttribute( "imperial_units" )?.toString() === "true";
	}

	/**
	 * Determines whether the product item uses fixed size.
	 */
	public isSizeFixed(): boolean
	{
		return this.fixedSize;
	}

	/**
	 * Determines whether the product item has maxSizeOtherSide.
	 */
	public hasMaxSizeOtherSide(): boolean
	{
		return this.maxSizeOtherSide.mm != this.maxSize.mm;
	}

	public get sqm(): number
	{
		let quantity = Number( this.productItem.getAttribute( "quantity" ) );

		return ( this.width.mm * this.height.mm * quantity ) / 1000000;
	}

	/**
	 * Returns either '"' or 'cm' depending on whether the product item uses imperial units.
	 */
	public get meassureDisplayAbbr(): '"' | 'cm'
	{
		return this.isImperialUnits() ? '"' : 'cm';
	}

	/**
	 * Creates a SizeConverter instance to access the width in different units.
	 */
	public get width(): SizeConverter
	{
		return this.getSizeByAttribute( "width_mm" );
	}

	/**
	 * Creates a SizeConverter instance to access the height in different units.
	 */
	public get height(): SizeConverter
	{
		return this.getSizeByAttribute( "height_mm" );
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
		let maxSizeOtherSide = this.productItem.getAttribute<number>( "max_size_other_side_mm" );

		if ( !maxSizeOtherSide )
		{
			const values = this.attrComputer.getFilteredValues<number>( "max_size_other_side_mm" );

			if ( values.length )
			{
				maxSizeOtherSide = values[ 0 ];
			}
		}

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

	protected sanitizeMeasureAttrName( attributeName: string ): string
	{
		if ( attributeName.indexOf( "_mm" ) < 0 )
		{
			attributeName += "_mm";
		}

		return attributeName;
	}
}