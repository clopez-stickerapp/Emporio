import { ProductItem } from "../ProductItem";
import { convertMMToCM, convertMMToInches, convertMMToPX } from "../../helpers/UnitConverter";

export class SizeConverter
{
	public constructor( protected item: ProductItem, public mm: number = 0 ) {}

	/**
     * Get the measurement value in inches.
     * 
     * @returns The measurement value converted to inches.
     */
	public get inches(): number
	{
		return convertMMToInches( this.mm );
	}

	/**
     * Get the measurement value in centimeters.
     * 
     * @returns The measurement value converted to centimeters.
     */
	public get cm(): number
	{
		return convertMMToCM( this.mm );
	}

	/**
     * Get the measurement value in pixels.
     * 
     * @returns The measurement value converted to pixels.
     */
	public get px(): number
	{
		return convertMMToPX( this.mm );
	}

	/**
     * Get the measurement value in the localized unit (inches or centimeters).
     * 
     * @returns The measurement value converted to the localized unit.
     */
	public get localized(): number
	{
		return this.item.getAttribute( "imperial_units" )?.toString() === "true" ? this.inches : this.cm;
	}

	public toObject()
	{
		return {
			'mm': this.mm,
			'inches': this.inches,
			'cm': this.cm,
			'px': this.px,
			'localized': this.localized
		}
	}
}