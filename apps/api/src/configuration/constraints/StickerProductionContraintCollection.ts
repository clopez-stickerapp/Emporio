import { ProductAttrConstraintCollection } from "$/product/attribute/Constraint/ProductAttrConstraintCollection";
import { ColorSupportedConstraint } from "./ColorSupportedConstraint";
import { CutDirectionConstraint } from "./CutDirectionConstraint";
import { DeliveryRollSizeTypeConstraint } from "./DeliveryRollSizeTypeConstraint";
import { FeatureConstraint } from "./FeatureConstraint";
import { MaterialConstraint } from "./MaterialConstraint";
import { ProductionLineConstraint } from "./ProductionLineConstraint";

export class StickerProductionContraintCollection extends ProductAttrConstraintCollection {
	public static readonly NAME = "sticker_production";

	public constructor() {
		super( StickerProductionContraintCollection.NAME );

		this.addConstraint( new FeatureConstraint() );
		this.addConstraint( new MaterialConstraint() );
		this.addConstraint( new ProductionLineConstraint() );
		this.addConstraint( new ColorSupportedConstraint() );
		this.addConstraint( new CutDirectionConstraint() );
		this.addConstraint( new DeliveryRollSizeTypeConstraint() );
		// this.addConstraint( new LaminateConstraint() );
		// this.addConstraint( new InkConstraint() );
		// this.addConstraint( new MaxSizeConstraint() );
		// this.addConstraint( new MinSizeConstraint() );
	}
}
