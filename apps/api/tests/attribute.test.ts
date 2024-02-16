import { describe, expect, test } from 'vitest'
import { ProductAttr } from '../src/Commerce/Core/Product/Attribute/ProductAttr';
import { ProductAttrValueType } from '../src/Commerce/Core/Product/Attribute/ProductAttrValueType'
import { ProductAttrValueInvalidException } from '../src/Commerce/Core/Exception/ProductAttrValueInvalidException';

let productAttr: ProductAttr;

describe( "Test " + ProductAttrValueType.INT + " type", () => {
	test( "With valid value", () => {
		productAttr = new ProductAttr( ProductAttrValueType.INT );
		expect( productAttr.addAttrValue( 1 ) );
		productAttr = new ProductAttr( ProductAttrValueType.INT, true );
		expect( productAttr.canBe( [ 1, 2, "3" ] ) ).toBe( true );
	} )

	test( "With invalid value", () => {
		productAttr = new ProductAttr( ProductAttrValueType.INT );
		expect( () => productAttr.addAttrValue( 'This is a string' ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( true ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( "1.1" ) ).toThrow( ProductAttrValueInvalidException );
		productAttr = new ProductAttr( ProductAttrValueType.INT, true );
		expect( () => productAttr.canBe( [ 1, 2, "This is a string" ] ) ).toThrow( ProductAttrValueInvalidException );
	} )
} )

describe( "Test " + ProductAttrValueType.FLOAT + " type", () => {
	test( "With valid value", () => {
		productAttr = new ProductAttr( ProductAttrValueType.FLOAT );
		expect( productAttr.addAttrValue( 1.1 ) );
		productAttr = new ProductAttr( ProductAttrValueType.FLOAT, true );
		expect( productAttr.canBe( [ 1.1, 1.2 ] ) ).toBe( true );
	} )

	test( "With invalid value", () => {
		productAttr = new ProductAttr( ProductAttrValueType.FLOAT );
		expect( () => productAttr.addAttrValue( 'This is a string' ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( true ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1 ) ).toThrow( ProductAttrValueInvalidException );
		productAttr = new ProductAttr( ProductAttrValueType.FLOAT, true );
		expect( () => productAttr.canBe( [ 1, 2, 3.1 ] ) ).toThrow( ProductAttrValueInvalidException );
	} )
} )

describe( "Test " + ProductAttrValueType.STRING + " type", () => {
	test( "With valid value", () => {
		productAttr = new ProductAttr( ProductAttrValueType.STRING );
		expect( productAttr.addAttrValue( 'This is a string' ) );
		productAttr = new ProductAttr( ProductAttrValueType.STRING, true );
		expect( productAttr.canBe( [ "One", "Two" ] ) ).toBe( true );
	} )

	test( "With invalid value", () => {
		productAttr = new ProductAttr( ProductAttrValueType.STRING );
		expect( () => productAttr.addAttrValue( true ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1.1 ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1 ) ).toThrow( ProductAttrValueInvalidException );
		productAttr = new ProductAttr( ProductAttrValueType.STRING, true );
		expect( () => productAttr.canBe( [ true ] ) ).toThrow( ProductAttrValueInvalidException );
	} )
} )

describe( "Test " + ProductAttrValueType.BOOL + " type", () => {
	test( "With valid value", () => {
		productAttr = new ProductAttr( ProductAttrValueType.BOOL );
		expect( productAttr.addAttrValue( true ) );
	} )

	test( "With invalid value", () => {
		productAttr = new ProductAttr( ProductAttrValueType.BOOL );
		expect( () => productAttr.addAttrValue( 'This is a string' ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1.1 ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1 ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => new ProductAttr( ProductAttrValueType.BOOL, true ) ).toThrowError();
	} )
} )