import { HeightAttribute } from "$/configuration/attributes/HeightAttribute";
import { QuantityAttribute } from "$/configuration/attributes/QuantityAttribute";
import { WidthAttribute } from "$/configuration/attributes/WidthAttribute";
import { ProductItem } from "@stickerapp-org/nomisma";
import { ProductServiceException } from "../exceptions/ProductServiceException";
import { UnitType } from "./UnitType";

export class SquareMeterWithBleed extends UnitType {
	public calculateUnits(productItem: ProductItem): number {
		const width_mm = productItem.getAttribute<number>(WidthAttribute.getName());
		const height_mm = productItem.getAttribute<number>(HeightAttribute.getName());
		const quantity = productItem.getAttribute<number>(QuantityAttribute.getName());

		if( !width_mm || !height_mm || !quantity ) {
			throw new ProductServiceException("Missing at least one of width_mm, height_mm or quantity, which are required attributes for SquareMeterWithBleed calculation");
		}

		return ( (width_mm + 4) * (height_mm + 4) * quantity ) / 1000000;
	}
}