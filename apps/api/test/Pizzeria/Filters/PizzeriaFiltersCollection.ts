import { Collection } from "$/product/Collection";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { CrustFilter } from "./CrustFilter";

const PizzeriaFilterCollection = new Collection<ProductAttrFilter>( {
	name: 'pizzeria_filter',
	values: []
} );

PizzeriaFilterCollection.add( CrustFilter );

export default PizzeriaFilterCollection;