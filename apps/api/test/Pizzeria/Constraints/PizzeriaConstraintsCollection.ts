import { ProductAttrConstraintCollection } from "$/product/attribute/Constraint/ProductAttrConstraintCollection";
import { CrustConstraint } from "./CrustConstraint";
import { CuisineConstraint } from "./CuisineConstraint";
import { PortionConstraint } from "./PortionConstraint";

export class PizzeriaConstraintsCollection extends ProductAttrConstraintCollection {
	public static readonly NAME = "pizzeria_constraints";

	public constructor() {
		super( PizzeriaConstraintsCollection.NAME );
		
		this.addConstraint( new CuisineConstraint() );
		this.addConstraint( new PortionConstraint() );
		this.addConstraint( new CrustConstraint() );
	}
}