import { QuantityAttribute } from "$/configuration/attributes/QuantityAttribute";
import { ProductItem } from "../ProductItem";
import { UnitType } from "./UnitType";

export class PerPiece extends UnitType {
	public calculateUnits(productItem: ProductItem): number {
		const quantity = productItem.getAttribute<number>(QuantityAttribute.getName());

		if( !quantity ) {
			throw new Error("Missing required attributes for PerPiece calculation");
		}

		return quantity;
	}
}