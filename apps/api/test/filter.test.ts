import { ConditionOperators } from "$/conditions/ConditionOperators";
import { MaterialAttribute } from "$/configuration/attributes/MaterialAttribute";
import { CollectionType } from "$/configuration/interface/CollectionConfig";
import { Collection } from "$/product/Collection";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ProductAttrFilterMode } from "@stickerapp-org/nomisma";
import { ProductAttrFilteredValues } from "$/product/attribute/Filter/ProductAttrFilteredValues";

describe( 'Filter', () => {
	let collection: Collection<ProductAttrFilter>;
	let filter: ProductAttrFilter;

	beforeEach( () => {
		collection = new Collection( { name: 'stickers', values: [], type: CollectionType.Filter } );
		
		filter = new ProductAttrFilter( {
			name: 'test',
			mode: ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS,
			rules: []
		} );

		filter.addFilter( 'filter_name', [ '1' ], {
			conditions: [ {
				attribute: 'item.attribtues.' + MaterialAttribute.getName(),
				operator: ConditionOperators.EQUAL,
				value: 'glitter'
			} ]
		} );

		collection.add( filter );
	} );

	describe( 'Add and get conditions', () => {
		test( "Add a condition to a filter", () => {
			const condition = filter.addFilter( 'filter_name', [ '1' ], {
				conditions: [ {
					attribute: 'item.attribtues.' + MaterialAttribute.getName(),
					operator: ConditionOperators.EQUAL,
					value: 'glitter'
				} ]
			} );
	
			expect( condition ).toBeInstanceOf( ProductAttrFilteredValues );
		} );

		test( "Add a condition to a filter already containing one with the same keys", () => {
			expect( filter.addFilter( 'filter_name', [ true ], {} ) ).toBeInstanceOf( ProductAttrFilteredValues );
		} );
	} );

	describe( 'Add and get filters', () => {
		test( "Add a filter to a collection", () => {
			const attrFilter = new ProductAttrFilter( {
				name: 'test1',
				mode: ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS,
				rules: []
			} );
	
			expect( collection.add( attrFilter ) ).toBeInstanceOf( ProductAttrFilter );
		} );
	
		test( "Add a filter to a collection already containing one with the same name", () => {
			const attrFilter = new ProductAttrFilter( {
				name: 'test',
				mode: ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS,
				rules: []
			} );
	
			expect( () => collection.add( attrFilter ) ).toThrowError();
		} );

		test( "Get filter from a collection that has been added", () => {
			expect( collection.get( 'test' ) ).toBeInstanceOf( ProductAttrFilter );
		} );
	
		test( "Get filter from a collection that hasn't been added", () => {
			expect( collection.get( 'test1' ) ).toBeNull();
		} );

		test( "Get all filters", () => {
			expect( filter.getFilters() ).toBeTruthy();
			expect( filter.getFilters().length ).toBe( 1 );
			filter.addFilter( 'filter_name', [ true ], {} )
			expect( filter.getFilters().length ).toBe( 2 );
		} );
	} );

	test( "Initiate a new filter class with rules", () => {
		filter = new ProductAttrFilter( {
			name: 'test',
			mode: ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS,
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

		const values = filter.getFilters().find( values => JSON.stringify( values.getValues() ) === JSON.stringify( [ 'true' ] ) );

		expect( values ).toBeInstanceOf( ProductAttrFilteredValues );
	} );
} )