import { CollectionType } from "$/configuration/interface/CollectionConfig";
import { Collection } from "$/product/Collection";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { CrustFilter } from "./CrustFilter";

const PizzeriaFilterCollection = new Collection<ProductAttrFilter>( {
	name: 'pizzeria_filter',
	values: [],
	type: CollectionType.Filter
} );

PizzeriaFilterCollection.add( CrustFilter );

export default PizzeriaFilterCollection;