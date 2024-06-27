import { ProductItem } from "../ProductItem";
import { UnitType } from "./UnitType";

export class SquareMeter extends UnitType {
	public calculateUnits(productItem: ProductItem): number {
		const width_mm = productItem.getAttribute<number>("width_mm");
		const height_mm = productItem.getAttribute<number>("height_mm");
		const quantity = productItem.getAttribute<number>("quantity");

		if( !width_mm || !height_mm || !quantity ) {
			throw new Error("Missing required attributes for SquareMeter calculation");
		}

		return ( width_mm * height_mm * quantity ) / 1000000;
	}
}