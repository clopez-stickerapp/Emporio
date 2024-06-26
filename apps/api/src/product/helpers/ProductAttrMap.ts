import { ProductService } from "../ProductService";
import { ProductAttrFilterMode } from "../attribute/Filter/ProductAttrFilterMode";
import { ProductAttrValueType } from "../attribute/ProductAttrValueType";
import { Product } from "../Product";
import { AttributeValueMulti } from "../attribute/AttributeValue";
import { ProductAttr } from "../attribute/ProductAttr";

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
		for ( const [ attrName, attr ] of Object.entries( product.getProductFamily().getAttributes() ) ) {
			this.run( attrName, attr );
		}
	}

	protected run( attrName: string, attr: ProductAttr ): void {
		// TODO: Implement "does attr:value allow attributeName to be attrValue"
		// Currently only does the other way around, see sticker wizard logic
		
		const attrValues: Record<string, string | null> = {};

		const constraintsCollection = this.product.getProductFamily().getConstraintsCollection();
		const iconsCollection       = this.product.getProductFamily().getIconsCollection();
		const outOfStockAttrValues  = this.product.getProductFamily().getStockCollection()?.getOutOfStockFor( attrName )?.getOutOfStock() ?? [];
		const attrValueOptions      = this.ps.getAllAttributeValueOptionsForProduct( this.product, attrName );

		let icons: Record<string, string> = {};

		for ( const attrValue of attrValueOptions ) {
			const conditionsBuilder = constraintsCollection?.findConditionsFor( attrName, attrValue ) ?? null;

			if ( typeof attrValue === 'string' ) {
				const iconBuilder = iconsCollection?.findIconFor( attrName, attrValue ) ?? null;
	
				if ( iconBuilder ) {
					icons[ attrValue ] = iconBuilder;
				}
			}

			attrValues[ attrValue.toString() ] = conditionsBuilder ? `${ conditionsBuilder }` : null;
		}

		let filters: ProductAttributeFilter[] = [];
		let filterMode: ProductAttrFilterMode | null = null;

		const filter = this.product.getProductFamily().getFilterCollection()?.getFilterFor( attrName );

		if ( filter ) {
			filterMode = filter.mode;
			filters = filter.getAllFilters().map( filteredValues => ( {
				"values": filteredValues.getValues(),
				"conditions": `${ filteredValues.conditionBuilder }`,
				"conditionsComplexityScore": filteredValues.conditionBuilder.calculateComplexityScore()
			} ) );
		}

		// TODO: Double check all filter values that they are correct value types (especially for booleans and ints), if not throw error

		this.map[ attrName ] = {
			"alias" 				: attrName,
			"isDynamicValue" 		: attr.isDynamicValue(),
			"isMultiValue" 			: attr.isMultiValue(),
			"valueType" 			: attr.getValueType(),
			"isRequired" 			: attrName in this.product.getProductFamily().getRequiredAttrs(),
			"valuesAndConstraints" 	: attrValues,
			"icons" 				: icons,
			"filters" 				: filters,
			"filterMode" 			: filterMode,
			"outOfStockValues" 		: outOfStockAttrValues
		};
	}

	public getMap(): TProductAttrMap {
		return this.map;
	}
}
