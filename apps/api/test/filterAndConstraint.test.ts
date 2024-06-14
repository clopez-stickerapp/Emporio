import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { ProductAttrConstraintCollection } from "$/product/attribute/Constraint/ProductAttrConstraintCollection";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ProductAttrFilterCollection } from "$/product/attribute/Filter/ProductAttrFilterCollection";
import { ProductAttrFilteredValues } from "$/product/attribute/Filter/ProductAttrFilteredValues";
import { ProductConditionBuilder } from "$/product/condition/ProductConditionBuilder";
import { beforeEach, describe, expect, test } from "vitest";

describe( 'Test filter', () => {
	let filterCollection: ProductAttrFilterCollection;
	let filter: ProductAttrFilter;

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
	let constraintCollection: ProductAttrConstraintCollection;
	let constraint: ProductAttrConstraint;
	
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