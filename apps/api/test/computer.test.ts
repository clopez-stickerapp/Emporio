import { ProductAttrComputer } from "@stickerapp-org/nomisma";
import { ProductItemBuilder } from "$/product/helpers/ProductItemBuilder";
import { CrustAttribute, CrustValues } from "./Pizzeria/Attributes/CrustAttribute";
import { CuisineAttribute, CuisineValues } from "./Pizzeria/Attributes/CuisineAttribute";
import { IngredientAttribute, IngredientValues } from "./Pizzeria/Attributes/IngredientAttribute";
import { PortionAttribute, PortionValues } from "./Pizzeria/Attributes/PortionAttribute";
import { SauceBaseAttribute, SauceBaseValues } from "./Pizzeria/Attributes/SauceBaseAttribute";
import { ToppingAttribute, ToppingValues } from "./Pizzeria/Attributes/ToppingAttribute";
import PizzeriaFamily from "./Pizzeria/PizzeriaFamily";
import { PizzeriaProducts } from "./Pizzeria/PizzeriaProducts";
import PizzeriaService from "./Pizzeria/PizzeriaService";

const computer    = new ProductAttrComputer();
const itemBuilder = new ProductItemBuilder();
const map = PizzeriaService.getProductMap( PizzeriaFamily.getName(), PizzeriaProducts.HAWAII );
const product = PizzeriaFamily.getProduct( PizzeriaProducts.HAWAII );
const item        = itemBuilder.createItem( PizzeriaFamily, product, map );
computer.evaluate( item, map, true );

describe( 'Test Getting', () => {
	describe( 'Default Value', () => {
		test( 'When The Attribute Is A Multi Type', () => {
			expect( computer.getDefaultValue( IngredientAttribute.getName() ) ).toEqual( [] );
		} );
	
		test( 'When The Attribute Is A Non-Multi Type', () => {
			expect( computer.getDefaultValue( SauceBaseAttribute.getName() ) ).toBe( SauceBaseValues.TOMATO );
		} );
	
		test( 'When The Attribute Does Not Exist', () => {
			expect( computer.getDefaultValue( 'this_attr_does_not_exist' ) ).toBe( null );
		} );
	} );
	
	describe( 'All Values', () => {
		test( 'When The Attribute Is A Multi Type', () => {
			expect( computer.getAllValues( IngredientAttribute.getName() ) ).toEqual( [ 
				IngredientValues.CHEESE, 
				IngredientValues.HAM, 
				IngredientValues.PINEAPPLE 
			] );
		} );
	
		test( 'When The Attribute Is A Non-Multi Type', () => {
			expect( computer.getAllValues( SauceBaseAttribute.getName() ) ).toEqual( [ SauceBaseValues.TOMATO ] );
		} );
	
		test( 'When The Attribute Does Not Exist', () => {
			expect( computer.getAllValues( 'this_attr_does_not_exist' ) ).toEqual( [] );
		} );
	} );
	
	describe( 'Highest Available Value', () => {
		test( 'When The Attribute Is Of Type String', () => {
			expect( computer.getHighestAvailableValue( IngredientAttribute.getName() ) ).toBe( null );
		} );
	
		test( 'When The Attribute Is Of Type Int', () => {
			expect( computer.getHighestAvailableValue( PortionAttribute.getName() ) ).toBe( PortionValues.FAMILY );
		} );
	} );

	describe( 'Lowest Available Value', () => {
		test( 'When The Attribute Is Of Type String', () => {
			expect( computer.getLowestAvailableValue( IngredientAttribute.getName() ) ).toBe( null );
		} );
	
		test( 'When The Attribute Is Of Type Int And Has Constraint', () => {
			expect( computer.getLowestAvailableValue( PortionAttribute.getName() ) ).toBe( PortionValues.NORMAL );
		} );
	} );
} );

describe( 'Test If The Attribute Value Is', () => {
	describe( 'Available', () => {
		test( 'When The Attribute Value Is Suggested', () => {
			expect( computer.isAvailable( IngredientAttribute.getName(), IngredientValues.PINEAPPLE ) ).toBe( true );
		} );
	
		test( 'When The Attribute Value Is Not Suggested And Not Constrained', () => {
			expect( computer.isAvailable( IngredientAttribute.getName(), IngredientValues.GARLIC ) ).toBe( false );
		} );
	
		test( 'When The Attribute Value Is Constrained', () => {
			expect( computer.isAvailable( CuisineAttribute.getName(), CuisineValues.NEOPOLITAN ) ).toBe( false );
		} );

		test( 'When The Attribute And/Or Value Does Not Exist', () => {
			expect( computer.isAvailable( 'this_attr_does_not_exist', 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isAvailable( IngredientAttribute.getName(), 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isAvailable( 'this_attr_does_not_exist', IngredientValues.CHEESE ) ).toBe( false );
		} );
	} );

	describe( 'Supported', () => {
		test( 'When The Attribute Is Required', () => {
			expect( computer.isSupported( IngredientAttribute.getName() ) ).toBe( true );
		} );
	
		test( 'When The Attribute Is Supported', () => {
			expect( computer.isSupported( CrustAttribute.getName() ) ).toBe( true );
		} );
	
		test( 'When The Attribute Does Not Exist', () => {
			expect( computer.isSupported( 'this_attr_does_not_exist' ) ).toBe( false );
		} );
	} );
	
	describe( 'Required', () => {
		test( 'When The Attribute Is Required', () => {
			expect( computer.isRequired( IngredientAttribute.getName() ) ).toBe( true );
		} );
	
		test( 'When The Attribute Is Supported', () => {
			expect( computer.isRequired( CrustAttribute.getName() ) ).toBe( false );
		} );
	
		test( 'When The Attribute Does Not Exist', () => {
			expect( computer.isRequired( 'this_attr_does_not_exist' ) ).toBe( false );
		} );
	} );
	
	describe( 'Constrained', () => {
		test( 'When The Attribute Value Is In Filtered Values', () => {
			expect( computer.isConstrained( CrustAttribute.getName(), CrustValues.THIN ) ).toBe( false );
		} );
	
		test( 'When The Attribute Of A Constrained Value Has No Filtered Values', () => {
			expect( computer.isConstrained( CuisineAttribute.getName(), CuisineValues.NEOPOLITAN ) ).toBe( true );
		} );

		test( 'When The Attribute Of A Constrained Value Has Filtered Values', () => {
			expect( computer.isConstrained( CrustAttribute.getName(), CrustValues.THICK ) ).toBe( true );
		} );
	
		test( 'When The Attribute Value Is In Suggested Values', () => {
			expect( computer.isConstrained( ToppingAttribute.getName(), ToppingValues.HAM ) ).toBe( false );
		} );

		test( 'When The Attribute Value Is Not Suggested And Not Constrained', () => {
			expect( computer.isConstrained( IngredientAttribute.getName(), IngredientValues.GARLIC ) ).toBe( false );
		} );

		test( 'When The Attribute And/Or Value Does Not Exist', () => {
			expect( computer.isConstrained( 'this_attr_does_not_exist', 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isConstrained( IngredientAttribute.getName(), 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isConstrained( 'this_attr_does_not_exist', IngredientValues.CHEESE ) ).toBe( false );
		} );
	} );
	
	describe( 'In Filtered Values', () => {
		test( 'When The Attribute Value Is In Filtered Values', () => {
			expect( computer.isInFilteredValues( CrustAttribute.getName(), CrustValues.THIN ) ).toBe( true );
		} );
	
		test( 'When The Attribute Of A Constrained Value Has No Filtered Values', () => {
			expect( computer.isInFilteredValues( CuisineAttribute.getName(), CuisineValues.NEOPOLITAN ) ).toBe( false );
		} );

		test( 'When The Attribute Of A Constrained Value Has Filtered Values', () => {
			expect( computer.isInFilteredValues( CrustAttribute.getName(), CrustValues.THICK ) ).toBe( true );
		} );
	
		test( 'When The Attribute Value Is In Suggested Values', () => {
			expect( computer.isInFilteredValues( ToppingAttribute.getName(), ToppingValues.HAM ) ).toBe( false );
		} );

		test( 'When The Attribute Value Is Not Suggested And Not Constrained', () => {
			expect( computer.isInFilteredValues( IngredientAttribute.getName(), IngredientValues.GARLIC ) ).toBe( false );
		} );

		test( 'When The Attribute And/Or Value Does Not Exist', () => {
			expect( computer.isInFilteredValues( 'this_attr_does_not_exist', 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isInFilteredValues( IngredientAttribute.getName(), 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isInFilteredValues( 'this_attr_does_not_exist', IngredientValues.CHEESE ) ).toBe( false );
		} );
	} );

	describe( 'In Suggested Values', () => {
		test( 'When The Attribute Value Is In Filtered Values', () => {
			expect( computer.isInSuggestedValues( CrustAttribute.getName(), CrustValues.THIN ) ).toBe( true );
		} );
	
		test( 'When The Attribute Of A Constrained Value Has No Filtered Values', () => {
			expect( computer.isInSuggestedValues( CuisineAttribute.getName(), CuisineValues.NEOPOLITAN ) ).toBe( true );
		} );

		test( 'When The Attribute Of A Constrained Value Has Filtered Values', () => {
			expect( computer.isInSuggestedValues( CrustAttribute.getName(), CrustValues.THICK ) ).toBe( true );
		} );
	
		test( 'When The Attribute Value Is In Suggested Values', () => {
			expect( computer.isInSuggestedValues( ToppingAttribute.getName(), ToppingValues.HAM ) ).toBe( true );
		} );

		test( 'When The Attribute Value Is Not Suggested And Not Constrained', () => {
			expect( computer.isInSuggestedValues( IngredientAttribute.getName(), IngredientValues.GARLIC ) ).toBe( false );
		} );

		test( 'When The Attribute And/Or Value Does Not Exist', () => {
			expect( computer.isInSuggestedValues( 'this_attr_does_not_exist', 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isInSuggestedValues( IngredientAttribute.getName(), 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isInSuggestedValues( 'this_attr_does_not_exist', IngredientValues.CHEESE ) ).toBe( false );
		} );
	} );
} );

describe( 'Test Attribute Parser With', () => {
	describe( 'Multi Attribute Of Type String', () => {
		test( "Parse String", () => {
			expect( computer.parseAttribute( IngredientAttribute.getName(), 'first' ) ).toEqual( 'first' );
		} )

		test( "Parse Integer", () => {
			expect( computer.parseAttribute( IngredientAttribute.getName(), 1 ) ).toEqual( '1' );
		} )

		test( "Parse Boolean", () => {
			expect( computer.parseAttribute( IngredientAttribute.getName(), true ) ).toEqual( 'true' );
		} )

		test( "Parse Array Of Integers, Strings, Booleans And Empty Values", () => {
			expect( computer.parseAttribute( IngredientAttribute.getName(), [ 1, '2', true, 5, false, null, [], {} ] ) ).toEqual( [ '1', '2', 'true', '5', 'false' ] );
		} )
	} );

	describe( 'Non-Multi Attribute Of Type String', () => {
		test( "Parse String", () => {
			expect( computer.parseAttribute( SauceBaseAttribute.getName(), 'first' ) ).toEqual( 'first' );
		} )

		test( "Parse Integer", () => {
			expect( computer.parseAttribute( SauceBaseAttribute.getName(), 1 ) ).toEqual( '1' );
		} )

		test( "Parse Boolean", () => {
			expect( computer.parseAttribute( SauceBaseAttribute.getName(), true ) ).toEqual( 'true' );
		} )

		test( "Parse Array Of Integers, Strings, Booleans And Empty Values", () => {
			expect( computer.parseAttribute( SauceBaseAttribute.getName(), [ 1, '2', true, 5, false, null, [], {} ] ) ).toEqual( [ '1', '2', 'true', '5', 'false' ] );
		} )
	} );

	describe( 'Non-Multi Attribute Of Type Integer', () => {
		test( "Parse String", () => {
			expect( computer.parseAttribute( PortionAttribute.getName(), 'first' ) ).toBeNull();
		} )

		test( "Parse Integer", () => {
			expect( computer.parseAttribute( PortionAttribute.getName(), 1 ) ).toEqual( 1 );
		} )

		test( "Parse Boolean", () => {
			expect( computer.parseAttribute( PortionAttribute.getName(), true ) ).toBeNull();
		} )

		test( "Parse Array Of Integers, Strings, Booleans And Empty Values", () => {
			expect( computer.parseAttribute( PortionAttribute.getName(), [ 1, '2', true, 5, false, null, [], {} ] ) ).toEqual( [ 1, 2, 5 ] );
		} )
	} );

	test( 'Empty Or Unsupported Attribute Value', () => {
		for ( const attrName of [ IngredientAttribute.getName(), SauceBaseAttribute.getName(), 'this_attr_does_not_exist' ] ) {
			expect( computer.parseAttribute( attrName, null ) ).toBeNull();
			expect( computer.parseAttribute( attrName, undefined ) ).toBeNull();
			expect( computer.parseAttribute( attrName, [] ) ).toBeNull();
			expect( computer.parseAttribute( attrName, {} ) ).toBeNull();
		}
	} );

	test( 'Non-Existing Attribute', () => {
		expect( computer.parseAttribute( 'this_attr_does_not_exist', [ '1' ] ) ).toBeNull();
		expect( computer.parseAttribute( 'this_attr_does_not_exist', undefined ) ).toBeNull();
		expect( computer.parseAttribute( 'this_attr_does_not_exist', null ) ).toBeNull();
		expect( computer.parseAttribute( 'this_attr_does_not_exist', [] ) ).toBeNull();
		expect( computer.parseAttribute( 'this_attr_does_not_exist', 1 ) ).toBeNull();
		expect( computer.parseAttribute( 'this_attr_does_not_exist', { '1': '1' } ) ).toBeNull();
	} );
} );