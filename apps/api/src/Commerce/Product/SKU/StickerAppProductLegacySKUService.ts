import { ProductItem } from "$/Commerce/Core/Product/Item/ProductItem";
import { ProductDynamicValue } from "$/Commerce/Core/Product/Value/ProductDynamicValue";
import { ConditionOperators } from "$/Helper/Condition/ConditionOperators";
import { LaminateAttribute } from "../Attribute/Sticker/LaminateAttribute";
import { MaterialAttribute } from "../Attribute/Sticker/MaterialAttribute";
import { CustomStickerFamily } from "../Family/CustomStickerFamily";

export class StickerAppProductLegacySKUService {
	protected skuValue: ProductDynamicValue;

	public constructor() {
		this.skuValue = new ProductDynamicValue( 0 );

		this.skuValue.addConditionedValue( 101 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.HOLOGRAPHIC );

		this.skuValue.addConditionedValue( 102 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.WHITE );

		this.skuValue.addConditionedValue( 103 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.WHITE_HI_TACK );

		this.skuValue.addConditionedValue( 104 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.MIRROR );

		this.skuValue.addConditionedValue( 105 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.KRAFT_PAPER );

		this.skuValue.addConditionedValue( 106 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.BRUSHED_ALLOY );

		this.skuValue.addConditionedValue( 107 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.PRISMATIC );

		this.skuValue.addConditionedValue( 108 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.CLEAR );

		this.skuValue.addConditionedValue( 109 )
			.conditionBuilder
			.addCondition( "item.attributes.laminate", ConditionOperators.EQUAL, LaminateAttribute.SOFT_TOUCH );

		this.skuValue.addConditionedValue( 110 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.GLITTER );

		this.skuValue.addConditionedValue( 112 )
			.conditionBuilder
			.addCondition( "item.attributes.laminate", ConditionOperators.EQUAL, LaminateAttribute.EPOXY )
			.setBaseComplexityScore( 1000 )

		this.skuValue.addConditionedValue( 113 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.WHITE_REMOVABLE );

		this.skuValue.addConditionedValue( 114 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.WHITE_WALL );

		this.skuValue.addConditionedValue( 115 )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_FLOOR );

		this.skuValue.addConditionedValue( 116 )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_LABELS_ON_SHEET )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.WHITE );

		this.skuValue.addConditionedValue( 117 )
			.conditionBuilder
			.addCondition( "item.productName", ConditionOperators.EQUAL, CustomStickerFamily.PRODUCT_LABELS_ON_SHEET )
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.CLEAR );

		this.skuValue.addConditionedValue( 124 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.GITD );

		this.skuValue.addConditionedValue( 127 )
			.conditionBuilder
			.addCondition( "item.attributes.material", ConditionOperators.EQUAL, MaterialAttribute.PIXIE_DUST );
	}

	public getSKU( productItem: ProductItem ): number {
		return this.skuValue.getValue( productItem );
	}
}
