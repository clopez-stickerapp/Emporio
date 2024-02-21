import { beforeEach, describe, expect, test } from "vitest";
import { ProductAttrFilterCollection } from "../src/Commerce/Core/Product/Attribute/Filter/ProductAttrFilterCollection";
import { ProductAttrFilter } from "../src/Commerce/Core/Product/Attribute/Filter/ProductAttrFilter";
import { ProductAttrConstraint } from "../src/Commerce/Core/Product/Attribute/Constraint/ProductAttrConstraint";
import { ProductAttrConstraintCollection } from "../src/Commerce/Core/Product/Attribute/Constraint/ProductAttrConstraintCollection";
import { ConditionOperators } from "../src/Helper/Condition/ConditionOperators";
import { ProductConditionBuilder } from "../src/Commerce/Core/Product/Condition/ProductConditionBuilder";
import { ProductAttrFilteredValues } from "../src/Commerce/Core/Product/Attribute/Filter/ProductAttrFilteredValues";

let filterCollection: ProductAttrFilterCollection;
let constraintCollection: ProductAttrConstraintCollection;
let filter: ProductAttrFilter;
let constraint: ProductAttrConstraint;

describe( 'Test filter', () => {
	beforeEach( () => {
		filterCollection = new ProductAttrFilterCollection( 'stickers' );
		filter = new ProductAttrFilter( 'test' );
		filter.createFilter( [ '1' ] ).conditionBuilder.addCondition( 'item.attributes.material', ConditionOperators.EQUAL, 'glitter' );
		filterCollection.addFilter( filter );
	} );

	test( "With valid values", () => {
		expect( filterCollection.addFilter( new ProductAttrFilter( 'test1' ) ) ).toBeInstanceOf( ProductAttrFilter );
		expect( filter.createFilter( [ '2' ] ) ).toBeInstanceOf( ProductAttrFilteredValues );
	} );

	test( "With invalid values", () => {
		expect( () => filterCollection.addFilter( new ProductAttrFilter( 'test' ) ) ).toThrowError();
		expect( filterCollection.getFilterFor( 'test1' ) ).toBeNull();
	} );
} )

describe( 'Test constraint', () => {
	beforeEach( () => {
		constraintCollection = new ProductAttrConstraintCollection( 'stickers' );
		constraint = new ProductAttrConstraint( 'test' );
		constraint.createConditionsFor( true ).addCondition( 'item.attributes.material', ConditionOperators.EQUAL, 'glitter' );
		constraintCollection.addConstraint( constraint );
	} );

	test( "With valid values", () => {
		expect( constraintCollection.addConstraint( new ProductAttrConstraint( 'test1' ) ) ).toBeInstanceOf( ProductAttrConstraint );
		expect( constraint.createConditionsFor( false ) ).toBeInstanceOf( ProductConditionBuilder ); 
		expect( constraint.getConditionsFor( true ) ).toBeInstanceOf( ProductConditionBuilder );
	} );

	test( "With invalid values", () => {
		expect( () => constraintCollection.addConstraint( new ProductAttrConstraint( 'test' ) ) ).toThrowError();
		expect( () => constraint.createConditionsFor( true ) ).toThrowError();
		expect( constraintCollection.findConditionsFor( 'test', '123' ) ).toBeNull();
		expect( constraint.getConditionsFor( false ) ).toBeNull();
	} );
} )