import { ProductService } from "../ProductService";
import { ProductAttrFilterMode } from "../attribute/Filter/ProductAttrFilterMode";
import { ProductAttrValueType } from "../attribute/ProductAttrValueType";
import { Product } from "../Product";
import { AttributeValueMulti } from "../attribute/AttributeValue";
import { ProductAttr } from "../attribute/ProductAttr";
import { ProductAttrFilter } from "../attribute/Filter/ProductAttrFilter";
import { ProductAttrConstraint } from "../attribute/Constraint/ProductAttrConstraint";
import { ProductAttrAsset } from "../attribute/Asset/ProductAttrAsset";
import { CollectionType } from "$/configuration/interface/CollectionConfig";

export type TProductAttrMapValue = {
	alias: string,
	isDynamicValue: boolean,
	isMultiValue: boolean,
	valueType: ProductAttrValueType,
	isRequired : boolean,
	valuesAndConstraints: Record<string, string | null>,
	icons: Record<string, string>,
	filters: ProductAttributeFilter[],
	filterMode: ProductAttrFilterMode | null,
	outOfStockValues: AttributeValueMulti
}

export type TProductAttrMap = Record<string, TProductAttrMapValue>

export type ProductAttributeFilter = {
	values: AttributeValueMulti;
	conditions: string;
	conditionsComplexityScore: number;
}

export class ProductAttrMap {
	protected map: TProductAttrMap = {};

	public constructor( protected ps: ProductService, protected product: Product ) {
		for ( const [ attrName, attr ] of Object.entries( this.ps.retrieveProductFamily( product.getProductFamilyName()).getAttributes() ) ) {
			this.run( attrName, attr );
		}
	}

	protected run( attrName: string, attr: ProductAttr ): void {
		// TODO: Implement "does attr:value allow attributeName to be attrValue"
		// Currently only does the other way around, see sticker wizard logic
		const family = this.ps.retrieveProductFamily( this.product.getProductFamilyName() );
		
		const attrValues: Record<string, string | null> = {};

		const attrConstraint   = this.ps.retrieveCollection<ProductAttrConstraint>( CollectionType.Constraint, family.getConstraintsCollectionName() ).get( attrName );
		const attrFilter 	   = this.ps.retrieveCollection<ProductAttrFilter>( CollectionType.Filter, family.getFilterCollectionName() ).get( attrName );
		const attrAsset		   = this.ps.retrieveCollection<ProductAttrAsset>( CollectionType.Asset, family.getAssetCollectionName() ).get( attrName );
		const attrValueOptions = family.getAllAttributeValueOptionsForProduct( this.product, attrName );

		let icons: Record<string, string> = {};

		for ( const attrValue of attrValueOptions ) {
			const conditionsBuilder = attrConstraint?.getConstraint( attrValue ) ?? null;

			if ( typeof attrValue === 'string' ) {
				const iconBuilder = attrAsset?.getWizardIcon( attrValue ) ?? null;
	
				if ( iconBuilder ) {
					icons[ attrValue ] = iconBuilder;
				}
			}

			attrValues[ attrValue.toString() ] = conditionsBuilder ? `${ conditionsBuilder }` : null;
		}

		const filters = attrFilter?.getFilters().map( filteredValues => ( {
			"values": filteredValues.getValues(),
			"conditions": `${ filteredValues.conditionBuilder }`,
			"conditionsComplexityScore": filteredValues.conditionBuilder.calculateComplexityScore()
		} ) ) ?? [];

		// TODO: Double check all filter values that they are correct value types (especially for booleans and ints), if not throw error

		this.map[ attrName ] = {
			"alias" 				: attrName,
			"isDynamicValue" 		: attr.isDynamicValue(),
			"isMultiValue" 			: attr.isMultiValue(),
			"valueType" 			: attr.getValueType(),
			"isRequired" 			: family.isRequired( attrName ),
			"valuesAndConstraints" 	: attrValues,
			"icons" 				: icons,
			"filters" 				: filters,
			"filterMode" 			: attrFilter?.getMode() ?? null,
			"outOfStockValues" 		: attrAsset?.getUnavailableValues() ?? []
		};
	}

	public getMap(): TProductAttrMap {
		return this.map;
	}
}
