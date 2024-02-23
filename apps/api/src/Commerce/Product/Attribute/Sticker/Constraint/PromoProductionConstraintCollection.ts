import { ProductAttrConstraintCollection } from "../../../../Core/Product/Attribute/Constraint/ProductAttrConstraintCollection";
import { ProductionLineConstraint } from "./ProductionLineConstraint";

export class PromoProductionConstraintCollection extends ProductAttrConstraintCollection {
	public static readonly NAME = "sticker_production";

	public constructor() {
		super( PromoProductionConstraintCollection.NAME );

		this.addConstraint( new ProductionLineConstraint() );
	}
}
