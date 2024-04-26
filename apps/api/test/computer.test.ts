import { describe, expect, test } from "vitest";
import { ProductAttrComputerExtended } from "../src/Commerce/Core/Product/Helper/ProductAttrComputerExtended";
import { ProductItemBuilder } from "../src/Commerce/Core/Product/Helper/ProductItemBuilder";
import { IngredientAttribute } from "./Pizzeria/Attributes/IngredientAttribute";
import { PizzeriaFamily } from "./Pizzeria/PizzeriaFamily";
import { PizzeriaService } from "./Pizzeria/PizzeriaService";
import { SauceBaseAttribute } from "./Pizzeria/Attributes/SauceBaseAttribute";
import { CuisineAttribute } from "./Pizzeria/Attributes/CuisineAttribute";
import { PortionAttribute } from "./Pizzeria/Attributes/PortionAttribute";
import { CrustAttribute } from "./Pizzeria/Attributes/CrustAttribute";
import { ToppingAttribute } from "./Pizzeria/Attributes/ToppingAttribute";

const service     = new PizzeriaService();
const computer    = new ProductAttrComputerExtended( service );
const itemBuilder = new ProductItemBuilder( service );
const item        = itemBuilder.createItem( PizzeriaFamily.NAME, PizzeriaFamily.HAWAII );

computer.prepare( item );

describe( 'Test Getting', () => {
	describe( 'Default Value', () => {
		test( 'When The Attribute Is A Multi Type', () => {
			expect( computer.getDefaultValue( IngredientAttribute.NAME ) ).toEqual( [] );
		} );
	
		test( 'When The Attribute Is A Non-Multi Type', () => {
			expect( computer.getDefaultValue( SauceBaseAttribute.NAME ) ).toBe( SauceBaseAttribute.TOMATO );
		} );
	
		test( 'When The Attribute Does Not Exist', () => {
			expect( computer.getDefaultValue( 'this_attr_does_not_exist' ) ).toBe( null );
		} );
	} );
	
	describe( 'All Values', () => {
		test( 'When The Attribute Is A Multi Type', () => {
			expect( computer.getAllValues( IngredientAttribute.NAME ) ).toEqual( [ 
				IngredientAttribute.CHEESE, 
				IngredientAttribute.HAM, 
				IngredientAttribute.PINEAPPLE 
			] );
		} );
	
		test( 'When The Attribute Is A Non-Multi Type', () => {
			expect( computer.getAllValues( SauceBaseAttribute.NAME ) ).toEqual( [ SauceBaseAttribute.TOMATO ] );
		} );
	
		test( 'When The Attribute Does Not Exist', () => {
			expect( computer.getAllValues( 'this_attr_does_not_exist' ) ).toEqual( [] );
		} );
	} );
	
	describe( 'Highest Available Value', () => {
		test( 'When The Attribute Is Of Type String', () => {
			expect( computer.getHighestAvailableValue( IngredientAttribute.NAME ) ).toBe( null );
		} );
	
		test( 'When The Attribute Is Of Type Int', () => {
			expect( computer.getHighestAvailableValue( PortionAttribute.NAME ) ).toBe( PortionAttribute.FAMILY );
		} );
	} );

	describe( 'Lowest Available Value', () => {
		test( 'When The Attribute Is Of Type String', () => {
			expect( computer.getLowestAvailableValue( IngredientAttribute.NAME ) ).toBe( null );
		} );
	
		test( 'When The Attribute Is Of Type Int And Has Constraint', () => {
			expect( computer.getLowestAvailableValue( PortionAttribute.NAME ) ).toBe( PortionAttribute.NORMAL );
		} );
	} );
} );

describe( 'Test If The Attribute Value Is', () => {
	describe( 'Available', () => {
		test( 'When The Attribute Value Is Suggested', () => {
			expect( computer.isAvailable( IngredientAttribute.NAME, IngredientAttribute.PINEAPPLE ) ).toBe( true );
		} );
	
		test( 'When The Attribute Value Is Not Suggested And Not Constrained', () => {
			expect( computer.isAvailable( IngredientAttribute.NAME, IngredientAttribute.GARLIC ) ).toBe( false );
		} );
	
		test( 'When The Attribute Value Is Constrained', () => {
			expect( computer.isAvailable( CuisineAttribute.NAME, CuisineAttribute.NEOPOLITAN ) ).toBe( false );
		} );

		test( 'When The Attribute And/Or Value Does Not Exist', () => {
			expect( computer.isAvailable( 'this_attr_does_not_exist', 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isAvailable( IngredientAttribute.NAME, 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isAvailable( 'this_attr_does_not_exist', IngredientAttribute.CHEESE ) ).toBe( false );
		} );
	} );

	describe( 'Supported', () => {
		test( 'When The Attribute Is Required', () => {
			expect( computer.isSupported( IngredientAttribute.NAME ) ).toBe( true );
		} );
	
		test( 'When The Attribute Is Supported', () => {
			expect( computer.isSupported( CrustAttribute.NAME ) ).toBe( true );
		} );
	
		test( 'When The Attribute Does Not Exist', () => {
			expect( computer.isSupported( 'this_attr_does_not_exist' ) ).toBe( false );
		} );
	} );
	
	describe( 'Required', () => {
		test( 'When The Attribute Is Required', () => {
			expect( computer.isRequired( IngredientAttribute.NAME ) ).toBe( true );
		} );
	
		test( 'When The Attribute Is Supported', () => {
			expect( computer.isRequired( CrustAttribute.NAME ) ).toBe( false );
		} );
	
		test( 'When The Attribute Does Not Exist', () => {
			expect( computer.isRequired( 'this_attr_does_not_exist' ) ).toBe( false );
		} );
	} );
	
	describe( 'Constrained', () => {
		test( 'When The Attribute Value Is In Filtered Values', () => {
			expect( computer.isConstrained( CrustAttribute.NAME, CrustAttribute.THIN ) ).toBe( false );
		} );
	
		test( 'When The Attribute Of A Constrained Value Has No Filtered Values', () => {
			expect( computer.isConstrained( CuisineAttribute.NAME, CuisineAttribute.NEOPOLITAN ) ).toBe( true );
		} );

		test( 'When The Attribute Of A Constrained Value Has Filtered Values', () => {
			expect( computer.isConstrained( CrustAttribute.NAME, CrustAttribute.THICK ) ).toBe( true );
		} );
	
		test( 'When The Attribute Value Is In Suggested Values', () => {
			expect( computer.isConstrained( ToppingAttribute.NAME, ToppingAttribute.HAM ) ).toBe( false );
		} );

		test( 'When The Attribute Value Is Not Suggested And Not Constrained', () => {
			expect( computer.isConstrained( IngredientAttribute.NAME, IngredientAttribute.GARLIC ) ).toBe( false );
		} );

		test( 'When The Attribute And/Or Value Does Not Exist', () => {
			expect( computer.isConstrained( 'this_attr_does_not_exist', 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isConstrained( IngredientAttribute.NAME, 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isConstrained( 'this_attr_does_not_exist', IngredientAttribute.CHEESE ) ).toBe( false );
		} );
	} );
	
	describe( 'In Filtered Values', () => {
		test( 'When The Attribute Value Is In Filtered Values', () => {
			expect( computer.isInFilteredValues( CrustAttribute.NAME, CrustAttribute.THIN ) ).toBe( true );
		} );
	
		test( 'When The Attribute Of A Constrained Value Has No Filtered Values', () => {
			expect( computer.isInFilteredValues( CuisineAttribute.NAME, CuisineAttribute.NEOPOLITAN ) ).toBe( false );
		} );

		test( 'When The Attribute Of A Constrained Value Has Filtered Values', () => {
			expect( computer.isInFilteredValues( CrustAttribute.NAME, CrustAttribute.THICK ) ).toBe( false );
		} );
	
		test( 'When The Attribute Value Is In Suggested Values', () => {
			expect( computer.isInFilteredValues( ToppingAttribute.NAME, ToppingAttribute.HAM ) ).toBe( false );
		} );

		test( 'When The Attribute Value Is Not Suggested And Not Constrained', () => {
			expect( computer.isInFilteredValues( IngredientAttribute.NAME, IngredientAttribute.GARLIC ) ).toBe( false );
		} );

		test( 'When The Attribute And/Or Value Does Not Exist', () => {
			expect( computer.isInFilteredValues( 'this_attr_does_not_exist', 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isInFilteredValues( IngredientAttribute.NAME, 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isInFilteredValues( 'this_attr_does_not_exist', IngredientAttribute.CHEESE ) ).toBe( false );
		} );
	} );

	describe( 'In Suggested Values', () => {
		test( 'When The Attribute Value Is In Filtered Values', () => {
			expect( computer.isInSuggestedValues( CrustAttribute.NAME, CrustAttribute.THIN ) ).toBe( true );
		} );
	
		test( 'When The Attribute Of A Constrained Value Has No Filtered Values', () => {
			expect( computer.isInSuggestedValues( CuisineAttribute.NAME, CuisineAttribute.NEOPOLITAN ) ).toBe( true );
		} );

		test( 'When The Attribute Of A Constrained Value Has Filtered Values', () => {
			expect( computer.isInSuggestedValues( CrustAttribute.NAME, CrustAttribute.THICK ) ).toBe( false );
		} );
	
		test( 'When The Attribute Value Is In Suggested Values', () => {
			expect( computer.isInSuggestedValues( ToppingAttribute.NAME, ToppingAttribute.HAM ) ).toBe( true );
		} );

		test( 'When The Attribute Value Is Not Suggested And Not Constrained', () => {
			expect( computer.isInSuggestedValues( IngredientAttribute.NAME, IngredientAttribute.GARLIC ) ).toBe( false );
		} );

		test( 'When The Attribute And/Or Value Does Not Exist', () => {
			expect( computer.isInSuggestedValues( 'this_attr_does_not_exist', 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isInSuggestedValues( IngredientAttribute.NAME, 'this_value_does_not_exist' ) ).toBe( false );
			expect( computer.isInSuggestedValues( 'this_attr_does_not_exist', IngredientAttribute.CHEESE ) ).toBe( false );
		} );
	} );
} );