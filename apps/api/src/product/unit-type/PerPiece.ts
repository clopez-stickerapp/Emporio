import { QuantityAttribute } from "$/configuration/attributes/QuantityAttribute";
import { ProductItem } from "@stickerapp-org/nomisma";
import { ProductServiceException } from "../exceptions/ProductServiceException";
import { UnitType } from "./UnitType";

export class PerPiece extends UnitType {
	public calculateUnits(productItem: ProductItem): number {
		const quantity = productItem.getAttribute<number>(QuantityAttribute.getName());

		if( !quantity ) {
			throw new ProductServiceException("Missing required quantity attribute for PerPiece calculation");
		}

		return quantity;
	}
}