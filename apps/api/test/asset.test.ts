import { CollectionType } from "$/configuration/interface/CollectionConfig";
import { Collection } from "$/product/Collection";
import { ProductAttrAsset } from "$/product/attribute/Asset/ProductAttrAsset";
import { beforeEach, describe, expect, test } from "vitest";

let asset: ProductAttrAsset;
let collection: Collection<ProductAttrAsset>;

describe( "Asset", () => {
	beforeEach(() => {
		asset = new ProductAttrAsset( {
			name: 'asset-1',
			values: {
				'foo': {
					available: true,
					images: {
						'wizard': 'link-to-wizard-icon'
					}
				},
				'bar': {
					available: false
				},
				'baz': {
					available: false
				}
			}
		} );

		collection = new Collection( {
			name: 'assets',
			values: [ 'asset-1', 'asset-2' ],
			type: CollectionType.Asset
		} );

		collection.add( asset );
	} );

	test( "Should return the collection name of the asset", () => {
		expect( collection.getCollectionName() ).toBe( "assets" );
	} );

	test( "Should return the availability of a value", () => {
		expect( collection.get( 'asset-1' )?.isAvailable( 'foo' ) ).toBeTruthy();
		expect( collection.get( 'asset-1' )?.isAvailable( 'bar' ) ).toBeFalsy();
	} );

	test( "Should return all unavailable values", () => {
		expect( collection.get( 'asset-1' )?.getUnavailableValues() ).toEqual( [ 'bar', 'baz' ] );
	} );

	test( "Should return an icon link", () => {
		expect( collection.get( 'asset-1' )?.getWizardIcon( 'foo' ) ).toEqual( 'link-to-wizard-icon' );
	} );

	test( "Should return undefined if no icon is found", () => {
		expect( collection.get( "asset-1" )?.getWizardIcon( 'baz' ) ).toBeUndefined();
	} );

	test( "Should add an asset", () => {
		asset = new ProductAttrAsset( {
			name: 'asset-2',
			values: {
				'foo': {
					available: true
				}
			}
		} );

		expect( collection.add( asset ) ).toBeInstanceOf( ProductAttrAsset );
	} );

	test( "Should throw an error if an asset already exists", () => {
		asset = new ProductAttrAsset( {
			name: 'asset-1',
			values: {
				'foo': {
					available: true
				}
			}
		} );

		expect( () => collection.add( asset ) ).toThrowError();
	} );
} );
