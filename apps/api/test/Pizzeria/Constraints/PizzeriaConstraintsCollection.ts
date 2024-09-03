import { CollectionType } from "$/configuration/interface/CollectionConfig";
import { Collection } from "$/product/Collection";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { CrustConstraint } from "./CrustConstraint";
import { CuisineConstraint } from "./CuisineConstraint";
import { PortionConstraint } from "./PortionConstraint";

const PizzeriaConstraintsCollection = new Collection<ProductAttrConstraint>( {
	name: 'pizzeria_constraints',
	values: [],
	type: CollectionType.Constraint
} );

PizzeriaConstraintsCollection.add( CuisineConstraint );
PizzeriaConstraintsCollection.add( CrustConstraint );
PizzeriaConstraintsCollection.add( PortionConstraint );

export default PizzeriaConstraintsCollection;