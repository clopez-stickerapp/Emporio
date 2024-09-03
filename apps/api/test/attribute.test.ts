import { ProductAttrValueInvalidException } from "$/product/exceptions/ProductAttrValueInvalidException";
import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

let productAttr: ProductAttr;

describe( `Test ${ ProductAttrValueType.INT } type`, () => {
	test( "With valid values", () => {
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.INT, values: [1] });
		expect( productAttr.getValues()[0] ).toBe( 1 );
		productAttr = new ProductAttr({ name: "test", type : ProductAttrValueType.INT, multivalue: true, values: [1, 2, "3"] });
		expect( productAttr.canBe( [ 1, 2, "3" ] ) ).toBe( true );
	} )

	test( "With invalid values", () => {
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.INT });
		expect( () => productAttr.addAttrValue( 'This is a string' ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( true ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( "1.1" ) ).toThrow( ProductAttrValueInvalidException );
		productAttr = new ProductAttr({ name: "test", type : ProductAttrValueType.INT, multivalue: true });
		expect( () => productAttr.canBe( [ 1, 2, 'This is a string' ] ) ).toThrow( ProductAttrValueInvalidException );
	} )
} )

describe( `Test ${ ProductAttrValueType.FLOAT } type`, () => {
	test( "With valid values", () => {
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.FLOAT, values: [1.1, 1]});
		expect( productAttr.getValues() ).toStrictEqual([1.1, 1]);
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.FLOAT, multivalue: true});
		expect( productAttr.canBe( [ 1.1, 1.2, 1 ] ) ).toBe( true );
	} )

	test( "With invalid values", () => {
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.FLOAT });
		expect( () => productAttr.addAttrValue( 'This is a string' ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( true ) ).toThrow( ProductAttrValueInvalidException );
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.FLOAT, multivalue: true});
		expect( () => productAttr.canBe( [ 1, 2, 'This is a string' ] ) ).toThrow( ProductAttrValueInvalidException );
	} )
} )

describe( `Test ${ ProductAttrValueType.STRING } type`, () => {
	test( "With valid values", () => {
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.STRING, values: ["This is a string"] });
		expect( productAttr.getValues()[0] ).toBe( "This is a string" );
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.STRING, multivalue: true })
		expect( productAttr.canBe( [ "One", "Two" ] ) ).toBe( true );
	} )

	test( "With invalid values", () => {
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.STRING });
		expect( () => productAttr.addAttrValue( true ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1.1 ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1 ) ).toThrow( ProductAttrValueInvalidException );
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.STRING, multivalue: true });
		expect( () => productAttr.canBe( [ true ] ) ).toThrow( ProductAttrValueInvalidException );
	} )
} )

describe( `Test ${ ProductAttrValueType.BOOL } type`, () => {
	test( "With valid values", () => {
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.BOOL, values: [true, false]});
		expect( productAttr.getValues() ).toStrictEqual( [true, false] );
	} )

	test( "With invalid values", () => {
		productAttr = new ProductAttr({ name: "test", type: ProductAttrValueType.BOOL });
		expect( () => productAttr.addAttrValue( 'This is a string' ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1.1 ) ).toThrow( ProductAttrValueInvalidException );
		expect( () => productAttr.addAttrValue( 1 ) ).toThrow( ProductAttrValueInvalidException );
		expect( productAttr.getAttrValue( false ) ).toBe( null );
		expect( () => new ProductAttr({ name: "test", type: ProductAttrValueType.BOOL, multivalue: true}) ).toThrowError();
	} )
} )