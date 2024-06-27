import { ProductItem } from "$/product/ProductItem";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";

export class StickerAppProductLegacySKUService {
	// protected skuValue: ProductDynamicValue;

	public constructor() {
		// this.skuValue = new ProductDynamicValue( 0 );

		// this.skuValue.addConditionedValue( 101 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.HOLOGRAPHIC );

		// this.skuValue.addConditionedValue( 102 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.WHITE );

		// this.skuValue.addConditionedValue( 103 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.WHITE_HI_TACK );

		// this.skuValue.addConditionedValue( 104 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.MIRROR );

		// this.skuValue.addConditionedValue( 105 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.KRAFT_PAPER );

		// this.skuValue.addConditionedValue( 106 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.BRUSHED_ALLOY );

		// this.skuValue.addConditionedValue( 107 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.PRISMATIC );

		// this.skuValue.addConditionedValue( 108 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.CLEAR );

		// this.skuValue.addConditionedValue( 109 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.laminate", ConditionOperators.EQUAL, LaminateValues.SOFT_TOUCH );

		// this.skuValue.addConditionedValue( 110 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.GLITTER );

		// this.skuValue.addConditionedValue( 112 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.laminate", ConditionOperators.EQUAL, LaminateValues.EPOXY )
		// 	.setBaseComplexityScore( 1000 )

		// this.skuValue.addConditionedValue( 113 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.WHITE_REMOVABLE );

		// this.skuValue.addConditionedValue( 114 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.WHITE_WALL );

		// this.skuValue.addConditionedValue( 115 )
		// 	.conditionBuilder
		// 	.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_FLOOR );

		// this.skuValue.addConditionedValue( 116 )
		// 	.conditionBuilder
		// 	.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_LABELS_ON_SHEET )
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.WHITE );

		// this.skuValue.addConditionedValue( 117 )
		// 	.conditionBuilder
		// 	.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_LABELS_ON_SHEET )
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.CLEAR );

		// this.skuValue.addConditionedValue( 124 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.GITD );

		// this.skuValue.addConditionedValue( 127 )
		// 	.conditionBuilder
		// 	.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialValues.PIXIE_DUST );
	}

	public getSKU( productItem: ProductItem ): number {
		throw new Error( "Method not implemented." );
		// return this.skuValue.getValue( productItem );
	}
}
