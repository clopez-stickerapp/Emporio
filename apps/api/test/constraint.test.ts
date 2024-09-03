import { ConditionOperators } from "$/conditions/ConditionOperators";
import { MaterialAttribute } from "$/configuration/attributes/MaterialAttribute";
import { CollectionType } from "$/configuration/interface/CollectionConfig";
import { Collection } from "$/product/Collection";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { ProductConditionBuilder } from "$/product/condition/ProductConditionBuilder";
import { beforeEach, describe, expect, test } from "vitest";

describe( 'Constraint', () => {
	let collection: Collection<ProductAttrConstraint>;
	let constraint: ProductAttrConstraint;
	
	beforeEach( () => {
		collection = new Collection( { name: 'stickers', values: [], type: CollectionType.Constraint } );

		constraint = new ProductAttrConstraint( {
			name: 'test',
			rules: []
		} );

		constraint.addConstraint( true, {
			conditions: [ {
				attribute: 'item.attribtues.' + MaterialAttribute.getName(),
				operator: ConditionOperators.EQUAL,
				value: 'glitter'
			} ]
		} );

		collection.add( constraint );
	} );

	describe( 'Add and get conditions', () => {
		test( "Add a condition to a constraint", () => {
			const condition = constraint.addConstraint( false, {
				conditions: [ {
					attribute: 'item.attribtues.' + MaterialAttribute.getName(),
					operator: ConditionOperators.EQUAL,
					value: 'glitter'
				} ]
			} );
	
			expect( condition ).toBeInstanceOf( ProductConditionBuilder );
		} );

		test( "Add a condition to a constraint already containing one with the same key", () => {
			expect( () => constraint.addConstraint( true, {} ) ).toThrowError();
		} );

		test( "Get conditions from a constraint that has been added", () => {
			expect( constraint.getConstraint( true ) ).toBeInstanceOf( ProductConditionBuilder ); 
		} );
	
		test( "Get conditions from a constraint that hasn't been added", () => {
			expect( constraint.getConstraint( false ) ).toBeNull();
		} );
	} );

	describe( 'Add and get constraints', () => {
		test( "Add a constraint to a collection", () => {
			const attrConstraint = new ProductAttrConstraint( {
				name: 'test1',
				rules: []
			} );
	
			expect( collection.add( attrConstraint ) ).toBeInstanceOf( ProductAttrConstraint );
		} );
	
		test( "Add a constraint to a collection already containing one with the same name", () => {
			const attrConstraint = new ProductAttrConstraint( {
				name: 'test',
				rules: []
			} );
	
			expect( () => collection.add( attrConstraint ) ).toThrowError();
		} );
	
		test( "Get constraint from a collection that has been added", () => {
			expect( collection.get( 'test' ) ).toBeInstanceOf( ProductAttrConstraint );
		} );
	
		test( "Get constraint from a collection that hasn't been added", () => {
			expect( collection.get( 'test1' ) ).toBeNull();
		} );
	} );

	test( "Initiate a new constraint class with rules", () => {
		constraint = new ProductAttrConstraint( {
			name: 'test',
			rules: [
				{
					keys: [ String( true ) ],
					conditions: {
						conditions: [ {
							attribute: 'item.attribtues.' + MaterialAttribute.getName(),
							operator: ConditionOperators.EQUAL,
							value: 'glitter'
						} ]
					}
				},
			]
		} );

		expect( constraint.getConstraint( true ) ).toBeInstanceOf( ProductConditionBuilder );
	} );
} )